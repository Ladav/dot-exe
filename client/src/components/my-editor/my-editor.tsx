import { useEditor, EditorContent, Content, EditorContentProps } from '@tiptap/react'
import type { Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

export interface MyEditorProps extends Pick<EditorContentProps, 'className'> {
  content?: Content
  onUpdate: Editor['options']['onUpdate']
}

export default function MyEditor({ onUpdate, content, ...editorContentProps }: MyEditorProps) {
  const editor = useEditor({
    autofocus: true,
    extensions: [StarterKit],
    content,
    editorProps: {
      attributes: {
        class: 'prose mx-auto prose-invert p-4 focus:outline-none max-w-[800px]',
      },
    },
    onUpdate,
  })

  return <EditorContent editor={editor} {...editorContentProps} />
}
