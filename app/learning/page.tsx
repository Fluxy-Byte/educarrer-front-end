"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { ThumbsUp, ThumbsDown, ChevronDown } from "lucide-react";

import { useMemo, useState } from "react";
import { useSession } from "@/lib/utils/auth-client";
import { authClient } from "@/lib/utils/auth-client";
import { useStudies } from "@/app/services/study.swr";
import { getAvaliationsByUserIdAndStudyId, createAvaliation, updateAvaliation } from "@/app/services/avaliations.swr";
import { ToastPersonalizado } from "@/components/toast";

export default function DashboardPage() {
  const { data: session } = useSession()
  const { studies } = useStudies();
  const [evaluationPerformed, setEvaluationPerformed] = useState<boolean | null>(null);
  const [idAvaliation, setIdAvaliation] = useState<string | null>(null);

  const [search, setSearch] = useState("")
  const [dateFilter, setDateFilter] = useState("")

  const handleLogout = async () => {
    await authClient.signOut()
  }

  const handleGetAvaliation = async (studyId: string) => {
    const res = await getAvaliationsByUserIdAndStudyId(studyId);
    console.log("res", res)
    if (res.avaliation) {
      console.log("Avaliação encontrada:", res.avaliation.satisfied);
      setEvaluationPerformed(res.avaliation.satisfied);
      setIdAvaliation(res.avaliation.id);
    } else {
      setEvaluationPerformed(null);
      setIdAvaliation(null);
    }
    return;
  }

  const handleUpdateOrCreateAvaliation = async (studyId: string, satisfied: boolean) => {
    if (idAvaliation) {
      const res = await updateAvaliation(idAvaliation, satisfied as boolean, "");
      if (res.avaliation) {
        setEvaluationPerformed(res.avaliation.satisfied);
        setIdAvaliation(res.avaliation.id);
      }
      ToastPersonalizado({ mensagem: res.message || "Avaliação atualizada com sucesso!" });
    } else {
      const res = await createAvaliation(satisfied as boolean, studyId);
      if (res.avaliation) {
        setEvaluationPerformed(res.avaliation.satisfied);
        setIdAvaliation(res.avaliation.id);
      }
      ToastPersonalizado({ mensagem: res.message || "Avaliação criada com sucesso!" });
    }
  }

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
            const formattedDate = study.createdAt
              ? new Date(study.createdAt).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
              : "";

            return (
              <Accordion
                type="single"
                collapsible
                className="w-full text-black!"
                key={study.id}
              >
                <AccordionItem
                  value={study.id}
                  onClick={() => handleGetAvaliation(study.id)}
                  className="border border-gray-200 rounded-xl overflow-hidden hover:border-gray-300 transition-colors data-[state=open]:border-blue-400"
                >
                  {/* Trigger */}
                  <AccordionTrigger className="flex items-center gap-3 px-4 py-3.5 w-full text-left hover:no-underline hover:bg-transparent [&>svg]:hidden">
                    <span className="text-[11px] font-medium text-gray-800 min-w-[20px]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 text-sm font-medium text-gray-800 truncate">
                      {study.title}
                    </span>
                    <span className="text-xs text-gray-400 whitespace-nowrap hidden sm:block">
                      {formattedDate}
                    </span>
                    <ChevronDown className="w-4 h-4 text-gray-400 transition-transform duration-200 group-data-[state=open]:rotate-180 shrink-0" />
                  </AccordionTrigger>

                  {/* Content */}
                  <AccordionContent className="p-0">
                    <div className="border-t border-gray-100">

                      {/* Evaluation bar */}
                      <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 border-b border-gray-100">
                        <span className="text-xs text-gray-500 flex-1">
                          Como você avalia este estudo?
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setEvaluationPerformed(true);
                            handleUpdateOrCreateAvaliation(study.id, true);
                          }}
                          className={`h-7 px-3 rounded-full text-xs gap-1.5 border transition-colors ${
                            evaluationPerformed === true
                              ? "bg-blue-50 border-blue-300 text-blue-700 hover:bg-blue-50"
                              : "border-gray-200 text-gray-500 hover:bg-gray-100"
                          }`}
                        >
                          <ThumbsUp className="w-3.5 h-3.5" />
                          Gostei
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setEvaluationPerformed(false);
                            handleUpdateOrCreateAvaliation(study.id, false);
                          }}
                          className={`h-7 px-3 rounded-full text-xs gap-1.5 border transition-colors ${
                            evaluationPerformed === false
                              ? "bg-red-50 border-red-300 text-red-600 hover:bg-red-50"
                              : "border-gray-200 text-gray-500 hover:bg-gray-100"
                          }`}
                        >
                          <ThumbsDown className="w-3.5 h-3.5" />
                          Não gostei
                        </Button>
                      </div>

                      {/* Study content */}
                      <div
                        className="px-4 py-4 prose prose-sm max-w-none text-gray-600 font-light"
                        dangerouslySetInnerHTML={{ __html: study.study }}
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            );
          })
        )}
      </div>
    </div>
  )
}