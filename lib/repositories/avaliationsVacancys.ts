import { prisma } from "@/lib/prisma";

export class AvaliationVacancysRepository {
    async getAvaliations() {
        return await prisma.avaliationsVacancys.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });
    }

    async getAvaliationsByUserId(userId: string) {
        return await prisma.avaliationsVacancys.findFirst({
            where: {
                userId
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
    }

    async createAvaliation(data: { userId: string; comment?: string; satisfied: boolean }) {
        return await prisma.avaliationsVacancys.create({
            data,
        });
    }

    async updateAvaliation(id: string, data: { satisfied?: boolean; comment?: string }) {
        return await prisma.avaliationsVacancys.update({
            where: {
                id,
            },
            data,
        });
    }
}