"use client"

import { toast } from "sonner";
import { useState } from "react";
import { useVagas } from "@/app/services/vagas.swr";
import { useSession } from "@/lib/auth/auth-client";
import { authClient } from "@/lib/auth/auth-client";
import { DialogVaga } from "@/components/dialog/dialog-vaga";
import { Loader2 } from "lucide-react";

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
  const [nivelFiltro, setNivelFiltro] = useState("");
  const [modalidadeFiltro, setModalidadeFiltro] = useState("");

  const handleLogout = async () => {
    await authClient.signOut();
  };

  // 🧠 Lógica de filtro
  const vagasFiltradas = vagas?.filter((vaga) => {
    const matchNome =
      vaga.titulo.toLowerCase().includes(nomeFiltro.toLowerCase());

    const matchNivel =
      nivelFiltro === "" || vaga.nivel === nivelFiltro;

    const matchModalidade =
      modalidadeFiltro === "" || vaga.modalidade === modalidadeFiltro;

    return matchNome && matchNivel && matchModalidade;
  });

  return (
    <div className="w-full min-h-full flex flex-col gap-2 relative">
      
      {/* 🔍 FILTROS */}
      <div className="w-full h-auto bg-white rounded-lg shadow p-4 flex flex-col gap-3">
        <h1 className="text-black font-semibold">Filtros</h1>

        <input
          type="text"
          placeholder="Buscar por nome da vaga..."
          value={nomeFiltro}
          onChange={(e) => setNomeFiltro(e.target.value)}
          className="border text-black placeholder:text-gray-500  rounded p-2"
        />

        <div className="flex gap-2">
          <select
            value={nivelFiltro}
            onChange={(e) => setNivelFiltro(e.target.value)}
            className="border text-black placeholder:text-gray-500 rounded p-2 w-full"
          >
            <option value="">Todos os níveis</option>
            <option value="Júnior">Júnior</option>
            <option value="Pleno">Pleno</option>
            <option value="Sênior">Sênior</option>
          </select>

          <select
            value={modalidadeFiltro}
            onChange={(e) => setModalidadeFiltro(e.target.value)}
            className="border rounded text-black placeholder:text-gray-500  p-2 w-full"
          >
            <option value="">Todas modalidades</option>
            <option value="Remoto">Remoto</option>
            <option value="Híbrido">Híbrido</option>
            <option value="Presencial">Presencial</option>
          </select>
        </div>
      </div>

      {/* 📋 LISTA DE VAGAS */}
      {vagas ? (
        <div className="w-full h-auto bg-white rounded-lg shadow p-4 gap-2 flex flex-col">
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