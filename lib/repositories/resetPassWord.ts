import { prisma } from "@/lib/prisma";

import { CreateResetPassWordDTO, ResetPassWordDTO, UpdateResetPassWordDTO } from "@/lib/interfaces/resetPassWord.interface";

export class ResetPasswordRepository {

    async createResetPassWord(data: CreateResetPassWordDTO): Promise<ResetPassWordDTO> {
        return await prisma.resetPassWord.create({
            data
        })
    }

    async getResetPassWordByTokenToReset(tokenToReset: string): Promise<ResetPassWordDTO | null> {
        return await prisma.resetPassWord.findFirst({
            where: {
                tokenToReset
            }
        })
    }

    async getAllResetPassWord(userId: string): Promise<ResetPassWordDTO[]> {
        return await prisma.resetPassWord.findMany({
            where: {
                userId
            }
        })
    }

    async getAllResetPassWordOpened(userId: string): Promise<ResetPassWordDTO[]> {
        return await prisma.resetPassWord.findMany({
            where: {
                userId,
                completed: false
            }
        })
    }

    async updateResetPassWord(data: UpdateResetPassWordDTO, id: string): Promise<ResetPassWordDTO> {
        return await prisma.resetPassWord.update({
            data,
            where: {
                id
            }
        })
    }
}