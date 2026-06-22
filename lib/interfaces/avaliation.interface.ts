
export interface AvaliationDTO {
    id: string;
    satisfied: boolean;
    comment: string | null;
    studyId: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
}