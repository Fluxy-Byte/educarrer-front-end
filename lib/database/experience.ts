import { prisma } from "@/lib/prisma";
import { CreateExperienceDTO, ExperienceDTO, UpdateExperienceDTO } from "@/lib/interfaces/experience.interface";

export async function getExperienceByUserId(userId: string): Promise<ExperienceDTO[]> {
    return await prisma.experience.findMany({
        where: {
            userId,
        },
    });
}

export async function createExperience(data: CreateExperienceDTO): Promise<ExperienceDTO> {
    return await prisma.experience.create({
        data
    });
}

export async function deleteExperience(id: string) {
    return await prisma.experience.delete({
        where: {
            id
        }
    });
}

export async function updateExperience(id: string, data: Partial<UpdateExperienceDTO>): Promise<ExperienceDTO> {
    return await prisma.experience.update({
        where:{
            id
        },
        data
    });
}