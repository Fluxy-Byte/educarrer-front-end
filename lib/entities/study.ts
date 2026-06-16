export class Study {
  constructor(
    public id: string,
    public title: string,
    public study: StudyItemClass[],
    public createdAt: Date | null,
    public updatedAt: Date | null,
    public userId: string
  ) { }
}

export class StudyItemClass {
  constructor(
    public id: string,
    public title: string,
    public details: string,
    public studyId: string
  ){}
}
