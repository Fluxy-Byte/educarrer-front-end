
export interface AvaliationVacancyDTO {
    id: string;
    satisfied: boolean;
    comment: string | null;
    createdAt: Date;
    userId: string;
}