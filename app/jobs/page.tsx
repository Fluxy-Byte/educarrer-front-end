"use client";

import { toast } from "sonner";
import { useState } from "react";
import { useVagas } from "@/app/services/vagas.swr";
import { useSession } from "@/lib/auth/auth-client";
import { authClient } from "@/lib/auth/auth-client";
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

export interface Vaga {
  id: number;
  titulo: string;
  empresa: string;
  localizacao: string;
  modalidade: string;
  nivel: string;
  salario: string;
  tecnologias: string[];
  descricao: string;
  link: string;
  nome: string;
}

export default function DashboardPage() {
  const { data: session } = useSession();
  const { vagas } = useVagas();

  // 🔎 Estados de filtro
  const [nomeFiltro, setNomeFiltro] = useState("");
  const [nivelFiltro, setNivelFiltro] = useState("todos");
  const [modalidadeFiltro, setModalidadeFiltro] = useState("todos");

  const handleLogout = async () => {
    await authClient.signOut();
  };

  // 🧠 Lógica de filtro
  const vagasFiltradas = vagas?.filter((vaga) => {
    const matchNome =
      vaga.titulo.toLowerCase().includes(nomeFiltro.toLowerCase());

    const matchNivel =
      nivelFiltro === "todos" || vaga.nivel === nivelFiltro;

    const matchModalidade =
      modalidadeFiltro === "todos" || vaga.modalidade === modalidadeFiltro;

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

      {vagas ? (
        <div className="w-full max-h-[500px] overflow-y-auto bg-white rounded-lg shadow-lg p-4 gap-2 flex flex-col">
          {vagasFiltradas && vagasFiltradas.length > 0 ? (
            vagasFiltradas.map((vaga) => (
              <DialogVaga key={vaga.id} vaga={vaga} />
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