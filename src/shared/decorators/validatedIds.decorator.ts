import { applyDecorators } from '@nestjs/common';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsOptional, IsString } from 'class-validator';

export function ValidatedIds() {
  return applyDecorators(
    ApiPropertyOptional({ type: [String] }),
    IsOptional(),
    IsArray(),
    IsString({ each: true }),
    Transform(({ value }) => {
      if (!value) return undefined;
      return Array.isArray(value) ? value : String(value).split(',');
    }),
  );
}
