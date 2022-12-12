import { CreatePageDto, Page, UpdatePageDto } from './../types/page.types'
import { apiClient } from '../constants/client'

export async function createPage(dto: CreatePageDto) {
  const { data } = await apiClient.post<Page>('/page', dto)
  return data
}

export async function getAllPages() {
  const { data } = await apiClient.get<Page[]>('/page')
  return data
}

export async function getPageById(id: number | string) {
  const { data } = await apiClient.get<Page>(`/page/${id}`)
  return data
}

export async function updatePageById({ id, dto }: { id: number | string; dto: UpdatePageDto }) {
  const { data } = await apiClient.patch<Page>(`/page/${id}`, dto)
  return data
}
