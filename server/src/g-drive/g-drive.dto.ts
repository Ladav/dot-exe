import { PartialType } from '@nestjs/mapped-types';
import { IsString, MinLength } from 'class-validator';

export class CreateFileDto {
  @IsString()
  @MinLength(1)
  title: string;

  @IsString()
  content: string;
}

export class UpdateFileDto extends PartialType(CreateFileDto) {
  @IsString()
  @MinLength(1)
  fileId: string;
}
