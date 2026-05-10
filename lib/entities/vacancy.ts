export class Vacancy {
    constructor(
        public id: string,
        public title: string,
        public description: string,
        public company: string,
        public location: string,
        public salary: number | null,
        public createdAt: Date,
        public updatedAt: Date
    ){}

    
}