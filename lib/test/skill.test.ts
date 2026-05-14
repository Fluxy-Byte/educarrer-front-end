import { getSkillByUserId } from "@/lib/services/skill";
import { SkillDTO } from "@/lib/interfaces/skill.interface";

import { getUserByEmail } from "@/lib/services/user";
import { UserDTO } from "@/lib/interfaces/user.interface";

describe("getSkillByUserId", () => {

    it("deve retornar uma lista de habilidades do usuário", async () => {

        const result: UserDTO = await getUserByEmail("gabriel@teste.com");

        expect(result).toBeDefined();

        expect(result).toHaveProperty("id");
        expect(result).toHaveProperty("email");

        expect(result.email).toBe("gabriel@teste.com");

        const skillResult: SkillDTO[] = await getSkillByUserId(result.id);

        expect(Array.isArray(skillResult)).toBe(true);

        skillResult.forEach((skill) => {
            expect(skill).toHaveProperty("id");
            expect(skill).toHaveProperty("name");
            expect(skill).toHaveProperty("level");
        });

    });

});