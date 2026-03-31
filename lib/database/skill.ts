import { prisma } from "@/lib/prisma";
import { CreateSkillDTO, SkillDTO, UpdateSkillDTO } from "@/lib/interfaces/skill.interface";

export async function getSkillByUserId(userId: string): Promise<SkillDTO[]> {
    return await prisma.skill.findMany({
        where: {
            userId,
        },
    });
}

export async function createSkill(data: CreateSkillDTO): Promise<SkillDTO> {
    return await prisma.skill.create({
        data
    })
}

export async function deleteSkill(id: string) {
    return await prisma.skill.delete({
        where: {
            id
        }
    })
}

export async function updateSkill(id: string, data: UpdateSkillDTO): Promise<SkillDTO> {
    return await prisma.skill.update({
        where: {
            id
        },
        data
    })

}