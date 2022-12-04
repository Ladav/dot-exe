import { CreatePageDto, UpdatePageDto } from './../types/page.types'
import { apiClient } from '../constants/client'

export async function createPage(dto: CreatePageDto) {
  const { data } = await apiClient.post('/page', dto)
  return data
}

export async function getAllPages() {
  const { data } = await apiClient.get('/page')
  return data
}

export async function getPageById(id: number) {
  const { data } = await apiClient.get(`/page/${id}`)
  return data
}

export async function updatePageById(id: number, dto: UpdatePageDto) {
  const { data } = await apiClient.patch(`/page/${id}`, dto)
  return data
}
