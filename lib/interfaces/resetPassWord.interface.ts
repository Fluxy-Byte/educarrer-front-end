// GET
export interface ResetPassWordDTO {
  id: string;
  completed: boolean;
  userId: string;
  tokenToReset: string;
  createdAt: Date;
  updatedAt?: Date | null;
}

// POST
export interface CreateResetPassWordDTO {
  userId: string;
  tokenToReset: string;
}

// PUT
export interface UpdateResetPassWordDTO {
  completed: boolean;
}
