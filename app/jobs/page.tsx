"use client";

import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useVacancys } from "@/app/services/vacancys.swr";
import { useSession } from "@/lib/utils/auth-client";
import { authClient } from "@/lib/utils/auth-client";
import { DialogVaga } from "@/components/dialog/dialog-vacancy.view";
import Image from "next/image";
import { Loader2, Users, Search, BrainCircuit, MapPinHouse } from "lucide-react";
import { Input } from "@/components/ui/input";
import { DialogAvaliationsVacancys } from "@/components/dialog/dialog-avaliations-vacancys";
import { getAvaliationVancancyByUserId } from "@/app/services/avaliationsVacancy.swr";
import Banner from "@/public/banner.png";
import IconeAlvo from "@/public/icone-alvo.png";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface VacancyDTO {
  id: number;
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
  createdAt: Date;
  updatedAt: Date;
  active: boolean;
}

export default function DashboardPage() {
  const { vacancys } = useVacancys();

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
    <div className="flex justify-center itens-center gap-3">
      <div className="w-full min-h-full flex flex-col gap-4 relative">
        <DialogAvaliationsVacancys
          active={needAvaliation}
          closeDialog={handleClosedDialogAvaliation}
        />

        <div className="w-full rounded-lg overflow-hidden">
          <Image src={Banner} alt="Banner" className="w-full h-full rounded-lg object-cover" />
        </div>

        {/* Card de filtros */}
        <div className="w-full bg-white rounded-xl border border-zinc-200 shadow-sm p-4 flex flex-col gap-3">

          {/* Header */}
          <div className="flex items-center gap-3">
            <Users className="h-5 w-5 text-zinc-400" />
            <div>
              <h1 className="text-sm font-semibold text-black">Filtros de busca</h1>
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
              className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent text-black placeholder:text-zinc-400 p-0 h-auto text-sm"
            />
          </div>

          {/* Selects de nível e modalidade */}
          <div className="flex gap-3">
            <Select value={nivelFiltro} onValueChange={(value) => setNivelFiltro(value)}>
              <SelectTrigger className="w-full bg-white! border border-zinc-200 rounded-md px-3 text-sm text-black focus:ring-0 focus:ring-offset-0 h-10">
                <div className="flex items-center gap-2">
                  <BrainCircuit className="h-4 w-4 text-emerald-500 shrink-0" />
                  <SelectValue placeholder="Todos os níveis" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os níveis</SelectItem>
                <SelectItem value="Júnior">Júnior</SelectItem>
                <SelectItem value="Pleno">Pleno</SelectItem>
                <SelectItem value="Sênior">Sênior</SelectItem>
              </SelectContent>
            </Select>

            <Select value={modalidadeFiltro} onValueChange={(value) => setModalidadeFiltro(value)}>
              <SelectTrigger className="w-full bg-white! border border-zinc-200 rounded-md px-3 text-sm text-black focus:ring-0 focus:ring-offset-0 h-10">
                <div className="flex items-center gap-2">
                  <MapPinHouse className="h-4 w-4 text-violet-500 shrink-0" />
                  <SelectValue placeholder="Todas as modalidades" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todas as modalidades</SelectItem>
                <SelectItem value="Remoto">Remoto</SelectItem>
                <SelectItem value="Híbrido">Híbrido</SelectItem>
                <SelectItem value="Presencial">Presencial</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="w-full bg-white rounded-xl border border-zinc-200 shadow-sm p-4 flex flex-col gap-3">
          <div className="w-full h-full flex items-center justify-start h-auto gap-3">
            <Image src={IconeAlvo} alt="Ícone de alvo" className="h-10 w-10" />
            <h1 className="text-lg font-semibold text-black">
              Vagas recomendadas para você
            </h1>
          </div>

          <div>
            {/* Lista de vagas */}
            {vacancys ? (
              <div className="w-full max-h-[500px] overflow-y-auto bg-white rounded-lg shadow-lg p-4 gap-2 flex flex-col">
                {vagasFiltradas && vagasFiltradas.length > 0 ? (
                  vagasFiltradas.map((vaga) => (
                    <DialogVaga key={vaga.id} vacancy={vaga} />
                  ))
                ) : (
                  <p className="text-center text-gray-500">
                    Nenhuma vaga encontrada com esses filtros.
                  </p>
                )}
              </div>
            ) : (
              <div className="w-full p-4 flex items-center justify-center">
                <Loader2 className="animate-spin" />
              </div>
            )}
          </div>
        </div>

      </div>
      <div className="w-1/2 h-full flex flex-col gap-2">
        <div className="w-full p-4 bg-white rounded-lg flex flex-col gap-4">

          <div className="flex gap-3 items-ce/nter">
            <MapPinHouse className="h-6 w-6 text-violet-500 shrink-0" />
            <h1 className="text-black font-semibold">
              Estátisticas rápidas
            </h1>
          </div>

          <div className="flex flex-col gap-3">
            <div className="w-full p-4 bg-blue-50 border border-blue-400 rounded-lg flex items-center gap-4">
              <MapPinHouse className="h-7 w-7 text-blue-500 shrink-0" />
              <div className="flex flex-col w-full">
                <h1 className="text-blue-500 font-semibold">
                  1.250+
                </h1>
                <p className="text-blue-500 text-xs">
                  Vagas disponivieis
                </p>
              </div>
            </div>

            <div className="w-full p-4 bg-blue-50 border border-blue-400 rounded-lg flex items-center gap-4">
              <MapPinHouse className="h-7 w-7 text-blue-500 shrink-0" />
              <div className="flex flex-col w-full">
                <h1 className="text-blue-500 font-semibold">
                  1.250+
                </h1>
                <p className="text-blue-500 text-xs">
                  Vagas disponivieis
                </p>
              </div>
            </div>

            <div className="w-full p-4 bg-blue-50 border border-blue-400 rounded-lg flex items-center gap-4">
              <MapPinHouse className="h-7 w-7 text-blue-500 shrink-0" />
              <div className="flex flex-col w-full">
                <h1 className="text-blue-500 font-semibold">
                  1.250+
                </h1>
                <p className="text-blue-500 text-xs">
                  Vagas disponivieis
                </p>
              </div>
            </div>
          </div>




        </div>
      </div>
    </div>

  );
}