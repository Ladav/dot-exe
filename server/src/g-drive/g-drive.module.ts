import { Module } from '@nestjs/common';
import { GDriveService } from './g-drive.service';
import { GDriveController } from './g-drive.controller';

@Module({
  controllers: [GDriveController],
  providers: [GDriveService],
})
export class GDriveModule {}
