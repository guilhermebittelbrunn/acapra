import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

import { GenericId, RawID, ServerResponseMetaPagination, UpdateFields } from '@/shared/types/common';

export type SingleEntityResponse<T> = Promise<T | null> | T | null;

export type MultiEntityResponse<T> = Promise<T[]> | T[];

export interface PaginatedResult<T> {
  data: T[];
  meta: ServerResponseMetaPagination;
}
export interface GenericDateRangeQuery {
  start: Date;
  end: Date;
}

export class PaginationQuery {
  @ApiPropertyOptional()
  @IsOptional()
  page?: number;

  @ApiPropertyOptional()
  @IsOptional()
  limit?: number;

  @ApiPropertyOptional()
  @IsOptional()
  term?: string;
}

export class GenericPaginationFilterQuery extends PaginationQuery {
  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  startDate?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  endDate?: Date;
}

export interface GenericDateQuery {
  days?: Array<Date>;
  months?: Array<number>;
  range?: GenericDateRangeQuery;
}

export interface IBaseRepository<Domain> {
  findById(id: GenericId): SingleEntityResponse<Domain>;
  findByIds(ids: GenericId[]): MultiEntityResponse<Domain>;
  findAll(): MultiEntityResponse<Domain>;
  findByIdentifier(identifier: Partial<Record<keyof Domain, any>>): SingleEntityResponse<Domain>;
  createBulk(data: Domain[]): MultiEntityResponse<Domain>;
  create(data: Domain): SingleEntityResponse<Domain>;
  update(data: UpdateFields<Domain>): Promise<RawID>;
  updateBulk(data: UpdateFields<Domain>[]): Promise<RawID[]>;
  delete(id: GenericId): Promise<boolean>;
  deleteBulk(ids: GenericId[]): Promise<boolean>;
  getPaginationParams(query: PaginationQuery): { page: number; limit: number; skip: number };
  buildPaginationMeta(total: number, page: number, limit: number): ServerResponseMetaPagination;
}
