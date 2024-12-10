'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import CodeBlock from '@tiptap/extension-code-block'
import Heading from '@tiptap/extension-heading'
import Gapcursor from '@tiptap/extension-gapcursor'
import Paragraph from '@tiptap/extension-paragraph'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import Dropcursor from '@tiptap/extension-dropcursor'
import Underline from '@tiptap/extension-underline'
import Image from '@tiptap/extension-image'
import ImageResize from 'tiptap-extension-resize-image'
import { useEditorStore } from '@/store/use-editor-store'
import Code from '@tiptap/extension-code'
import FontFamily from '@tiptap/extension-font-family'
import TextStyle from '@tiptap/extension-text-style'
import Highlight from '@tiptap/extension-highlight'
import { Color } from '@tiptap/extension-color'
import Link from '@tiptap/extension-link'


export const Editor = () => {
const {setEditor} = useEditorStore()

  const editor = useEditor({
    onCreate({editor}) {
      setEditor(editor)
    },
    onDestroy() {
      setEditor(null)
    },
    onUpdate({editor}) {
      setEditor(editor)
    },
    onSelectionUpdate({editor}) {
      setEditor(editor)
    },
    onTransaction({editor}) {
      setEditor(editor)
    },
    onFocus({editor}) {
      setEditor(editor)
    },
    onBlur({editor}) {
      setEditor(editor)
    },
    onContentError({editor}) {
      setEditor(editor)
    },

    extensions: [StarterKit,
      Image,
      Dropcursor,
      Paragraph,
      Link.configure({
        openOnClick: true, //todo set to true
        autolink: true,
        defaultProtocol: 'https',
        protocols: ['http', 'https']
      }),
      Heading,
      TaskList,
      ImageResize,
      Color,
      Underline,
      Highlight.configure({ multicolor: true }),
      // todo style resize position bar
      CodeBlock,
      Code,
      FontFamily,
      TextStyle,
      TaskItem.configure({
        nested: true,
      }), Gapcursor,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: `
         
  `,

    editorProps:{
      attributes:{
class :' focus-outline-none print:border-0 bg-white dark:bg-[#181818] pt-10 pr-15 pb-10 cursor-text p-1.5 border-[#c7c7c7] rounded-sm w-[816px] min-h-[1054px] flex flex-col border-2',
style:'padding-left:56px; padding-right:56px;'
    }}
  })

  return (<div className='size-full overflow-x-auto px-4 print:p-0 print:bg-white print:overflow-visible'>
    <div className="min-w-max flex justify-center py-4 w-[816px] mx-auto print:py-0 print:w-full print:min-w-0">
    <EditorContent editor={editor} />
    </div>
    </div>)
}

