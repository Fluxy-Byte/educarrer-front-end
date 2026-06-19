import { redis } from "@/lib/redis/redis";
import { Vacancy } from "@/lib/entities/vacancy";
import { VacancyRepository } from "@/lib/repositories/vacancy";
import { HundleStudyWithOpenAi } from "@/lib/services/hundleStudyWithOpenAi";
import { SkillDTO } from "@/lib/interfaces/skill.interface";
import { SkillRepository } from "@/lib/repositories/skill";
import { Skill } from "@/lib/entities/skill";

interface UsersSkillsCache {
    userId: string,
    skills: SkillDTO[]
}

export class SkillsRedis {

    async getSkillsFromRedis(userId: string): Promise<SkillDTO[]> {
        try {
            const cacheKey = `skill:${userId}`;
            const cachedSkills = await redis.get(cacheKey) ?? null;

            if (cachedSkills) {
                const skills: SkillDTO[] = JSON.parse(cachedSkills);

                if (skills) {

                    return skills.map((skill: SkillDTO) => new Skill(
                        skill.id,
                        skill.name,
                        skill.level,
                        skill.about ?? null,
                        skill.updatedAt ?? null,
                        userId
                    ));

                }
            }

            const classSkills = new SkillRepository();
            const skillsByUser = await classSkills.getSkillByUserId(userId);

            await redis.set(
                cacheKey,
                JSON.stringify(skillsByUser),
                "EX", 3600
            ); // Cache por 1 hora


            return skillsByUser.map((skill: SkillDTO) => new Skill(
                skill.id,
                skill.name,
                skill.level,
                skill.about ?? null,
                skill.updatedAt ?? null,
                userId
            ));

        } catch (e: any) {
            console.error("Error fetching skills from Redis:", e);
            return [];
        }
    }


    async getSkillByUserIdAndIdFromRedis(userId: string, id: string): Promise<SkillDTO | null> {
        try {
            const cacheKey = `skill:${userId}`;
            const cachedSkills = await redis.get(cacheKey) ?? null;

            if (cachedSkills) {
                const skills: SkillDTO[] = JSON.parse(cachedSkills);
                
                if (skills) {

                    const resSkillSearchByid = skills.find((skill: SkillDTO) => {
                        skill.id == id;
                    })

                    if (!resSkillSearchByid) return null;

                    return new Skill(
                        resSkillSearchByid.id,
                        resSkillSearchByid.name,
                        resSkillSearchByid.level,
                        resSkillSearchByid.about ?? null,
                        resSkillSearchByid.updatedAt ?? null,
                        userId
                    );

                }
            }

            const classSkills = new SkillRepository();
            const skillsByUser = await classSkills.getSkillByUserId(userId);

            await redis.set(
                cacheKey,
                JSON.stringify(skillsByUser),
                "EX", 3600
            ); // Cache por 1 hora

            const resSkillSearchByid = skillsByUser.find((skill: SkillDTO) => {
                skill.id == id;
            })

            if (!resSkillSearchByid) return null;

            return new Skill(
                resSkillSearchByid.id,
                resSkillSearchByid.name,
                resSkillSearchByid.level,
                resSkillSearchByid.about ?? null,
                resSkillSearchByid.updatedAt ?? null,
                userId
            );

        } catch (e: any) {
            console.error("Error fetching skills from Redis:", e);
            return null;
        }
    }
}