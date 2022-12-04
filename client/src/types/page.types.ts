export interface Page {
  id: number
  createdAt: string
  updatedAt: string
  title: string
  content: string
}

export interface CreatePageDto extends Pick<Page, 'title' | 'content'> {}

export interface UpdatePageDto extends Partial<CreatePageDto> {}
