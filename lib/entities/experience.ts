
export class Experience {
  constructor(
    public id: string,
    public name: string,
    public seniority: string,
    public about: string,
    public startDate: Date | null,
    public endDate: Date | null,
    public currentJob: boolean,
    public updatedAt: Date | null,
    public userId: string
  ) {}

  isCurrentJob(): boolean {
    return !this.endDate;
  }
}