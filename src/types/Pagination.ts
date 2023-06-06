import { ApiProperty } from '@nestjs/swagger';

enum OrderBy {
  ASC = 'asc',
  DESC = 'desc',
}

class FindOptions {
  @ApiProperty({
    default: 1,
  })
  page: number;

  @ApiProperty({
    default: 10,
  })
  limit: number;

  @ApiProperty({
    default: OrderBy.DESC,
  })
  orderBy: OrderBy = OrderBy.DESC;
}

class PaginationMeta {
  @ApiProperty()
  page: number;

  @ApiProperty()
  limit: number;

  @ApiProperty()
  totalPages: number;

  @ApiProperty()
  count: number;
}

export { PaginationMeta, OrderBy, FindOptions };
