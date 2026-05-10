
export class User {
  constructor(
    public id: string,
    public name: string | null,
    public email: string,
    public emailVerified: boolean,
    public image: string | null,
    public role: string,
    public banned: boolean,
    public createdAt: Date,
    public updatedAt: Date
  ) {}

  isAdmin(): boolean {
    return this.role === "admin";
  }

  isBanned(): boolean {
    return this.banned;
  }
}