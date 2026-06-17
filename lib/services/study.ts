import { StudyRepository } from "@/lib/repositories/study";
import { GeneratedStudy, GeneratedStrength, GeneratedGap, GeneratedStudyPlan } from "@/lib/interfaces/openai.interface";
import { getSkillByUserId } from "@/lib/services/skill";
import { getExperienceByUserId } from "@/lib/services/experience";
import { getVacancysById } from "@/lib/services/vacancy";
import { HundleStudyWithOpenAi } from "@/lib/services/hundleStudyWithOpenAi";

const studyRepository = new StudyRepository();
const hundleStudyWithOpenAi = new HundleStudyWithOpenAi();

export async function getStudyByUserId(userId: string) {
    return await studyRepository.getStudyByUserIdClear(userId);
}

export async function createStudy(idVacancy: string, userId: string) {
    const skills = await getSkillByUserId(userId);

    if (skills.length == 0) {
        return {
            status: false,
            message: "E necessario que cadastre ao menos 1 habilidade no seu perfil para a criação de estudos personalizados!"
        }
    }

    const experiences = await getExperienceByUserId(userId);

    const vacancy = await getVacancysById(idVacancy);

    if (!vacancy) {
        return {
            status: false,
            message: "Vaga não encontrada"
        }
    }

    const searchStudyByUserId = await studyRepository.getStudyByUserIdAndVancacyId(userId, idVacancy);
    console.log("Passou")
    if (searchStudyByUserId) {
        return {
            status: false,
            message: "Verificamos que você ja tem um estudo para essa vaga. Vá para tela de estudos e verifique!"
        }
    }



    const techStackComparison = await hundleStudyWithOpenAi.getImportantSkills(skills, experiences, vacancy);
    const resumeCandidate = await hundleStudyWithOpenAi.createResumeCandidate(skills, experiences);

    const profile = {
        "missing": techStackComparison?.missing ?? [], // Skills que esta ausente no perfil do usuario 
        "strong": techStackComparison?.strong ?? [], // Skills fortes no perfil do usuario
        "matchPercentage": techStackComparison?.matchPercentage ?? 0, // Porcentagem de match com o perfil do usuario
        "resume": resumeCandidate || ""
    }

    const roadMapCandidate = await hundleStudyWithOpenAi.createRoadMapCandidate(vacancy, profile);

    const listStudies: GeneratedStudy | null = roadMapCandidate ? JSON.parse(roadMapCandidate) : null

    try {
        if (listStudies) {
            const study = await studyRepository.createStudyEmpty({
                title: listStudies.study_name,
                userId,
                vacancyId: idVacancy
            });

            if (study) {
                for (const st of listStudies.studies) {
                    const section = await studyRepository.createSectionStudy(
                        {
                            section: st.section,
                            type: st.type,
                            content: ((st.type == "resume" || st.type == "finalTip") && typeof st.content == "string") ? st.content : null,
                            studyId: study.id
                        }
                    )
                    if (section) {
                        if (st.type == "strengths") {
                            for (const ct of st.content) {
                                const content = ct as GeneratedStrength;
                                await studyRepository.createSectionStrength(
                                    {
                                        sectionId: section.id,
                                        skill: content.skill,
                                        importance: content.importance,
                                        advice: content.advice
                                    }
                                )
                            }
                        } else if (st.type == "lacunasaDevelop") {
                            for (const ct of st.content) {
                                const content = ct as GeneratedGap;
                                await studyRepository.createSectionGap(
                                    {
                                        sectionId: section.id,
                                        skill: content.skill,
                                        estimatedTime: content.estimated_time,
                                        explanation: content.explanation,
                                        priority: content.priority,
                                        resources: Array.isArray(content.resources) ? content.resources : [],
                                        topics: Array.isArray(content.topics) ? content.topics : [],
                                    }
                                )
                            }
                        } else if (st.type == "studyPlans") {
                            let i = 0;
                            for (const ct of st.content) {
                                i++
                                const content = ct as GeneratedStudyPlan;
                                await studyRepository.createSectionPlan(
                                    {
                                        sectionId: section.id,
                                        week: typeof content.week == "number" ? content.week : i,
                                        focus: content.focus,
                                        goals: content.goals,
                                    }
                                )
                            }
                        }
                    }

                }
            }
        }

        return {
            status: true,
            message: "Sucesso na criação da study"
        }
    } catch (e: any) {
        console.log(e);
        return {
            status: false,
            message: "Tivemos um erro na criação do estudo"
        }
    }
}

export async function getAllStudies() {
    return await studyRepository.getAllStudy();
}

export async function getStudyById(id: string) {
    return await studyRepository.getStudyById(id);
}