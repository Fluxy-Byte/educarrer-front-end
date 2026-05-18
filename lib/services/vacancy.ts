import { getVacancysFromRedis } from "@/lib/redis/vacancy";

const vacancysRepository = new getVacancysFromRedis();

export async function getVacancys() {
    const res = await vacancysRepository.getVacancysFromRedis();
    return res;
}

export async function getVacancysById(id: number) {
    const res = await vacancysRepository.getVacancysByIdFromRedis(id);
    return res;
}