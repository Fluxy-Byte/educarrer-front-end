"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { ChevronDown, Search, CalendarIcon, X, Trash } from "lucide-react";
import { useMemo, useState } from "react";
import { useStudies } from "@/app/services/study.swr";
import { getAvaliationsByUserIdAndStudyId, createAvaliation, updateAvaliation } from "@/app/services/avaliations.swr";

import CadsStudy from "@/components/cards/card-study";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"

// Evita o bug de "yyyy-mm-dd" sendo interpretado como UTC e voltando 1 dia
function parseLocalDate(value: string) {
  if (!value) return undefined
  const [year, month, day] = value.split("-").map(Number)
  return new Date(year, month - 1, day)
}

export default function DashboardPage() {
  const { studies } = useStudies();

  const [search, setSearch] = useState("")
  const [dateFilter, setDateFilter] = useState("")

  const hasActiveFilters = Boolean(search || dateFilter)

  const clearFilters = () => {
    setSearch("")
    setDateFilter("")
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
      <div className="flex gap-4 flex-col lg:flex-row items-stretch lg:items-center bg-white rounded-lg shadow-lg p-4">

        <InputGroup className="border-zinc-200">
          <InputGroupInput
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nome do estudo..."
            className="text-black! placeholder:text-black" />
          <InputGroupAddon>
            <Search className="text-black!" />
          </InputGroupAddon>
        </InputGroup>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className="w-full lg:max-w-55 border-zinc-200! border justify-start text-left font-normal text-black!"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateFilter
                ? format(parseLocalDate(dateFilter)!, "dd/MM/yyyy")
                : "Selecione uma data"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={parseLocalDate(dateFilter)}
              className="text-black!"
              onSelect={(date) =>
                setDateFilter(date ? format(date, "yyyy-MM-dd") : "")
              }
            />
          </PopoverContent>
        </Popover>

        <Button
          variant="ghost"
          onClick={clearFilters}
          disabled={!hasActiveFilters}
          className="text-white bg-red-500!"
        >
          <Trash strokeWidth={2} className="h-4 w-4" />
          Limpar filtros
        </Button>
      </div>

      <div className="border flex flex-col gap-4 rounded-lg overflow-hidden bg-white shadow-lg p-4">
        {filteredStudies.length === 0 ? (
          <p className="text-center text-black">Nenhum estudo encontrado.</p>
        ) : (
          filteredStudies.map((study, index) => {
            return (
              <CadsStudy key={study.id} study={study} />
            );
          })
        )}
      </div>
    </div >
  )
}