import { VacancyRepository } from "@/lib/repositories/vacancy";

const vacancysRepository = new VacancyRepository();

export async function getVacancys() {
    const res = await vacancysRepository.getVacancys();
    console.log(res);
    return res;
}  