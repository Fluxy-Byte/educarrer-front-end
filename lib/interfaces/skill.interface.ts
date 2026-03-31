// GET
export interface SkillDTO {
  id: string;
  name: string;
  level: number;
  about?: string | null;
  userId: string;
}

// POST
export interface CreateSkillDTO {
  name: string;
  level?: number;
  about?: string;
  userId: string;
}

// PUT
export interface UpdateSkillDTO {
  name?: string;
  level?: number;
  about?: string;
}