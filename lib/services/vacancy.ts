import { getVacancysFromRedis } from "@/lib/redis/vacancy";
import { VacancyRepository } from "@/lib/repositories/vacancy";
import { CreateVacancyData } from "@/lib/interfaces/vacancy.interface";
import { clearVacancysCache } from "@/lib/redis/clearCacheVacancys";


const vacancysRepositoryRedis = new getVacancysFromRedis();
const vacancysRepositoryDataBase = new VacancyRepository();

export async function getVacancys(userId: string) {
    return await vacancysRepositoryRedis.getVacancysFromRedis(userId);
}

export async function getVacancysById(userId: string, id: string) {
    const vacancy = await vacancysRepositoryRedis.getVacancysByIdFromRedis(userId, id);

    if (!vacancy) {
        return await vacancysRepositoryRedis.getVacancysByIdFromDataBase(id);
    }

    return vacancy;
}

export async function createVacancy(data: CreateVacancyData) {
    await clearVacancysCache();
    return await vacancysRepositoryDataBase.createVacancy(data);
}

export async function updateVacancy(id: string, data: CreateVacancyData) {
    await clearVacancysCache();
    return await vacancysRepositoryDataBase.updateVacancy(id, data);
}

export async function getVacancysFromRedisAdmin() {
    return await vacancysRepositoryRedis.getVacancysFromRedisAdmin()
}

export async function getNumberTotalVacancys() {
    return await vacancysRepositoryDataBase.getCountVacancies();
}

export async function getNumberTotalCompaniesByVacancys() {
    return await vacancysRepositoryDataBase.getCountCompaniesByVacancies();
}
