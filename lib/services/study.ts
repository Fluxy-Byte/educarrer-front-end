import { StudyRepository } from "@/lib/database/repositories/study";
import { CreateStudyDTO, UpdateStudyDTO } from "@/lib/interfaces/study.interface";

const studyRepository = new StudyRepository();

export async function getStudyByUserId(userId: string) {
    return await studyRepository.getStudyByUserId(userId);
}

export async function createStudy(data: CreateStudyDTO) {
    return await studyRepository.createStudy(data);
}

export async function deleteStudy(id: string) {
    return await studyRepository.deleteStudy(id);
}

export async function updateStudy(id: string, data: Partial<UpdateStudyDTO>) {
    return await studyRepository.updateStudy(id, data);
}