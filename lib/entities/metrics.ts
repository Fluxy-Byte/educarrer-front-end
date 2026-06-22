
export class Metrics {
    constructor(
        public totalVacancys: number,
        public totalBussines: number,
        public totalStudiesCreateds: number,
        public totalSatisfation: number,
        public bussinesMoreWithVacancys: Company[]
    ) { }
}

export class Company {
    constructor(
        public company: string,
        public countVacancies: number
    ) { }
}

export class MetricsAdmin {
    constructor(
        public totalUsers: number,
        public totalBussines: number,
        public totalSatisfationOfThesRecomendationVancancy: number,
        public countSatisfationOfThesRecomendationVancancy: number,
        public countPositiveOfThesRecomendationVancancy: number,
        public countNegativeOfThesRecomendationVancancy: number,
        public totalSatisfationStudys: number,
        public countSatisfationStudys: number,
        public countPositiveSatisfationStudys: number,
        public countNegativeSatisfationStudys: number,
    ) { }
}