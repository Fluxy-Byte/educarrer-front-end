import { getVacancys } from "@/lib/services/vacancy";
import { VacancyDTO } from "@/lib/interfaces/vacancy.interface";

describe("getVacancys", () => {

  it("deve retornar uma lista de VacancyDTO", async () => {

    const result: VacancyDTO[] = await getVacancys();

    expect(Array.isArray(result)).toBe(true);

    result.forEach((vacancy) => {
      expect(vacancy).toHaveProperty("id");
      expect(vacancy).toHaveProperty("title");
      expect(vacancy).toHaveProperty("description");
    });

  });
});