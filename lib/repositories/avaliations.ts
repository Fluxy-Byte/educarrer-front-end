import { prisma } from "@/lib/prisma";

export class AvaliationRepository {

    async getAvaliations() {
        return await prisma.avaliations.findMany();
    }

    async getAvaliationsByUserIdAndStudyId(userId: string, studyId: string) {
        return await prisma.avaliations.findMany({
            where: {
                userId,
                studyId,
            },
        });
    }

    async createAvaliation(data: { userId: string; studyId: string; satisfied: boolean; comment?: string }) {
        return await prisma.avaliations.create({
            data,
        });
    }

    async updateAvaliation(id: string, data: { satisfied?: boolean; comment?: string }) {
        return await prisma.avaliations.update({
            where: {
                id,
            },
            data,
        });
    }
}