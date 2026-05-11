import { SkillRepository } from "@/lib/repositories/skill";
import { CreateSkillDTO, UpdateSkillDTO } from "@/lib/interfaces/skill.interface";

const userRepository = new SkillRepository();

export async function getSkillByUserId(userId: string) {
    return await userRepository.getSkillByUserId(userId);
}

export async function createSkill(data: CreateSkillDTO) {
    return await userRepository.createSkill(data);
}

export async function deleteSkill(id: string) {
    return await userRepository.deleteSkill(id);
}

export async function updateSkill(id: string, data: UpdateSkillDTO) {
    return await userRepository.updateSkill(id, data);
}