import React from 'react'
import { createPage } from '../../queries/page.queries'

export interface CreatePageProps {
  trigger: React.ReactElement
}

export default function CreatePage({ trigger }: CreatePageProps) {
  function createNewPage() {
    createPage({ content: '', title: 'Untitled' }).then(() => {
      alert('page created')
    })
  }
  return React.cloneElement(trigger, {
    onClick: () => {
      createNewPage()
    },
  })
}
