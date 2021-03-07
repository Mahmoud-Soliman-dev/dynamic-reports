export class Filter {
  constructor(
    public id: number,
    public label: string,
    public placeHolder: string,
    public bindingName: string,
    public type: string,
    public isMultiple?: boolean
  ){}
}
