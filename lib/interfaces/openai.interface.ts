export interface SkillsAndExperienceComparisonResponse {
    missing: string[];
    strong: string[];
    matchPercentage: number;
}

export interface ResultCreateStudy {
    title: string;
    study: Studys[]
}

export interface Studys {
    title: string,
    details: string,
}