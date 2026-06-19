import { redis } from "@/lib/redis/redis";
import { ExperienceDTO } from "@/lib/interfaces/experience.interface";
import { ExperienceRepository } from "@/lib/repositories/experience";
import { Experience } from "@/lib/entities/experience";

interface UsersExperiencesCache {
    userId: string,
    experiences: ExperienceDTO[]
}

export class ExperienceRedis {

    async getExperiencesFromRedis(userId: string): Promise<ExperienceDTO[]> {
        try {
            const cacheKey = `experience:${userId}`;
            const cachedExperiences = await redis.get(cacheKey) ?? null;

            if (cachedExperiences) {
                const experiences: ExperienceDTO[] = JSON.parse(cachedExperiences);

                if (experiences) {

                    return experiences.map((experience: ExperienceDTO) => new Experience(
                        experience.id,
                        experience.name,
                        experience.seniority,
                        experience.about,
                        experience.startDate ?? null,
                        experience.endDate ?? null,
                        experience.currentJob,
                        experience.updatedAt ?? null,
                        userId
                    ));
                }
            }

            const classExperience = new ExperienceRepository();
            const experiencesByUser = await classExperience.getExperienceByUserId(userId);

            await redis.set(
                cacheKey,
                JSON.stringify(experiencesByUser),
                "EX", 3600
            ); // Cache por 1 hora

            return experiencesByUser.map((experience: ExperienceDTO) => new Experience(
                experience.id,
                experience.name,
                experience.seniority,
                experience.about,
                experience.startDate ?? null,
                experience.endDate ?? null,
                experience.currentJob,
                experience.updatedAt ?? null,
                userId
            ));

        } catch (e: any) {
            console.error("Error fetching experieces from Redis:", e);
            return [];
        }
    }


    async getExperienceByUserIdAndIdFromRedis(userId: string, id: string): Promise<ExperienceDTO | null> {
        try {
            const cacheKey = "experience:list";
            const cachedExperiences = await redis.get(cacheKey) ?? null;

            if (cachedExperiences) {
                const experiences: ExperienceDTO[] = JSON.parse(cachedExperiences);

                if (experiences) {

                    const resExperienceSearchByid = experiences.find((experience: ExperienceDTO) => {
                        experience.id == id;
                    })

                    if (!resExperienceSearchByid) return null;

                    return new Experience(
                        resExperienceSearchByid.id,
                        resExperienceSearchByid.name,
                        resExperienceSearchByid.seniority,
                        resExperienceSearchByid.about,
                        resExperienceSearchByid.startDate ?? null,
                        resExperienceSearchByid.endDate ?? null,
                        resExperienceSearchByid.currentJob,
                        resExperienceSearchByid.updatedAt ?? null,
                        userId
                    );

                }
            }

            const classExperience = new ExperienceRepository();
            const experiencesByUser = await classExperience.getExperienceByUserId(userId);

            await redis.set(
                cacheKey,
                JSON.stringify(experiencesByUser),
                "EX", 3600
            ); // Cache por 1 hora

            const resExperienceSearchByid = experiencesByUser.find((experiences: ExperienceDTO) => {
                experiences.id == id;
            })

            if (!resExperienceSearchByid) return null;

            return new Experience(
                resExperienceSearchByid.id,
                resExperienceSearchByid.name,
                resExperienceSearchByid.seniority,
                resExperienceSearchByid.about,
                resExperienceSearchByid.startDate ?? null,
                resExperienceSearchByid.endDate ?? null,
                resExperienceSearchByid.currentJob,
                resExperienceSearchByid.updatedAt ?? null,
                userId
            );

        } catch (e: any) {
            console.error("Error fetching experieces from Redis:", e);
            return null;
        }
    }
}