import { drive_v3 } from 'googleapis';
import { Injectable, BadRequestException } from '@nestjs/common';
import { GaxiosError } from 'gaxios';
import { tryit } from 'radash';
import { CreateFileDto, RenameFileDto, UpdateFileDto } from './g-drive.dto';

export const RootFolder = '###DotExe###';

@Injectable()
export class GDriveService {
  private async getRootFolder(drive: drive_v3.Drive) {
    try {
      const response = await drive.files.list({
        q: `mimeType = 'application/vnd.google-apps.folder' and name = '${RootFolder}'`,
        orderBy: 'createdTime',
      });
      const folder = response.data.files?.[0];
      if (!folder) {
        throw new Error("folder doesn't exists");
      }
      return folder;
    } catch (error) {
      console.log(error);
      if (error instanceof GaxiosError) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('failed to fetch root folder');
    }
  }

  async createDotExeFolder(drive: drive_v3.Drive) {
    const [err, found] = await tryit(this.getRootFolder)(drive);
    if (found) {
      throw new BadRequestException('folder already exists');
    }

    const fileMetadata = {
      name: RootFolder,
      mimeType: 'application/vnd.google-apps.folder',
    };

    try {
      const file = await drive.files.create({
        requestBody: fileMetadata,
        fields: 'id',
      });
      return file.data.id;
    } catch (error) {
      if (error instanceof GaxiosError) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('failed to create root folder');
    }
  }

  async createFile(drive: drive_v3.Drive, createFileDto: CreateFileDto) {
    const folder = await this.getRootFolder(drive);

    const params: drive_v3.Params$Resource$Files$Create = {
      fields: 'id, name',
      requestBody: {
        parents: [folder.id],
        mimeType: 'text/plain',
        name: `${createFileDto.title}`,
      },
      media: {
        mimeType: 'text/plain',
        body: createFileDto.content,
      },
    };

    try {
      const response = await drive.files.create(params);
      return response.data;
    } catch (error) {
      console.log(error);
      if (error instanceof GaxiosError) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('failed to create root folder');
    }
  }

  async renameFile(drive: drive_v3.Drive, renameFileDto: RenameFileDto) {
    const params: drive_v3.Params$Resource$Files$Update = {
      fileId: renameFileDto.fileId,
      fields: 'id, name',
      requestBody: { name: renameFileDto.name },
    };

    try {
      const response = await drive.files.update(params);
      return response.data;
    } catch (error) {
      if (error instanceof GaxiosError) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('failed to create root folder');
    }
  }

  async updateFile(drive: drive_v3.Drive, updateFileDto: UpdateFileDto) {
    const params: drive_v3.Params$Resource$Files$Update = {
      fileId: updateFileDto.fileId,
      fields: 'id, name',
      media: {
        mimeType: 'text/plain',
        body: updateFileDto.content,
      },
    };

    try {
      const response = await drive.files.update(params);
      return response.data;
    } catch (error) {
      if (error instanceof GaxiosError) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('failed to create root folder');
    }
  }

  async deleteFile(drive: drive_v3.Drive, fileId: string) {
    try {
      await drive.files.delete({ fileId });
    } catch (error) {
      console.log(error);
      if (error instanceof GaxiosError) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('failed to create root folder');
    }
  }

  async getFileList(drive: drive_v3.Drive) {
    const folder = await this.getRootFolder(drive);

    const params: drive_v3.Params$Resource$Files$List = {
      q: `'${folder.id}' in parents and trashed=false`,
      fields: 'nextPageToken, files(id, name, createdTime, modifiedTime, size)',
    };

    try {
      const response = await drive.files.list(params);
      return response.data.files;
    } catch (error) {
      if (error instanceof GaxiosError) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('failed to fetch file list');
    }
  }

  private async readFileMetadata(drive: drive_v3.Drive, fileId: string) {
    const params: drive_v3.Params$Resource$Files$Get = {
      fileId,
      fields: 'id, name',
    };

    try {
      const response = await drive.files.get(params);
      return response.data;
    } catch (error) {
      if (error instanceof GaxiosError) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('failed to fetch file list');
    }
  }

  private async readFileContent(drive: drive_v3.Drive, fileId: string) {
    const params: drive_v3.Params$Resource$Files$Get = {
      fileId,
      alt: 'media',
    };

    try {
      const response = await drive.files.get(params);
      return response.data;
    } catch (error) {
      if (error instanceof GaxiosError) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('failed to fetch file list');
    }
  }

  async readFile(drive: drive_v3.Drive, fileId: string) {
    const fileMetadata = await this.readFileMetadata(drive, fileId);
    const fileContent = await this.readFileContent(drive, fileId);
    return {
      ...fileMetadata,
      content: fileContent,
    };
  }
}
