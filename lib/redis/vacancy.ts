// import { redis } from "@/lib/redis/redis";
import { Vacancy } from "@/lib/entities/vacancy";
import { VacancyRepository } from "@/lib/repositories/vacancy";

export class getVacancysFromRedis {

    async getVacancysFromRedis(): Promise<Vacancy[]> {
        try {
            // const cacheKey = "vacancys:list";
            // const cachedVacancys = await redis.get(cacheKey) ?? null;

            // if (cachedVacancys) {
            //     const vacancysData = JSON.parse(cachedVacancys);
            //     console.log("Vacancies fetched from Redis cache.");
            //     return vacancysData.map((v1: any) => new Vacancy(
            //         v1.id,
            //         v1.title,
            //         v1.description,
            //         v1.company,
            //         v1.modality,
            //         v1.level,
            //         v1.technologies,
            //         v1.link,
            //         v1.origin,
            //         v1.location,
            //         v1.salary,
            //         v1.createdAt,
            //         v1.updatedAt
            //     ));
            // }

            const getVacancysClass = new VacancyRepository();
            const vacancys = await getVacancysClass.getVacancys();

            // await redis.set(
            //     cacheKey,
            //     JSON.stringify(vacancys),
            //     "EX", 3600
            // ); // Cache por 1 hora

            console.log("Vacancies fetched from database and cached.");

            return vacancys.map((v2: any) => new Vacancy(
                v2.id,
                v2.title,
                v2.description,
                v2.company,
                v2.modality,
                v2.level,
                v2.technologies,
                v2.link,
                v2.origin,
                v2.location,
                v2.salary,
                v2.createdAt,
                v2.updatedAt,
                v2.active
            ));

        } catch (e: any) {
            console.error("Error fetching vacancies from Redis:", e);
            return [];
        }
    }

    // async getVacancysByIdFromRedis(id: number): Promise<Vacancy | null> {
    //     try {

    //         const cacheKey = "vacancys:list";
    //         const cachedVacancys = await redis.get(cacheKey);

    //         if (cachedVacancys) {
    //             const vacancysData = JSON.parse(cachedVacancys);
    //             return vacancysData.find((v: any) => v.id === id) || null;
    //         }

    //         return null;
    //     } catch (e: any) {
    //         console.error("Error fetching vacancy by ID from Redis:", e);
    //         return null;
    //     }
    // }


    async getVacancysByIdFromDataBase(id: number): Promise<Vacancy | null> {
        try {
            const getVacancysClass = new VacancyRepository();
            const vacancys = await getVacancysClass.getVacancys();
            return vacancys.find((v: any) => v.id === id) || null;
        } catch (e: any) {
            console.error("Error fetching vacancy by ID from database:", e);
            return null;
        }
    }
}