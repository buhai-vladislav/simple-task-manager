class FindOptions {
  page: number;
  limit: number;
  orderBy: OrderBy = OrderBy.DESC;
}

enum OrderBy {
  ASC = 'asc',
  DESC = 'desc',
}

class PaginationMeta {
  page: number;
  limit: number;
  totalPages: number;
  count: number;
}

export { PaginationMeta, OrderBy, FindOptions };
