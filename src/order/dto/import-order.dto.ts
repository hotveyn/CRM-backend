export class ImportOrderDto {
  name: string;
  date_start: string;
  date_end: string;
  code: string;
  constructor(
    name: string,
    date_start: string,
    date_end: string,
    code: string,
  ) {
    this.name = name;
    this.date_start = date_start;
    this.date_end = date_end;
    this.code = code;
  }
}
