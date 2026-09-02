import { getUserByEmail } from "@/lib/services/user";
import { ResetPasswordRepository } from "@/lib/repositories/resetPassWord";
import { ResetPassWordDTO } from "@/lib/interfaces/resetPassWord.interface";
import { checkIfTheDateTimeHasPassedACertainNumberOfDays } from "@/lib/utils/checkIfTheDateTimeHasPassedACertainNumberOfDays";
import { hundleResetPasswordByEmailUser } from "@/lib/services/user";

interface ResCheck {
    isValid: boolean
    listResetPassword: ResetPassWordDTO[]
}

interface ResSendEmailResetPassword {
    status: boolean
    message: string
}

export class ResetPassword {

    private baseUrlSystem = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5401";

    async resetPasswordByUserEmail(email: string): Promise<ResSendEmailResetPassword> {

        const user = await getUserByEmail(email);

        if (!user) {
            return {
                status: false,
                message: "Este E-mail não foi encontrado!"
            }
        }

        const resCheck = await this.checkIfUserHaveSolicitationOpend(user.email);

        if (resCheck.isValid == false) {
            return {
                status: resCheck.isValid,
                message: "Este E-mail possui solicitações de reset em aberto, verifique a caixa de entrada ou spam"
            }
        }

        const resSendEmail = await hundleResetPasswordByEmailUser(user.email, this.baseUrlSystem);

        return {
            status: resSendEmail.status,
            message: resSendEmail.key
        }
    }

    async checkIfUserHaveSolicitationOpend(email: string): Promise<ResCheck> {
        const resetPasswordRepository = new ResetPasswordRepository();

        const resGetResetPasswordRepository = await resetPasswordRepository.getAllResetPassWordOpened(email);

        if (resGetResetPasswordRepository.length == 0) {
            return {
                isValid: true,
                listResetPassword: []
            };
        }

        const resetsOpened: ResetPassWordDTO[] = [];

        for (const reset of resGetResetPasswordRepository) {

            const dateTimeOpend = reset.createdAt;

            if (checkIfTheDateTimeHasPassedACertainNumberOfDays(dateTimeOpend, 2)) {

                // Atualizando na base o reset como concluido por conta dos dias
                resetPasswordRepository.updateResetPassWord({ completed: true }, reset.id);
            } else {
                resetsOpened.push(reset);
            }
        }

        return {
            isValid: resetsOpened.length == 0, // Verifica se na lista resetsOpened
            listResetPassword: resetsOpened
        };
    }

    async getResetPasswordByTokenToReset(tokenToReset: string): Promise<boolean> {
        const resetPasswordRepository = new ResetPasswordRepository();

        const resFilterFirstResetPasswordByToken = await resetPasswordRepository.getResetPassWordByTokenToReset(tokenToReset);

        return resFilterFirstResetPasswordByToken?.completed ?? false;
    }
}


