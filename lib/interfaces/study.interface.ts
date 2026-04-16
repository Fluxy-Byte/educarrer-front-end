// GET
export interface StudyDTO {
  id: string;
  title: string;
  study: string;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  userId: string;
}

// POST
export interface CreateStudyDTO {
  title: string;
  study: string;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  userId: string;
}

// PUT
export interface UpdateStudyDTO {
  title?: string;
  study?: string;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}