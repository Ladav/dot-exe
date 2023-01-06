import { useEditor, EditorContent, EditorContentProps } from '@tiptap/react'
import Document from '@tiptap/extension-document'
import Text from '@tiptap/extension-text'
import Paragraph from '@tiptap/extension-paragraph'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import History from '@tiptap/extension-history'
import Heading from '@tiptap/extension-heading'
import Typography from '@tiptap/extension-typography'
import EmojiReplacer from './custom-plugins/emoji-replacer'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { lowlight } from 'lowlight'

type EditorOptionsType = Exclude<Parameters<typeof useEditor>['0'], undefined>
export interface MyEditorProps extends Pick<EditorContentProps, 'className'> {
  content: EditorOptionsType['content']
  onBlur: Exclude<EditorOptionsType['onBlur'], undefined>
}

export default function MyEditor({ onBlur, content, ...editorContentProps }: MyEditorProps) {
  const editor = useEditor({
    autofocus: true,
    extensions: [
      Document,
      Text,
      Paragraph,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      History,
      Heading,
      Typography,
      EmojiReplacer,
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class: 'prose mx-auto prose-invert p-4 focus:outline-none max-w-[800px]',
      },
    },
    onBlur,
  })

  if (!editor) {
    return null
  }

  return <EditorContent editor={editor} {...editorContentProps} />
}
