import React from 'react'
import { useMutation } from 'react-query'
import { createPage } from '../../queries/page.queries'

export interface CreatePageProps {
  trigger: React.ReactElement
}

export default function CreatePage({ trigger }: CreatePageProps) {
  const createPageM = useMutation(createPage)

  return React.cloneElement(trigger, {
    onClick: () => {
      createPageM.mutate({ content: '', title: 'Untitled' })
    },
  })
}
