export interface VacancyDTO {
    id: number;
    title: string;
    description: string;
    company: string;
    modality: string;
    level: string;
    technologies: string[];
    link: string;
    origin: string;
    location: string;
    salary: string | null;
    createdAt: Date;
    updatedAt: Date;
}