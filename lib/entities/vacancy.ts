export class Vacancy {
    constructor(
        public id: number,
        public title: string,
        public description: string,
        public company: string,
        public modality: string,
        public level: string,
        public technologies: string[],
        public link: string,
        public origin: string,
        public location: string,
        public salary: string | null,
        public createdAt: Date,
        public updatedAt: Date
    ) {}
}