import { CreatePageDto } from './../types/page.types'
import { apiClient } from '../constants/client'

export async function createPage(dto: CreatePageDto) {
  const { data } = await apiClient.post('/page', dto)
  return data
}

export async function getAllPages() {
  const { data } = await apiClient.get('/page')
  return data
}
