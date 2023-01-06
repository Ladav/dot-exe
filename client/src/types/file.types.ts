export type GDriveFile = {
  id: string
  name: string
  content: string
}

export interface CreateFileDto {
  title: string
  content: string
}

export interface UpdateFileDto extends Pick<CreateFileDto, 'content'> {
  fileId: string
}

export interface RenameFileDto {
  fileId: string
  name: string
}
