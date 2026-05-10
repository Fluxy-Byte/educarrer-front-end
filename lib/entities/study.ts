export class Study {
  constructor(
    public id: string,
    public title: string,
    public study: string,
    public createdAt: Date | null,
    public updatedAt: Date | null,
    public userId: string
  ) {}
}