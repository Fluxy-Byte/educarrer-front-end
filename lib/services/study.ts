import { StudyRepository } from "@/lib/repositories/study";
import { CreateStudyDTO, UpdateStudyDTO } from "@/lib/interfaces/study.interface";
import { getSkillByUserId } from "@/lib/services/skill";
import { getExperienceByUserId } from "@/lib/services/experience";
import { getVacancysById } from "@/lib/services/vacancy";
import { HundleStudyWithOpenAi } from "@/lib/services/hundleStudyWithOpenAi";

const studyRepository = new StudyRepository();
const hundleStudyWithOpenAi = new HundleStudyWithOpenAi();

export async function getStudyByUserId(userId: string) {
    return await studyRepository.getStudyByUserId(userId);
}

export async function createStudy(idVacancy: string, userId: string) {
    const skills = await getSkillByUserId(userId);
    const experiences = await getExperienceByUserId(userId);
    const vacancy = await getVacancysById(Number(idVacancy));

    if (!vacancy) {
        return {
            status: false,
            message: "Vaga não encontrada"
        }
    }

    const techStackComparison = await hundleStudyWithOpenAi.getImportantSkills(skills, experiences, vacancy);
    const resumeCandidate = await hundleStudyWithOpenAi.createResumeCandidate(skills, experiences);

    return {
        status: true,
        message: "Sucesso na criação da study"
    }
        // return await studyRepository.createStudy(data);
    }

    export async function deleteStudy(id: string) {
        return await studyRepository.deleteStudy(id);
    }

    export async function updateStudy(id: string, data: Partial<UpdateStudyDTO>) {
        return await studyRepository.updateStudy(id, data);
    }