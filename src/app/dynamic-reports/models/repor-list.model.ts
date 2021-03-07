import { Filter } from "./filter.model";

export class ReportList {
  constructor(
    public id: number,
    public name: string,
    public filters?: Filter[]
  ){}
}
