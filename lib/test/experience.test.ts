import { getExperienceByUserId } from "@/lib/services/experience";
import { ExperienceDTO } from "@/lib/interfaces/experience.interface";

import { getUserByEmail } from "@/lib/services/user";
import { UserDTO } from "@/lib/interfaces/user.interface";

describe("getExperienceByUserId", () => {

    it("deve retornar uma lista de experiências do usuário", async () => {

        const result: UserDTO = await getUserByEmail("gabriel@teste.com");

        expect(result).toBeDefined();

        expect(result).toHaveProperty("id");
        expect(result).toHaveProperty("email");

        expect(result.email).toBe("gabriel@teste.com");

        const experienceResult: ExperienceDTO[] = await getExperienceByUserId(result.id);

        expect(Array.isArray(experienceResult)).toBe(true);

        experienceResult.forEach((experience) => {
            expect(experience).toHaveProperty("id");
            expect(experience).toHaveProperty("company");
            expect(experience).toHaveProperty("position");
        });
    });

});