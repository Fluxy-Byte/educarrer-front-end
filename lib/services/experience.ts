import { ExperienceRepository } from "@/lib/repositories/experience";
import { CreateExperienceDTO, UpdateExperienceDTO } from "@/lib/interfaces/experience.interface";

const experienceRepository = new ExperienceRepository();

export async function getExperienceByUserId(userId: string) {
    return await experienceRepository.getExperienceByUserId(userId);
}

export async function createExperience(data: CreateExperienceDTO) {
    return await experienceRepository.createExperience(data);
}

export async function deleteExperience(id: string) {
    return await experienceRepository.deleteExperience(id);
}

export async function updateExperience(id: string, data: Partial<UpdateExperienceDTO>) {
    return await experienceRepository.updateExperience(id, data);
}