export class FindOptions {
  page: number;
  limit: number;
  orderBy: OrderBy = OrderBy.ASC;
}

export enum OrderBy {
  ASC = 'asc',
  DESC = 'desc',
}

export interface IPaginationMeta {
  page: number;
  limit: number;
  totalPages: number;
  count: number;
}
