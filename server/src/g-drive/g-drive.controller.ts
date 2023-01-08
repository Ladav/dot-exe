import { drive_v3 } from 'googleapis';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { GetGDriveClient } from 'src/common/decorators/get-gdrive-client.decorator';
import { GDriveService } from './g-drive.service';
import { CreateFileDto, FilterFilesDto, RenameFileDto, UpdateFileDto } from './g-drive.dto';

@Controller('g-drive')
export class GDriveController {
  constructor(private readonly gDriveService: GDriveService) {}

  @Get('file/all')
  getList(@GetGDriveClient() drive: drive_v3.Drive, @Query() filterFilesDto: FilterFilesDto) {
    return this.gDriveService.getFileList(drive, filterFilesDto);
  }

  @Get('file/read/:fileId')
  readFileById(@GetGDriveClient() drive: drive_v3.Drive, @Param('fileId') fileId: string) {
    return this.gDriveService.readFile(drive, fileId);
  }

  @Post('file/create')
  createFile(@GetGDriveClient() drive: drive_v3.Drive, @Body() createFileDto: CreateFileDto) {
    return this.gDriveService.createFile(drive, createFileDto);
  }

  @Patch('file/update')
  updateFile(@GetGDriveClient() drive: drive_v3.Drive, @Body() updateFileDto: UpdateFileDto) {
    return this.gDriveService.updateFile(drive, updateFileDto);
  }

  @Patch('file/rename')
  renameFile(@GetGDriveClient() drive: drive_v3.Drive, @Body() renameFileDto: RenameFileDto) {
    return this.gDriveService.renameFile(drive, renameFileDto);
  }

  @Delete('file/delete/:fileId')
  deleteFileById(@GetGDriveClient() drive: drive_v3.Drive, @Param('fileId') fileId: string) {
    return this.gDriveService.deleteFile(drive, fileId);
  }
}
