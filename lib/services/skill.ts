import { SkillRepository } from "@/lib/repositories/skill";
import { CreateSkillDTO, SkillDTO, UpdateSkillDTO } from "@/lib/interfaces/skill.interface";
import { SkillsRedis } from "@/lib/redis/skills";
import { redis } from "@/lib/redis/redis";

const userRepository = new SkillRepository();
const skillsRedis = new SkillsRedis();

export async function getSkillByUserId(userId: string) {
    return await skillsRedis.getSkillsFromRedis(userId);
}

export async function createSkill(data: CreateSkillDTO) {
    await redis.del("skill:list");
    return await userRepository.createSkill(data);
}

export async function deleteSkill(id: string) {
    await redis.del("skill:list");
    return await userRepository.deleteSkill(id);
}

export async function updateSkill(id: string, data: UpdateSkillDTO) {
    await redis.del("skill:list");
    return await userRepository.updateSkill(id, data);
}

export async function getSkillByUserIdAndId(userId: string, id: string) {
    return await skillsRedis.getSkillByUserIdAndIdFromRedis(userId, id);
}