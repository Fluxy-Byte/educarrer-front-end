export class Skill {
  constructor(
    public id: string,
    public name: string,
    public level: number,
    public about: string | null,
    public updatedAt: Date | null,
    public userId: string
  ) { }

  levelFormatted(): string {
    if (this.level >= 8) return "Avançado";
    if (this.level >= 5) return "Intermediário";

    return "Iniciante";
  }
}