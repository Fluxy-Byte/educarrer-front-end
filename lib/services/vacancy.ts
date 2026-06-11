import { getVacancysFromRedis } from "@/lib/redis/vacancy";
import { VacancyRepository } from "@/lib/repositories/vacancy";
import { CreateVacancyData } from "@/lib/interfaces/vacancy.interface";

const vacancysRepository = new getVacancysFromRedis();

export async function getVacancys() {
    return await vacancysRepository.getVacancysFromRedis();
}

export async function getVacancysById(id: number) {
   // const res = await vacancysRepository.getVacancysByIdFromRedis(id);
    return await vacancysRepository.getVacancysByIdFromDataBase(id);
}

export async function createVacancy(data: CreateVacancyData) {
    const vacancyRepository = new VacancyRepository();
    return await vacancyRepository.createVacancy(data);
}

export async function updateVacancy(id: string, data: CreateVacancyData) {
    const vacancyRepository = new VacancyRepository();
    return await vacancyRepository.updateVacancy(id, data);
}