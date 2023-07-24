import { LoadingOverlay, useMantineTheme } from '@mantine/core'
import Editor, { EditorProps, loader } from '@monaco-editor/react'
import * as monaco from 'monaco-editor'
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import { initEditor } from './init-editor'

self.MonacoEnvironment = {
  getWorker() {
    return new EditorWorker()
  },
}

loader.config({ monaco })
loader.init()

interface CodeEditorProps {
  value?: string
  onChange?: (val: string) => any
}

export function CodeEditor({ value, onChange }: CodeEditorProps) {
  const theme = useMantineTheme()
  const handleEditorDidMount: EditorProps['onMount'] = (_editor, monaco) => {
    initEditor(monaco)
  }

  return (
    <Editor
      language="mermaid"
      value={value}
      loading={<LoadingOverlay visible />}
      onChange={(v) => v && onChange?.(v)}
      onMount={handleEditorDidMount}
      options={{
        minimap: { enabled: false },
        fontFamily: theme.fontFamilyMonospace,
        fontSize: 12,
      }}
    />
  )
}
