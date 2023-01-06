import { apiClient } from '../constants/client'
import { CreateFileDto, GDriveFile, RenameFileDto, UpdateFileDto } from '../types/file.types'

export async function createFile(dto: CreateFileDto) {
  const { data } = await apiClient.post<Pick<GDriveFile, 'id' | 'name'>>('/g-drive/file/create', dto)
  return data
}

export async function getFiles() {
  const { data } = await apiClient.get<Pick<GDriveFile, 'id' | 'name'>[]>('/g-drive/file/all')
  return data
}

export async function getFileContentById(id: string) {
  const { data } = await apiClient.get<GDriveFile>(`/g-drive/file/read/${id}`)
  return data
}

export async function renameFile(dto: RenameFileDto) {
  await apiClient.patch(`/g-drive/file/rename`, dto)
}

export async function updateFile(dto: UpdateFileDto) {
  const { data } = await apiClient.patch<GDriveFile>(`/g-drive/file/update`, dto)
  return data
}

export async function deleteFileById(fileId: string) {
  await apiClient.delete(`/g-drive/file/delete/${fileId}`)
}
