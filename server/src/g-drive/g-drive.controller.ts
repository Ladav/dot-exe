import { drive_v3 } from 'googleapis';
import { Body, Controller, Delete, Get, Param, Patch, Put } from '@nestjs/common';
import { GetGDriveClient } from 'src/common/decorators/get-gdrive-client.decorator';
import { GDriveService } from './g-drive.service';
import { CreateFileDto, UpdateFileDto } from './g-drive.dto';

@Controller('g-drive')
export class GDriveController {
  constructor(private readonly gDriveService: GDriveService) {}

  @Get('get-list')
  getList(@GetGDriveClient() drive: drive_v3.Drive) {
    return this.gDriveService.getFileList(drive);
  }

  @Put('create-root-folder')
  createDotExeFolder(@GetGDriveClient() drive: drive_v3.Drive) {
    return this.gDriveService.createDotExeFolder(drive);
  }

  @Put('file/create')
  createFile(@GetGDriveClient() drive: drive_v3.Drive, @Body() createFileDto: CreateFileDto) {
    return this.gDriveService.createFile(drive, createFileDto);
  }

  @Patch('file/update')
  updateFile(@GetGDriveClient() drive: drive_v3.Drive, @Body() updateFileDto: UpdateFileDto) {
    return this.gDriveService.updateFile(drive, updateFileDto);
  }

  @Delete('file/delete/:fileId')
  deleteFileById(@GetGDriveClient() drive: drive_v3.Drive, @Param('fileId') fileId: string) {
    return this.gDriveService.deleteFile(drive, fileId);
  }

  @Get('file/read/:fileId')
  readFileById(@GetGDriveClient() drive: drive_v3.Drive, @Param('fileId') fileId: string) {
    return this.gDriveService.readFile(drive, fileId);
  }
}
