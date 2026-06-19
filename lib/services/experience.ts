import { ExperienceRepository } from "@/lib/repositories/experience";
import { CreateExperienceDTO, UpdateExperienceDTO } from "@/lib/interfaces/experience.interface";
import { ExperienceRedis } from "@/lib/redis/experience";
import { redis } from "@/lib/redis/redis";

const experienceRepository = new ExperienceRepository();
const experienceRedis = new ExperienceRedis()

export async function getExperienceByUserId(userId: string) {
    return await experienceRedis.getExperiencesFromRedis(userId);
}

export async function createExperience(data: CreateExperienceDTO) {
    await redis.del("experience:list");
    return await experienceRepository.createExperience(data);
}

export async function deleteExperience(id: string) {
    await redis.del("experience:list");
    return await experienceRepository.deleteExperience(id);
}

export async function updateExperience(id: string, data: Partial<UpdateExperienceDTO>) {
    await redis.del("experience:list");
    return await experienceRepository.updateExperience(id, data);
}

export async function getExperienceByUserIdAndId(userId: string, id: string) {
    return await experienceRedis.getExperienceByUserIdAndIdFromRedis(userId, id);
}