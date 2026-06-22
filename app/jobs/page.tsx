"use client";

import { useEffect, useState } from "react";
import { useVacancys } from "@/app/services/vacancys.swr";
import Image from "next/image";
import { Loader2, Users, Search, BrainCircuit, MapPinHouse, ChartColumnIncreasing, BriefcaseBusiness, Building2, Heart, Flame } from "lucide-react";
import { Input } from "@/components/ui/input";
import { DialogAvaliationsVacancys } from "@/components/dialog/dialog-avaliations-vacancys";
import { getAvaliationVancancyByUserId } from "@/app/services/avaliationsVacancy.swr";
import Banner from "@/public/banner.png";
import Rocket from "@/public/dakernet-rocket.gif";
import IconeAlvo from "@/public/icone-alvo.png";
import Primeiro from "@/public/primeiro.png";
import Segundo from "@/public/segundo.png";
import Terceiro from "@/public/terceiro.png";
import CadsVacancy from "@/components/cards/card-vacancy";
import { useMetrics } from "@/app/services/metrics.swr";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const bussinesMoreVacancys = [
  {
    "id": "1",
    "name": "Colmeia",
    "vacancys": 200
  },
  {
    "id": "2",
    "name": "Telek",
    "vacancys": 10
  },
  {
    "id": "3",
    "name": "Fluxe",
    "vacancys": 1
  }
]

export interface Vacancy {
  id: string;
  title: string;
  description: string;
  company: string;
  modality: string;
  level: string;
  technologies: string[];
  link: string;
  origin: string;
  location: string;
  salary: string | null;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export default function DashboardPage() {
  const { vacancys, isLoading } = useVacancys();
  const { metrics } = useMetrics();

  const [nomeFiltro, setNomeFiltro] = useState("");
  const [nivelFiltro, setNivelFiltro] = useState("todos");
  const [modalidadeFiltro, setModalidadeFiltro] = useState("todos");
  const [needAvaliation, setNeedAvaliation] = useState<boolean>(false);

  const vagasFiltradas = vacancys?.filter((vaga) => {
    const matchNome =
      vaga.title.toLowerCase().includes(nomeFiltro.toLowerCase()) ||
      vaga.company.toLowerCase().includes(nomeFiltro.toLowerCase()) ||
      vaga.technologies.some((tech) =>
        tech.toLowerCase().includes(nomeFiltro.toLowerCase())
      );

    const matchNivel =
      nivelFiltro === "todos" || vaga.level === nivelFiltro;

    const matchModalidade =
      modalidadeFiltro === "todos" || vaga.modality === modalidadeFiltro;

    return matchNome && matchNivel && matchModalidade;
  });

  const handleGetNeedAvaliation = async () => {
    try {
      const res = await getAvaliationVancancyByUserId();
      if (res.solicited) {
        setNeedAvaliation(res.solicited);
      }
    } catch (error) {
      console.error("Erro ao verificar necessidade de avaliação:", error);
    }
  };

  const handleClosedDialogAvaliation = () => {
    setNeedAvaliation(false);
    handleGetNeedAvaliation();
  };

  useEffect(() => {
    handleGetNeedAvaliation();
  }, []);

  return (
    <div className="flex-col-reverse lg:flex-row flex justify-center itens-center gap-3">
      <div className="w-full min-h-full flex flex-col gap-4 relative">
        <DialogAvaliationsVacancys
          active={needAvaliation}
          closeDialog={handleClosedDialogAvaliation}
        />

        <div className="w-full rounded-lg overflow-hidden shadow-sm">
          <Image
            src={Banner}
            alt="Banner"
            className="w-full h-auto rounded-lg object-contain"
            priority
          />
        </div>

        {/* Card de filtros */}
        <div className="w-full bg-white rounded-lg border border-zinc-200 shadow-sm p-4 flex flex-col gap-3">

          {/* Header */}
          <div className="flex items-center gap-3">
            <Users strokeWidth={1} className="h-6 w-6 text-black" />
            <div>
              <h1 className="text-md font-semibold text-black">Filtros de busca</h1>
              <p className="text-xs text-zinc-400">Encontre a vaga ideal para o seu perfil</p>
            </div>
          </div>

          {/* Campo de busca */}
          <div className="flex items-center w-full border border-zinc-200 rounded-md px-3 py-2 bg-white gap-2">
            <Search className="h-4 w-4 text-zinc-400 shrink-0" />
            <Input
              type="text"
              placeholder="Buscar por nome da vaga, empresa ou palavra-chave..."
              value={nomeFiltro}
              onChange={(e) => setNomeFiltro(e.target.value)}
              className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent text-black placeholder:text-zinc-400 p-0 h-8 text-sm"
            />
          </div>

          {/* Selects de nível e modalidade */}
          <div className="flex gap-3 flex-col lg:flex-row">
            <Select value={nivelFiltro} onValueChange={(value) => setNivelFiltro(value)}>
              <SelectTrigger className="w-full bg-white! border border-zinc-200 rounded-md px-3 text-sm text-black focus:ring-0 focus:ring-offset-0 h-12!">
                <div className="flex items-center gap-2">
                  <BrainCircuit className="h-6! w-6! text-emerald-500 shrink-0" />
                  <SelectValue placeholder="Todos os níveis" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem className="h-10!" value="todos">Todos os níveis</SelectItem>
                <SelectItem className="h-10!" value="Júnior">Júnior</SelectItem>
                <SelectItem className="h-10!" value="Pleno">Pleno</SelectItem>
                <SelectItem className="h-10!" value="Sênior">Sênior</SelectItem>
              </SelectContent>
            </Select>

            <Select value={modalidadeFiltro} onValueChange={(value) => setModalidadeFiltro(value)}>
              <SelectTrigger className="w-full bg-white! border border-zinc-200 rounded-md px-3 text-sm text-black focus:ring-0 focus:ring-offset-0 h-12!">
                <div className="flex items-center gap-2">
                  <MapPinHouse className="h-6! w-6! text-violet-500 shrink-0" />
                  <SelectValue placeholder="Todas as modalidades" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem className="h-10!" value="todos">Todas as modalidades</SelectItem>
                <SelectItem className="h-10!" value="Remoto">Remoto</SelectItem>
                <SelectItem className="h-10!" value="Híbrido">Híbrido</SelectItem>
                <SelectItem className="h-10!" value="Presencial">Presencial</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="w-full bg-white rounded-xl border border-zinc-200 shadow-sm p-4 flex flex-col gap-3">
          <div className="w-full flex items-center justify-start h-auto gap-3">
            <Image src={IconeAlvo} alt="Ícone de alvo" className="h-6 w-6" />
            <div className="flex flex-col items-start">
              <h1 className="text-md font-semibold text-black">
                Vagas recomendadas para você
              </h1>
              <p className="text-xs text-zinc-400">
                Baseadas no seu perfil e prefêrencias
              </p>
            </div>

          </div>

          <div>
            {/* Lista de vagas */}
            {
              isLoading ? (
                <Card className="w-full">
                  <CardContent className="text-gray-500 flex items-center justify-center gap-4">
                    <Image
                      src={Rocket}
                      alt="Carregando..."
                      width={50}
                      height={50}
                      unoptimized
                    />
                    <p>Estamos analisando seu perfil e encontrando as vagas mais compatíveis com você. Aguarde um instante.</p>
                  </CardContent>
                </Card>
              ) :
                (
                  <div className="w-full h-full overflow-y-autorounded-lg flex flex-col gap-4 bg-transparent">
                    {vagasFiltradas && vagasFiltradas.length > 0 ? (
                      vagasFiltradas.map((vaga) => (
                        <CadsVacancy key={vaga.id} vacancy={vaga} />
                      ))
                    ) : (
                      <p className="text-center text-gray-500">
                        Nenhuma vaga encontrada com esses filtros.
                      </p>
                    )}
                  </div>
                )
            }

          </div>
        </div>

      </div>

      <div className="w-full lg:w-1/4 h-fit lg:flex flex-col gap-4 hidden">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <ChartColumnIncreasing className="h-6 w-6 text-blue-500" />
              <h1 className="text-black">Estatísticas rápidas</h1>
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="lg:flex lg:flex-col gap-3 grid grid-cols-1 lg:grid-cols-2">
              <Card className="border-blue-400 bg-blue-50">
                <CardContent className="flex items-center gap-4">
                  <BriefcaseBusiness className="h-7 w-7 text-blue-600 shrink-0" />

                  <div>
                    <h2 className="font-semibold text-blue-500">
                      + {metrics?.totalVacancys ?? 0}
                    </h2>

                    <p className="text-xs text-blue-600">
                      Vagas disponíveis
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-400 bg-green-50">
                <CardContent className="flex items-center gap-4">
                  <Building2 className="h-7 w-7 text-green-600 shrink-0" />

                  <div>
                    <h2 className="font-semibold text-green-500">
                      + {metrics?.totalBussines ?? 0}
                    </h2>

                    <p className="text-xs text-green-600">
                      Empresas parceiras
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-orange-400 bg-orange-50">
                <CardContent className="flex items-center gap-4">
                  <Users className="h-7 w-7 text-orange-600 shrink-0" />

                  <div>
                    <h2 className="font-semibold text-orange-500">
                      {metrics?.totalStudiesCreateds ?? 0}
                    </h2>

                    <p className="text-xs text-orange-600">
                      Estudos construidos
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-purple-400 bg-purple-50">
                <CardContent className="flex items-center gap-4">
                  <Heart className="h-7 w-7 text-purple-600 shrink-0" />

                  <div>
                    <h2 className="font-semibold text-purple-500">
                      {metrics?.totalSatisfation ?? 0}%
                    </h2>

                    <p className="text-xs text-purple-600">
                      Satisfação dos usuários
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Flame className="h-6 w-6 text-red-500" />
              <h1 className="text-black">Empresas com mais vagas</h1>
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="lg:flex lg:flex-col gap-3 grid grid-cols-1 lg:grid-cols-2">

              {
                metrics && metrics.bussinesMoreWithVacancys.length > 0 && metrics.bussinesMoreWithVacancys.map((v, i) => (
                  <Card key={v.company} className={`${i == 1 ? "bg-zinc-100" : " bg-orange-50"} p-0! py-2! shadow-none border-none`}>
                    <CardContent className="flex items-center gap-4">

                      <div className={`min-w-12! min-h-12! text-white rounded-full flex items-center justify-center font-bold text-2xl ${i == 0 ? "bg-blue-800" : i == 1 ? "bg-purple-700" : "bg-orange-600"}`}>
                        {v.company.replace(" ", "").slice(0, 1)}
                      </div>

                      <div className="w-full whitespace-normal! wrap-break-word!">
                        <h2 className="text-md font-semibold text-black flex items-center justify-start gap-2 whitespace-normal! wrap-break-word!">
                          <Building2 size={15} /> {v.company}
                        </h2>

                        <p className="text-xs text-black whitespace-normal! wrap-break-word!">
                          {v.countVacancies == 1 ? `${v.countVacancies} vaga disponivel` : `${v.countVacancies} vagas disponivel`}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))
              }

            </div>
          </CardContent>
        </Card>
      </div>

    </div >

  );
}