import { AvaliationRepository } from "@/lib/repositories/avaliations";

export async function getAvaliations() {
    try {
        const avaliation = new AvaliationRepository();
        return avaliation.getAvaliations();
    } catch (e: any) {
        return []
    }
}

export async function getAvaliationsByUserIdAndStudyId(userId: string, studyId: string) {
    try {
        const avaliation = new AvaliationRepository();
        return avaliation.getAvaliationsByUserIdAndStudyId(userId, studyId);
    } catch (e: any) {
        return null
    }
}

export async function createAvaliation(data: { userId: string; studyId: string; satisfied: boolean; comment?: string }) {
    try {
        const avaliation = new AvaliationRepository();
        return avaliation.createAvaliation(data);
    } catch (e: any) {
        return null
    }
}

export async function updateAvaliation(id: string, data: { satisfied?: boolean; comment?: string }) {
    try {
        const avaliation = new AvaliationRepository();
        return avaliation.updateAvaliation(id, data);
    } catch (e: any) {
        return null
    }
}

