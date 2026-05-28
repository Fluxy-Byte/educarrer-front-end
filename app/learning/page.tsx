"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { useMemo, useState } from "react"
import { useSession } from "@/lib/utils/auth-client"
import { authClient } from "@/lib/utils/auth-client"
import { useStudies } from "@/app/services/study.swr"

export default function DashboardPage() {
  const { data: session } = useSession()
  const { studies } = useStudies()

  const [search, setSearch] = useState("")
  const [dateFilter, setDateFilter] = useState("")

  const handleLogout = async () => {
    await authClient.signOut()
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
        {
          filteredStudies.length === 0 ? (
            <p className="text-center text-gray-500">Nenhum estudo encontrado.</p>
          ) : (
            filteredStudies.map((study) => (
              <Accordion
                type="single"
                collapsible
                className="w-full text-black"
                key={study.id}
              >
                <AccordionItem className="text-black" value={study.id}>
                  <AccordionTrigger className="text-lg font-medium bg-gray-200 border hover:bg-blue-700/20 hover:border-blue-700 rounded-md px-4 py-2 w-full text-left">
                    {study.title}
                  </AccordionTrigger>

                  <AccordionContent>
                    <div
                      className="prose prose-sm bg-gray-100 max-w-none p-4"
                      dangerouslySetInnerHTML={{
                        __html: study.study,
                      }}
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))
          )
        }
      </div>
    </div>
  )
}