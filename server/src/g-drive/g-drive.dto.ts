import { PickType } from '@nestjs/mapped-types';
import { IsEnum, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { SortOrder } from 'src/common/enums/sort-order.enum';

export class CreateFileDto {
  @IsString()
  @MinLength(1)
  title: string;

  @IsString()
  content: string;
}

export class UpdateFileDto extends PickType(CreateFileDto, ['content'] as const) {
  @IsString()
  @MinLength(1)
  fileId: string;
}

export class RenameFileDto {
  @IsString()
  @MinLength(1)
  fileId: string;

  @IsString()
  @MinLength(1)
  @MaxLength(256)
  name: string;
}

export class FilterFilesDto {
  @IsOptional()
  @IsEnum(SortOrder, { message: `Sort order must be one of the following ${Object.keys(SortOrder).join(', ')}` })
  sortOrder?: SortOrder;
}
