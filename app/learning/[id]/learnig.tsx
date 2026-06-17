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
      icon: <BookOpen className="w-8 h-8 lg:w-12 lg:h-12 p-2 rounded-lg text-blue-600 bg-blue-200" />,
      label: "Seções do roteiro",
      value: study.sections.length,
      sub: "áreas de conhecimento",
    },
    {
      icon: <Star className="w-8 h-8 lg:w-12 lg:h-12 p-2 rounded-lg text-yellow-600 bg-yellow-100" />,
      label: "Pontos fortes",
      value: totalStrengths,
      sub: "habilidades consolidadas",
    },
    {
      icon: <Target className="w-8 h-8 lg:w-12 lg:h-12 p-2 rounded-lg text-red-500 bg-red-100" />,
      label: "Lacunas identificadas",
      value: totalGaps,
      sub: "oportunidades de melhoria",
    },
    {
      icon: <Calendar className="w-8 h-8 lg:w-12 lg:h-12 p-2 rounded-lg text-indigo-500 bg-indigo-100" />,
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
            <CardContent className=" flex lg:flex-row flex-col items-start gap-2 lg:gap-4">
              <div className="">{s.icon}</div>
              <div className="flex flex-col gap-2 lg:gap-1">
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
        <CardContent className="py-0 px-6 flex items-center lg:items-start justify-start gap-4">
          <div className="flex items-center lg:items-start justify-center lg:justify-between flex-col gap-4">
            <h2 className="text-gray-900 text-xl text-center lg:text-left lg:text-2xl font-bold leading-snug">
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
                    : "text-black hover:bg-zinc-100! hover:text-black! text-md font-bold border border-zinc-200"
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
                    : "text-black hover:bg-zinc-100! hover:text-black! text-md font-bold border border-zinc-200"
                }
              >
                👎 Não gostei
              </Button>
            </div>

            <p className="text-sm text-gray-500 bg-zinc-50 p-2 rounded-lg border border-zinc-300">
              Avaliação atual:{" "}
              <span className={`font-medium ${evaluationPerformed ? "text-green-500" : "text-red-500"}`}>
                {evaluationPerformed === null
                  ? "Não avaliado"
                  : evaluationPerformed
                    ? "Positiva 😁"
                    : "Negativa 😓"}
              </span>
            </p>
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
                  <div className="flex flex-col w-full gap-4">
                    <span className="flex gap-2">
                      <SquareUser className="text-blue-600 hidden lg:block bg-blue-100 w-12 h-12 p-2 rounded-lg" />
                      <span>
                        <h1 className="text-black text-xl font-bold">
                          Resumo do Perfil e da Vaga
                        </h1>
                        <p className="text-zinc-600">
                          Separamos um resumo que nosso agente enchergou sobre você e a vaga
                        </p>
                      </span>
                    </span>


                    <p className="text-black">
                      {section.content}
                    </p>
                  </div>
                )
              }

              {
                section.type == "strengths" && (
                  <div className="flex flex-col w-full gap-4">
                    <span className="flex gap-2">
                      <Route className="text-yellow-800 bg-yellow-100 hidden lg:block w-12 h-12 p-2 rounded-lg" />
                      <span>
                        <h1 className="text-black text-xl font-bold">
                          Pontos fortes no seu perfil
                        </h1>
                        <p className="text-zinc-600">
                          Alguns pontos que encontramos match com seu perfil e a vaga
                        </p>
                      </span>
                    </span>

                    <div className="flex flex-col gap-6">
                      {
                        section.strengths.map((s) => (
                          <div key={s.id} className="flex gap-2 justify-start items-center lg:items-start flex-col border border-zinc-200 p-4 rounded-lg shadow-lg">
                            <h1 className="text-orange-500 text-xl font-bold">{s.skill}</h1>
                            <span className="flex flex-col lg:flex-row gap-1">
                              <h1 className="text-black font-bold">
                                Habilidade:
                              </h1>
                              <p className="text-black">{s.importance}</p>
                            </span>
                            <span className="flex flex-col lg:flex-row gap-1">
                              <h1 className="text-black font-bold">
                                Conselho:
                              </h1>
                              <p className="text-black">{s.advice}</p>
                            </span>

                          </div>
                        ))
                      }
                    </div>

                  </div>
                )
              }

              {
                section.type == "lacunasaDevelop" && (
                  <div className="flex flex-col w-full gap-4">

                    <span className="flex gap-2">
                      <Zap className="text-red-500 bg-red-100 hidden lg:block w-12 h-12 p-2 rounded-lg" />
                      <span>
                        <h1 className="text-black text-xl font-bold">
                          Lacunas a desenvolver
                        </h1>
                        <p className="text-zinc-600">
                          Separamos algumas lacunas importantes para seu perfil desenvolver
                        </p>
                      </span>

                    </span>

                    <div className="flex flex-col gap-6">
                      {
                        section.gaps.map((g) => (
                          <div key={g.id} className="flex flex-col gap-3 lg:gap-5 justify-start lg:items-start items-center border border-zinc-200 shadow-lg p-4 rounded-lg">
                            <div className="w-auto">
                              <h1 className="text-red-500 text-xl font-bold">{g.skill}</h1>
                            </div>

                            <div className="flex flex-col gap-2">
                              <span className="flex gap-1">
                                <h1 className="text-black">
                                  <b>Explicação:</b> {g.explanation}
                                </h1>
                              </span>
                              <span className="flex gap-1">
                                <h1 className="text-black">
                                  <b>Tempo estimado:</b> {g.estimatedTime}
                                </h1>
                              </span>

                              <span className="flex gap-1">
                                <h1 className="text-black">
                                  <b>Prioridade:</b> {g.priority}
                                </h1>
                              </span>

                              <h1 className="text-black font-bold">Tópicos:</h1>
                              <span className="w-full flex flex-wrap gap-2">
                                {
                                  g.topics.map((t, itp) => (
                                    <Badge className="p-2 text-sm text-purple-800 bg-purple-100 border-purple-400 whitespace-normal wrap-break-word" key={itp}>
                                      {t}
                                    </Badge>
                                  ))
                                }
                              </span>

                              <h1 className="text-black font-bold">Recursos:</h1>
                              <span className="w-full flex flex-wrap gap-2">
                                {
                                  g.resources.map((r, idr) => (
                                    <Badge className="p-2 text-sm text-green-800 bg-green-100 border-green-400 whitespace-normal wrap-break-word" key={idr}>
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
                  <div className="flex flex-col w-full gap-4">

                    <span className="flex gap-2">
                      <NotepadText className="text-green-800 bg-green-100 hidden lg:block w-12 h-12 p-2 rounded-lg" />
                      <span>
                        <h1 className="text-black text-xl font-bold">
                          Plano de estudos semanal
                        </h1>
                        <p className="text-zinc-600 whitespace-normal wrap-break-word">
                          Seu plano de desenvolvimento foi estruturado com base nas competências mais relevantes para sua carreira. Organizamos os estudos em etapas semanais para facilitar o aprendizado e torná-lo compatível com sua rotina.
                        </p>
                      </span>
                    </span>

                    <div className="flex flex-col gap-6">
                      {
                        section.plans.map((p) => (
                          <div key={p.id} className="flex flex-col gap-2 justify-start items-center lg:items-start border border-zinc-200 shadow-lg p-4 rounded-lg">
                            <div className="w-auto">
                              <h1 className="text-blue-500 text-xl font-bold">Semana {p.week}</h1>
                            </div>

                            <div className="flex flex-col gap-1">
                              <span className="flex gap-1 flex-col lg:flex-row">
                                <h1 className="text-black font-bold">Foco: </h1>
                                <p className="text-black">{p.focus}</p>
                              </span>
                              <span className="flex gap-1 flex-col lg:flex-row">
                                <h1 className="text-black font-bold">Oque você precisa entender: </h1>
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
                  <div className="flex flex-col w-full gap-4">

                    <span className="flex gap-2">
                      <BookCheck className="text-orange-600 bg-orange-100 hidden lg:block w-12 h-12 p-2 rounded-lg" />
                      <span>
                        <h1 className="text-black text-xl font-bold">
                          Dica final para o estudo
                        </h1>
                        <p className="text-zinc-600 whitespace-normal wrap-break-word">
                          Pra fechar com chave de ouro deixamos uma dica para concluir seu estudo
                        </p>
                      </span>
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
    </div >
  );
}