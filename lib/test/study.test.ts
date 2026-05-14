import { getStudyByUserId } from "@/lib/services/study";
import { StudyDTO } from "@/lib/interfaces/study.interface";

import { getUserByEmail } from "@/lib/services/user";
import { UserDTO } from "@/lib/interfaces/user.interface";

describe("getStudyByUserId", () => {

  it("deve retornar uma lista de estudos do usuário", async () => {

    const result: UserDTO = await getUserByEmail("gabriel@teste.com");

    expect(result).toBeDefined();

    expect(result).toHaveProperty("id");
    expect(result).toHaveProperty("email");

    expect(result.email).toBe("gabriel@teste.com");

    const studyResult: StudyDTO[] = await getStudyByUserId(result.id);

    expect(Array.isArray(studyResult)).toBe(true);

    studyResult.forEach((study) => {
      expect(study).toHaveProperty("id");
      expect(study).toHaveProperty("title");
      expect(study).toHaveProperty("study");
    });

  });

});