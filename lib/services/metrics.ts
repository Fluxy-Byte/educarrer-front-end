import { Metrics, Company, MetricsAdmin } from "@/lib/entities/metrics";
import { getAvaliations } from "@/lib/services/avaliations";
import { getAvaliationVacancy } from "@/lib/services/avaliationsVacancys";
import { getNumberTotalStudies } from "@/lib/services/study";
import { getNumberTotalUsers } from "@/lib/services/user";
import { getNumberTotalVacancys, getNumberTotalCompaniesByVacancys, getVacancysFromRedisAdmin } from "@/lib/services/vacancy";
import { VacancyDTO } from "@/lib/interfaces/vacancy.interface";
import { AvaliationDTO } from "@/lib/interfaces/avaliation.interface";
import { AvaliationVacancyDTO } from "@/lib/interfaces/avaliationVacancy.interface";

export async function getMetrics(): Promise<Metrics> {
    try {
        const allVacancys = await getVacancysFromRedisAdmin();
        const companiesTopTree = await getBussinesWithMoreVacancys(allVacancys);
        const totalVacancys = await getNumberTotalVacancys();
        const totalBussines = await getNumberTotalCompaniesByVacancys();
        const totalStudies = await getNumberTotalStudies();
        const avaliations = await getAvaliations();
        const metricsAvaliantions = await calculaterPorcentSatisfationOfUsers(avaliations);

        return new Metrics(
            totalVacancys,
            totalBussines,
            totalStudies,
            metricsAvaliantions.accuracy,
            companiesTopTree
        );
    } catch (e: any) {
        return new Metrics(
            0,
            0,
            0,
            0,
            []
        )
    }
}

export async function getMetricsAdmin(): Promise<MetricsAdmin> {
    try {
        const totalUsers = await getNumberTotalUsers();
        const totalBussines = await getNumberTotalCompaniesByVacancys();
        const avaliations = await getAvaliations();
        const metricsAvaliantions = await calculaterPorcentSatisfationOfUsers(avaliations);
        const avaliationsVacancys = await getAvaliationVacancy();
        const metricsAvaliantionsOfTheRecomends = await calculaterPorcentSatisfationOfRecomendsOfTheUsers(avaliationsVacancys);

        return new MetricsAdmin(
            totalUsers,
            totalBussines,
            metricsAvaliantionsOfTheRecomends.accuracy,
            metricsAvaliantionsOfTheRecomends.count,
            metricsAvaliantionsOfTheRecomends.satisfiedCount,
            metricsAvaliantionsOfTheRecomends.unsatisfiedCount,
            metricsAvaliantions.accuracy,
            metricsAvaliantions.count,
            metricsAvaliantions.satisfiedCount,
            metricsAvaliantions.unsatisfiedCount
        )
    } catch (e: any) {
        return new MetricsAdmin(
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0
        )
    }
}


async function getBussinesWithMoreVacancys(
    vacancies: VacancyDTO[]
): Promise<Company[]> {

    const companiesMap = new Map<string, number>();

    for (const vacancy of vacancies) {
        if (!vacancy.company) continue;

        companiesMap.set(
            vacancy.company,
            (companiesMap.get(vacancy.company) || 0) + 1
        );
    }

    return Array.from(companiesMap.entries())
        .map(([company, countVacancies]) => ({
            company,
            countVacancies,
        }))
        .sort((a, b) => b.countVacancies - a.countVacancies)
        .slice(0, 3)
        .map((c) => new Company(c.company, c.countVacancies))
}

async function calculaterPorcentSatisfationOfUsers(avaliations: AvaliationDTO[]) {

    if (avaliations.length == 0) {
        return {
            accuracy: 0,
            count: 0,
            satisfiedCount: 0,
            unsatisfiedCount: 0
        };
    }

    const totalPositive = avaliations.filter((v) => v.satisfied == true).length;
    const totalNegative = avaliations.filter((v) => v.satisfied == false).length;
    const calcule = (totalPositive / avaliations.length) * 100;

    return {
        accuracy: Number(calcule.toFixed(2)),
        count: avaliations.length,
        satisfiedCount: totalPositive,
        unsatisfiedCount: totalNegative
    };
}

async function calculaterPorcentSatisfationOfRecomendsOfTheUsers(avaliations: AvaliationVacancyDTO[]) {

    if (avaliations.length == 0) {
        return {
            accuracy: 0,
            count: 0,
            satisfiedCount: 0,
            unsatisfiedCount: 0
        };
    }

    const totalPositive = avaliations.filter((v) => v.satisfied == true).length;
    const totalNegative = avaliations.filter((v) => v.satisfied == false).length;
    const calcule = (totalPositive / avaliations.length) * 100;
    return {
        accuracy: Number(calcule.toFixed(2)),
        count: avaliations.length,
        satisfiedCount: totalPositive,
        unsatisfiedCount: totalNegative
    };
}