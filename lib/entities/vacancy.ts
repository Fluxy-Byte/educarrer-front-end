export class Vacancy {
    constructor(
        public id: string,
        public title: string,
        public description: string | null,
        public company: string | null,
        public modality: string | null,
        public level: string | null,
        public technologies: string[],
        public link: string | null,
        public origin: string | null,
        public location: string | null,
        public salary: string | null,
        public createdAt: Date,
        public updatedAt: Date,
        public active: boolean,
        public matches: number | null,
        public score: number | null
    ) { }
}