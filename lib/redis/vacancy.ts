import { redis } from "@/lib/redis/redis";
import { Vacancy } from "@/lib/entities/vacancy";
import { VacancyRepository } from "@/lib/repositories/vacancy";
import { getSkillByUserId } from "@/lib/services/skill";
import { getExperienceByUserId } from "@/lib/services/experience";
import { VacancyDTO } from "@/lib/interfaces/vacancy.interface";


interface UsersVacancysCache {
    userId: string,
    vacancys: VacancyDTO[]
}

export class getVacancysFromRedis {

    async getVacancysFromRedis(userId: string): Promise<Vacancy[]> {
        try {
            const cacheKey = `vacancys:${userId}`;
            const cachedVacancysUser = await redis.get(cacheKey) ?? null;

            if (cachedVacancysUser) {
                const vacancys: VacancyDTO[] = JSON.parse(cachedVacancysUser);

                console.log("Vacancies fetched from Redis cache.");

                if (vacancys) {
                    return vacancys.map((vacancy: VacancyDTO) => new Vacancy(
                        vacancy.id,
                        vacancy.title,
                        vacancy.description,
                        vacancy.company ?? null,
                        vacancy.modality ?? null,
                        vacancy.level ?? null,
                        vacancy.technologies,
                        vacancy.link ?? null,
                        vacancy.origin ?? null,
                        vacancy.location ?? null,
                        vacancy.salary ?? null,
                        vacancy.createdAt,
                        vacancy.updatedAt,
                        vacancy.active,
                        vacancy.matches,
                        vacancy.score
                    ));
                }
            }

            const classVacancy = new VacancyRepository();
            const vacancys = await classVacancy.getVacancys();

            const skills = await getSkillByUserId(userId);

            if (skills.length == 0) {
                return [];
            }

            const namesSkills = skills.map((s) => s.name);

            const vacancysRanked = vacancys
                .map((vacancy) => {
                    const matches = vacancy.technologies.filter((tech) =>
                        namesSkills.includes(tech)
                    ).length;

                    const score = matches / vacancy.technologies.length;

                    return new Vacancy(
                        vacancy.id,
                        vacancy.title,
                        vacancy.description,
                        vacancy.company,
                        vacancy.modality,
                        vacancy.level,
                        vacancy.technologies,
                        vacancy.link,
                        vacancy.origin,
                        vacancy.location,
                        vacancy.salary,
                        vacancy.createdAt,
                        vacancy.updatedAt,
                        vacancy.active,
                        matches,
                        score
                    )
                })
                .filter((item) => item.score ? item.score >= 0.4 : 0.0) // mínimo de 40%
                .sort((a, b) => {
                    const scoreA = a.score ?? 0;
                    const scoreB = b.score ?? 0;
                    return scoreB - scoreA;
                });

            await redis.set(
                cacheKey,
                JSON.stringify(vacancys),
                "EX", 3600
            ); // Cache por 1 hora

            console.log("Vacancies fetched from database and cached.");

            return vacancysRanked.map((vacancy: VacancyDTO) => new Vacancy(
                vacancy.id,
                vacancy.title,
                vacancy.description,
                vacancy.company ?? null,
                vacancy.modality ?? null,
                vacancy.level ?? null,
                vacancy.technologies,
                vacancy.link ?? null,
                vacancy.origin ?? null,
                vacancy.location ?? null,
                vacancy.salary ?? null,
                vacancy.createdAt,
                vacancy.updatedAt,
                vacancy.active,
                vacancy.matches,
                vacancy.score
            ));

        } catch (e: any) {
            console.error("Error fetching vacancies from Redis:", e);
            return [];
        }
    }

    async getVacancysFromRedisAdmin(): Promise<Vacancy[]> {
        try {
            const cacheKey = "vacancysadmin:list";
            const cachedVacancys = await redis.get(cacheKey) ?? null;

            if (cachedVacancys) {

                const vacancysData = JSON.parse(cachedVacancys);
                console.log("Vacancies fetched from Redis cache.");
                return vacancysData.map((v1: any) => new Vacancy(
                    v1.id,
                    v1.title,
                    v1.description,
                    v1.company,
                    v1.modality,
                    v1.level,
                    v1.technologies,
                    v1.link,
                    v1.origin,
                    v1.location,
                    v1.salary,
                    v1.createdAt,
                    v1.updatedAt,
                    v1.active,
                    null,
                    null
                ));
            }

            const getVacancysClass = new VacancyRepository();
            const vacancys = await getVacancysClass.getVacancys();

            await redis.set(
                cacheKey,
                JSON.stringify(vacancys),
                "EX", 3600
            ); // Cache por 1 hora

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
                v2.active,
                null,
                null
            ));

        } catch (e: any) {
            console.error("Error fetching vacancies from Redis:", e);
            return [];
        }
    }

    async getVacancysByIdFromRedis(userId: string, id: string): Promise<Vacancy | null> {
        try {

            const cacheKey = `vacancys:${id}`;
            const cachedVacancys = await redis.get(cacheKey);

            if (cachedVacancys) {
                const vacancys: VacancyDTO[] = JSON.parse(cachedVacancys);

                if (vacancys) {
                    const vacancyFindFirst = vacancys.find((vacancy: VacancyDTO) => vacancy.id == id);

                    if (vacancyFindFirst) {
                        return new Vacancy(
                            vacancyFindFirst.id,
                            vacancyFindFirst.title,
                            vacancyFindFirst.description,
                            vacancyFindFirst.company ?? null,
                            vacancyFindFirst.modality ?? null,
                            vacancyFindFirst.level ?? null,
                            vacancyFindFirst.technologies,
                            vacancyFindFirst.link ?? null,
                            vacancyFindFirst.origin ?? null,
                            vacancyFindFirst.location ?? null,
                            vacancyFindFirst.salary ?? null,
                            vacancyFindFirst.createdAt,
                            vacancyFindFirst.updatedAt,
                            vacancyFindFirst.active,
                            vacancyFindFirst.matches ?? null,
                            vacancyFindFirst.score ?? null
                        );
                    }
                }
            }

            return null;
        } catch (e: any) {
            console.error("Error fetching vacancy by ID from Redis:", e);
            return null;
        }
    }


    async getVacancysByIdFromDataBase(id: string): Promise<Vacancy | null> {
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