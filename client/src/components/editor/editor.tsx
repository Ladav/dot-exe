import { useEditor, EditorContent, Content, EditorContentProps } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

export interface EditorProps extends Pick<EditorContentProps, 'className'> {
  content?: Content
}

export default function Editor({ content, ...editorContentProps }: EditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    editorProps: {
      attributes: {
        class: 'prose mx-auto prose-invert p-4 focus:outline-none max-w-[800px]',
      },
    },
  })

  return <EditorContent editor={editor} {...editorContentProps} />
}
