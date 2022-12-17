import { SortOrder } from '../common/enums/sort-order.enum';
import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsString, MinLength } from 'class-validator';

export class CreatePageDto {
  @IsString()
  @MinLength(1)
  title: string;

  @IsString()
  content: string;
}

export class UpdatePageDto extends PartialType(CreatePageDto) {}

export class FilterPageDto {
  @IsEnum(SortOrder, { message: `Sort order must be one of the following ${Object.keys(SortOrder).join(', ')}` })
  sortOrder: SortOrder;
}
