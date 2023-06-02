class FindOptions {
  page: number;
  limit: number;
  orderBy: OrderBy = OrderBy.DESC;
}

enum OrderBy {
  ASC = 'asc',
  DESC = 'desc',
}

interface IPaginationMeta {
  page: number;
  limit: number;
  totalPages: number;
  count: number;
}

export type { IPaginationMeta };
export { OrderBy, FindOptions };
