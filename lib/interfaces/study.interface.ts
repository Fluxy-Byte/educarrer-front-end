// GET
export interface StudyDTO {
  id: string;
  title: string;
  study: StudyItem[];
  createdAt?: Date | null;
  updatedAt?: Date | null;
  userId: string;
}

// POST
export interface CreateStudyDTO {
  title: string;
  userId: string;
}

export interface StudyItemCreate {
  title: string,
  details: string,
  studyId: string
}

// PUT
export interface UpdateStudyDTO {
  title?: string;
  study?: StudyItem[];
  createdAt?: Date | null;
  updatedAt?: Date | null;
}


export interface StudyItem {
  id: string,
  title: string,
  details: string,
  studyId: string
}