import { SortOrder } from '../enums/sort-order.enum'

// Types
export interface Page {
  id: number
  createdAt: string
  updatedAt: string
  title: string
  content: string
}

export interface PageListItem extends Pick<Page, 'id' | 'title'> {}

// DTO
export interface CreatePageDto extends Pick<Page, 'title' | 'content'> {}

export interface UpdatePageDto extends Partial<CreatePageDto> {}

export interface FilterPageDto {
  sortOrder?: SortOrder
}

export interface RenamePageDto extends Pick<Page, 'title'> {}
