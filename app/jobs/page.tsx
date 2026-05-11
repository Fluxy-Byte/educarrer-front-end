"use client";

import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useVacancys } from "@/app/services/vacancys.swr";
import { useSession } from "@/lib/utils/auth-client";
import { authClient } from "@/lib/utils/auth-client";
import { DialogVaga } from "@/components/dialog/dialog-vaga";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";

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
}

export default function DashboardPage() {
  const { vacancys } = useVacancys();

  // 🔎 Estados de filtro
  const [nomeFiltro, setNomeFiltro] = useState("");
  const [nivelFiltro, setNivelFiltro] = useState("todos");
  const [modalidadeFiltro, setModalidadeFiltro] = useState("todos");

  // 🧠 Lógica de filtro
  const vagasFiltradas = vacancys?.filter((vaga) => {
    const matchNome =
      vaga.title.toLowerCase().includes(nomeFiltro.toLowerCase());

    const matchNivel =
      nivelFiltro === "todos" || vaga.level === nivelFiltro;

    const matchModalidade =
      modalidadeFiltro === "todos" || vaga.modality === modalidadeFiltro;

    return matchNome && matchNivel && matchModalidade;
  });

  return (
    <div className="w-full min-h-full flex flex-col gap-4 relative">
      <div className="w-full h-auto bg-white rounded-lg shadow-lg p-4 flex flex-col gap-3">
        <h1 className="text-black font-semibold">Filtros</h1>

        <Input
          type="text"
          placeholder="Buscar por nome da vaga..."
          value={nomeFiltro}
          onChange={(e) => setNomeFiltro(e.target.value)}
          className="border border-zinc-300 text-black placeholder:text-gray-500 rounded-md p-2"
        />

        <div className="flex gap-2">
          <Select
            value={nivelFiltro}
            onValueChange={(value) => setNivelFiltro(value)}
          >
            <SelectTrigger className="w-full h-12! bg-white! text-black placeholder:text-gray-500 border-zinc-300 rounded-md">
              <SelectValue placeholder="Todos os níveis" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="todos">Todos os níveis</SelectItem>
              <SelectItem value="Júnior">Júnior</SelectItem>
              <SelectItem value="Pleno">Pleno</SelectItem>
              <SelectItem value="Sênior">Sênior</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={modalidadeFiltro}
            onValueChange={(value) => setModalidadeFiltro(value)}
          >
            <SelectTrigger className="w-full h-12! bg-white! text-black placeholder:text-gray-500 border-zinc-300 rounded-md">
              <SelectValue placeholder="Todas modalidades" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="todos">Todas modalidades</SelectItem>
              <SelectItem value="Remoto">Remoto</SelectItem>
              <SelectItem value="Híbrido">Híbrido</SelectItem>
              <SelectItem value="Presencial">Presencial</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

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
  );
}