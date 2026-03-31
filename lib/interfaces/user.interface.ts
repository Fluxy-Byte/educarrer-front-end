// GET
export interface UserDTO {
  id: string;
  name?: string | null;
  email: string;
  emailVerified: boolean;
  image?: string | null;
  createdAt: Date;
  updatedAt: Date;
  role: string;
  banned: boolean;
  banReason?: string | null;
  banExpires?: Date | null;
}

// POST
export interface CreateUserDTO {
  name?: string;
  email: string;
  image?: string;
  role?: string;
}

// PUT
export interface UpdateUserDTO {
  name?: string;
  email?: string;
  image?: string;
}