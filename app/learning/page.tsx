"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Input } from "@/components/ui/input";

import { ChevronDown } from "lucide-react";

import { useMemo, useState } from "react";
import { useSession } from "@/lib/utils/auth-client";
import { authClient } from "@/lib/utils/auth-client";
import { useStudies } from "@/app/services/study.swr";
import { getAvaliationsByUserIdAndStudyId, createAvaliation, updateAvaliation } from "@/app/services/avaliations.swr";
import { ToastPersonalizado } from "@/components/toast";
import CadsStudy from "@/components/cards/card-study";

export default function DashboardPage() {
  const { studies } = useStudies();

  const [search, setSearch] = useState("")
  const [dateFilter, setDateFilter] = useState("")


  const filteredStudies = useMemo(() => {
    if (!studies) return []

    return studies.filter((study) => {
      const matchesSearch = study.title
        .toLowerCase()
        .includes(search.toLowerCase())

      const studyDate = study.createdAt
        ? new Date(study.createdAt).toISOString().split("T")[0]
        : ""

      const matchesDate =
        !dateFilter || studyDate === dateFilter

      return matchesSearch && matchesDate
    })
  }, [studies, search, dateFilter])

  return (
    <div className="w-full min-h-full flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold w-full text-start text-black p-4 bg-white rounded-lg shadow-lg">
          Estudos
        </h1>
      </div>

      <div className="flex gap-4 bg-white rounded-lg shadow-lg p-4">
        <Input
          placeholder="Buscar por título..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="max-w-[220px]"
        />
      </div>

      <div className="border flex flex-col gap-4 rounded-lg overflow-hidden bg-white shadow-lg p-4">
        {filteredStudies.length === 0 ? (
          <p className="text-center text-gray-500">Nenhum estudo encontrado.</p>
        ) : (
          filteredStudies.map((study, index) => {
            return (
              <CadsStudy key={study.id} study={study} />
            );
          })
        )}
      </div>
    </div>
  )
}
