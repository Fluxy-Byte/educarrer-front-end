import { prisma } from "@/lib/prisma";
import { CreateStudyDTO, UpdateStudyDTO, StudyDTO } from "@/lib/interfaces/study.interface";

export async function getStudyByUserId(userId: string): Promise<StudyDTO[]> {
    return await prisma.study.findMany({
        where: {
            userId,
        },
    });
}

export async function createStudy(data: CreateStudyDTO): Promise<StudyDTO> {
    return await prisma.study.create({
        data
    });
}

export async function deleteStudy(id: string) {
    return await prisma.study.delete({
        where: {
            id
        }
    });
}

export async function updateStudy(id: string, data: Partial<UpdateStudyDTO>): Promise<StudyDTO> {
    return await prisma.study.update({
        where:{
            id
        },
        data
    });
}