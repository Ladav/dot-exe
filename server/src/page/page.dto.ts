import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';

export class CreatePageDto {
  @IsString()
  title: string;

  @IsString()
  content: string;
}

export class UpdatePageDto extends PartialType(CreatePageDto) {}
