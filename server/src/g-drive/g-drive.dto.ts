import { PickType } from '@nestjs/mapped-types';
import { IsString, MaxLength, MinLength } from 'class-validator';

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
