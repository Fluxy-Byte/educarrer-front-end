// GET
export interface ExperienceDTO {
  id: string;
  name: string;
  seniority: string;
  about: string;
  startDate?: Date | null;
  endDate?: Date | null;
  userId: string;
}

// POST
export interface CreateExperienceDTO {
  name: string;
  seniority: string;
  about: string;
  startDate?: Date;
  endDate?: Date;
  userId: string;
}

// PUT
export interface UpdateExperienceDTO {
  name?: string;
  seniority?: string;
  about?: string;
  startDate?: Date;
  endDate?: Date;
}