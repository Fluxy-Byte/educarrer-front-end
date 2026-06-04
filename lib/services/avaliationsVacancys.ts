import { AvaliationVacancysRepository } from "@/lib/repositories/avaliationsVacancys";

export async function getAvaliationVacancy() {
    try {
        const avaliation = new AvaliationVacancysRepository();
        return await avaliation.getAvaliations();
    } catch (e: any) {
        return []
    }
}

export async function getAvaliationVacancyByUserId(userId: string) {
    try {
        const avaliation = new AvaliationVacancysRepository();
        return await avaliation.getAvaliationsByUserId(userId);
    } catch (e: any) {
        return null
    }
}

export async function createAvaliationVacancy(data: { userId: string; comment?: string; satisfied: boolean }) {
    try {
        const avaliation = new AvaliationVacancysRepository();
        return avaliation.createAvaliation(data);
    } catch (e: any) {
        return null
    }
}

export async function updateAvaliationVacancy(id: string, data: { satisfied?: boolean; comment?: string }) {
    try {
        const avaliation = new AvaliationVacancysRepository();
        return avaliation.updateAvaliation(id, data);
    } catch (e: any) {
        return null
    }
}