"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { BookCheck, SquareUser, BookOpen, Star, Target, Calendar, Zap, NotepadText, Route } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  getStudyById,
  ResultGetFilterStudy,
  StudyFilterDTO,
  StudySectionDTO,
  StudyStrengthDTO,
  StudyGapDTO,
  StudyPlanDTO,
} from "@/app/services/study.swr";

import {
  getAvaliationsByUserIdAndStudyId,
  createAvaliation,
  updateAvaliation,
} from "@/app/services/avaliations.swr";

import { ToastPersonalizado } from "@/components/toast";

function OverviewStats({ study }: { study: StudyFilterDTO }) {
  const totalStrengths = study.sections.reduce(
    (acc, s) => acc + s.strengths.length,
    0
  );
  const totalGaps = study.sections.reduce((acc, s) => acc + s.gaps.length, 0);
  const totalWeeks =
    study.sections.length > 0
      ? Math.max(
        ...study.sections.flatMap((s) => s.plans.map((p) => p.week)),
        0
      )
      : 0;

  const stats = [
    {
      icon: <BookOpen className="w-12 h-12 p-2 rounded-lg text-blue-600 bg-blue-200" />,
      label: "Seções do roteiro",
      value: study.sections.length,
      sub: "áreas de conhecimento",
    },
    {
      icon: <Star className="w-12 h-12 p-2 rounded-lg text-yellow-600 bg-yellow-100" />,
      label: "Pontos fortes",
      value: totalStrengths,
      sub: "habilidades consolidadas",
    },
    {
      icon: <Target className="w-12 h-12 p-2 rounded-lg text-red-500 bg-red-100" />,
      label: "Lacunas identificadas",
      value: totalGaps,
      sub: "oportunidades de melhoria",
    },
    {
      icon: <Calendar className="w-12 h-12 p-2 rounded-lg text-indigo-500 bg-indigo-100" />,
      label: "Plano de estudo",
      value: totalWeeks > 0 ? `${totalWeeks} semanas` : "—",
      sub: "planejamento sugerido",
    },
  ];

  return (
    <div>
      <h3 className="text-gray-800 font-bold text-xl mb-3">
        Visão geral do roteiro
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label} className="border border-gray-200 shadow-sm">
            <CardContent className="p-4 flex items-start gap-6">
              <div className="mt-0.5">{s.icon}</div>
              <div>
                <p className="text-sm font-semibold text-black">{s.label}</p>
                <p className="text-md lg:text-2xl font-bold text-black leading-tight">
                  {s.value}
                </p>
                <p className="text-xs text-gray-400">{s.sub}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ── page ─────────────────────────────────────────────────────────────────────

export default function LearningPage(props: { id: string }) {
  const id = props?.id as string;
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [study, setStudy] = useState<StudyFilterDTO | null>(null);
  const [evaluationPerformed, setEvaluationPerformed] = useState<boolean | null>(null);
  const [idAvaliation, setIdAvaliation] = useState<string | null>(null);

  const handleGetAvaliation = useCallback(async (studyId: string) => {
    try {
      const res = await getAvaliationsByUserIdAndStudyId(studyId);
      if (res.avaliation) {
        setEvaluationPerformed(res.avaliation.satisfied);
        setIdAvaliation(res.avaliation.id);
      } else {
        setEvaluationPerformed(null);
        setIdAvaliation(null);
      }
    } catch (error) {
      console.error("Erro ao buscar avaliação:", error);
    }
  }, []);

  const handleUpdateOrCreateAvaliation = async (
    studyId: string,
    satisfied: boolean
  ) => {
    try {
      if (idAvaliation) {
        const res = await updateAvaliation(idAvaliation, satisfied, "");
        if (res.avaliation) {
          setEvaluationPerformed(res.avaliation.satisfied);
          setIdAvaliation(res.avaliation.id);
        }
        ToastPersonalizado({ mensagem: res.message || "Avaliação atualizada com sucesso!" });
        return;
      }

      const res = await createAvaliation(satisfied, studyId);
      if (res.avaliation) {
        setEvaluationPerformed(res.avaliation.satisfied);
        setIdAvaliation(res.avaliation.id);
      }
      ToastPersonalizado({ mensagem: res.message || "Avaliação criada com sucesso!" });
    } catch (error) {
      console.error(error);
      ToastPersonalizado({ mensagem: "Erro ao salvar avaliação." });
    }
  };

  const fetchStudy = async (id: string) => {
    if (!id) {
      ToastPersonalizado({ mensagem: "Estudo não encontrado." });
      router.push("/learning");
      return;
    }

    try {
      setLoading(true);
      const res: ResultGetFilterStudy = await getStudyById(id);

      if (!res.study) {
        ToastPersonalizado({ mensagem: "Não encontramos esse estudo no momento!" });
        router.push("/learning");
        return;
      }

      setStudy(res.study);
      await handleGetAvaliation(id);
    } catch (error) {
      console.error(error);
      ToastPersonalizado({ mensagem: "Tivemos um erro inesperado." });
      router.push("/learning");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudy(id);
  }, [id]);

  if (loading) {
    return (
      <div className="w-full min-h-full flex items-center justify-center">
        <span className="text-gray-500">Carregando estudo...</span>
      </div>
    );
  }

  if (!study) return null;

  return (
    <div className="w-full min-h-full flex flex-col gap-6 pb-10">
      {/* ── Hero card ── */}
      <Card className="border border-gray-200 shadow-sm overflow-hidden">
        <CardContent className="p-5 flex items-start justify-between gap-4">
          <div className="flex flex-col gap-4 flex-1">
            <h2 className="text-gray-900 text-2xl font-bold leading-snug">
              {study.title}
            </h2>

            {/* Evaluation buttons */}
            <div className="flex gap-2">
              <Button
                onClick={() => handleUpdateOrCreateAvaliation(study.id, true)}
                variant={evaluationPerformed === true ? "default" : "ghost"}
                className={
                  evaluationPerformed === true
                    ? "bg-green-500! hover:bg-green-600! text-white border-transparent text-md font-bold"
                    : "border-gray-300! text-gray-700! hover:bg-gray-300! text-md font-bold"
                }
              >
                👍 Gostei
              </Button>

              <Button
                onClick={() => handleUpdateOrCreateAvaliation(study.id, false)}
                variant={evaluationPerformed === false ? "close" : "ghost"}
                className={
                  evaluationPerformed === false
                    ? "bg-red-500! hover:bg-red-600! text-white border-transparent text-md font-bold"
                    : "border-gray-300! text-gray-700! hover:bg-gray-300! text-md font-bold"
                }
              >
                👎 Não gostei
              </Button>
            </div>

            <p className="text-sm text-gray-500">
              Avaliação atual:{" "}
              <span className="font-medium text-gray-700">
                {evaluationPerformed === null
                  ? "Não avaliado"
                  : evaluationPerformed
                    ? "Positiva"
                    : "Negativa"}
              </span>
            </p>
          </div>

          {/* Decorative illustration placeholder */}
          <div className="hidden md:flex items-center justify-center w-36 h-24 rounded-xl bg-linear-to-br from-indigo-50 to-purple-100 shrink-0 text-5xl select-none">
            🚀
          </div>
        </CardContent>
      </Card>

      {/* ── Overview stats ── */}
      <OverviewStats study={study} />

      {/* ── Sections ── */}
      <div className="flex flex-col gap-3">
        <h3 className="text-gray-800 font-bold text-xl mb-3">
          Seções do roteiro de estudos
        </h3>

        {study.sections.map((section, idx) => (
          <Card key={idx} className="overflow-hidden shadow-sm border border-gray-200">
            <CardContent>
              {
                section.type == "resume" && (
                  <div className="flex flex-col w-full gap-2">
                    <span className="flex gap-2">
                      <SquareUser className="text-blue-600 bg-blue-100 w-12 h-12 p-2 rounded-lg" />
                      <h1 className="text-black text-xl font-bold">
                        Resumo do Perfil e da Vaga
                      </h1>
                    </span>


                    <p className="text-black">
                      {section.content}
                    </p>
                  </div>
                )
              }

              {
                section.type == "strengths" && (
                  <div className="flex flex-col w-full gap-2">
                    <span className="flex gap-2">
                      <Route className="text-yellow-600 bg-yellow-100 w-12 h-12 p-2 rounded-lg" />
                      <h1 className="text-black text-xl font-bold">
                        Pontos fortes no seu perfil
                      </h1>
                    </span>

                    <div className="flex flex-col gap-6">
                      {
                        section.strengths.map((s) => (
                          <div key={s.id} className="flex gap-4 justify-start items-center flex-col lg:flex-row bg-neutral-200 p-2 rounded-lg shadow-lg">
                            <div className="w-full lg:w-auto text-center h-full p-4 bg-amber-800 rounded-lg">
                              <h1 className="text-yellow-500 font-bold">{s.skill}</h1>
                            </div>
                            <div>
                              <span className="flex gap-1">
                                <h1 className="text-black font-bold">
                                  Habilidade:
                                </h1>
                                <p className="text-black">{s.importance}</p>
                              </span>
                              <span className="flex gap-1">
                                <h1 className="text-black font-bold">
                                  Conselho:
                                </h1>
                                <p className="text-black">{s.advice}</p>
                              </span>

                            </div>
                          </div>
                        ))
                      }
                    </div>

                  </div>
                )
              }

              {
                section.type == "lacunasaDevelop" && (
                  <div className="flex flex-col w-full gap-2">

                    <span className="flex gap-2">
                      <Zap className="text-red-500 bg-red-100 w-12 h-12 p-2 rounded-lg" />
                      <h1 className="text-black text-xl font-bold">
                        Lacunas a desenvolver
                      </h1>
                    </span>

                    <div className="flex flex-col gap-6">
                      {
                        section.gaps.map((g) => (
                          <div key={g.id} className="flex gap-4 justify-start items-center bg-zinc-100 p-2 rounded-lg">
                            <div className="w-auto h-full p-4 bg-blue-100 rounded-lg">
                              <h1 className="text-blue-500 font-bold">{g.skill}</h1>
                            </div>

                            <div className="flex flex-col gap-1">
                              <span className="flex gap-1">
                                <h1 className="text-black font-bold">
                                  Explicação:
                                </h1>
                                <p className="text-black">{g.explanation}</p>
                              </span>
                              <span className="flex gap-1">
                                <h1 className="text-black font-bold">
                                  Tempo estimado:
                                </h1>
                                <p className="text-black">{g.estimatedTime}</p>
                              </span>

                              <span className="flex gap-1">
                                <h1 className="text-black font-bold">
                                  Prioridade:
                                </h1>
                                <p className="text-black">{g.priority}</p>
                              </span>

                              <h1 className="text-black font-bold">Tópicos:</h1>
                              <span className="w-full grid grid-cols-1 gap-2 lg:flex">
                                {
                                  g.topics.map((t, itp) => (
                                    <Badge className="text-sm" key={itp}>
                                      {t}
                                    </Badge>
                                  ))
                                }
                              </span>

                              <h1 className="text-black font-bold">Recursos:</h1>
                              <span className="w-full grid grid-cols-1 gap-2 lg:flex">
                                {
                                  g.resources.map((r, idr) => (
                                    <Badge className="text-sm" key={idr}>
                                      {r}
                                    </Badge>
                                  ))
                                }
                              </span>


                            </div>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                )
              }

              {
                section.type == "studyPlans" && (
                  <div className="flex flex-col w-full gap-2">

                    <span className="flex gap-2">
                      <NotepadText className="text-green-500 bg-green-100 w-12 h-12 p-2 rounded-lg" />
                      <h1 className="text-black text-xl font-bold">
                        Plano de estudos semanal
                      </h1>
                    </span>

                    <div className="flex flex-col gap-6">
                      {
                        section.plans.map((p) => (
                          <div key={p.id} className="flex gap-4 justify-start items-center bg-zinc-100 p-2 rounded-lg">
                            <div className="w-auto h-full p-4 bg-blue-100 rounded-lg">
                              <h1 className="text-blue-500 font-bold">Semana {p.week}</h1>
                            </div>
                            <div>

                              <span className="flex gap-1">
                                <h1 className="text-black font-bold">
                                  Foco:
                                </h1>
                                <p className="text-black">{p.focus}</p>
                              </span>
                              <span className="flex gap-1">
                                <h1 className="text-black font-bold">
                                  Metas para realizar:
                                </h1>
                                <p className="text-black">{p.goals}</p>
                              </span>

                            </div>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                )
              }

              {
                section.type == "finalTip" && (
                  <div className="flex flex-col w-full gap-2">

                    <span className="flex gap-2">
                      <BookCheck className="text-orange-600 bg-orange-100 w-12 h-12 p-2 rounded-lg" />
                      <h1 className="text-black text-xl font-bold">
                        Dica final para o estudo
                      </h1>
                    </span>

                    <p className="text-black">
                      {section.content}
                    </p>
                  </div>
                )
              }
            </CardContent>
          </Card>

        ))}
      </div>
    </div>
  );
}