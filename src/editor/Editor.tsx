import { useState } from 'react'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'
import {
  Box,
  Center,
  Group,
  SegmentedControl,
  Text,
  createStyles,
} from '@mantine/core'
import { IconCode, IconColumns2, IconPhoto } from '@tabler/icons-react'
import { Icon } from '@/components'
import { CodeEditor } from './code-editor'
import { FileMenu } from './components'
import { exportDiagram, exportSvg, exportText } from './lib'
import { MermaidCanvas } from './mermaid-canvas'

const useStyles = createStyles((theme) => ({
  container: {
    height: '100%',
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
  },
  divider: {
    backgroundColor: theme.colors.gray[4],
    width: '8px',
    transition: 'all .2s',
    margin: `${theme.spacing.xs} 0`,
    borderRadius: theme.radius.md,
    '&:hover': {
      backgroundColor: theme.colors.indigo[4],
    },
  },
  toolbar: {
    height: 50,
    boxShadow: theme.shadows.md,
    margin: theme.spacing.xs,
    marginBottom: 0,
    borderRadius: theme.radius.md,
    backgroundColor: 'white',
  },
  codePanel: {
    boxShadow: theme.shadows.md,
    margin: theme.spacing.xs,
    borderRadius: theme.radius.md,
    backgroundColor: 'white',
  },
  diagramPanel: {
    boxShadow: theme.shadows.md,
    margin: theme.spacing.xs,
    borderRadius: theme.radius.md,
    backgroundColor: 'white',
    position: 'relative'
  },
}))

const defaultCode = `flowchart TD
    A[Christmas] -->|Get money| B(Go shopping)
    B --> C{Let me think}
    C -->|One| D[Laptop]
    C -->|Two| E[iPhone]
    C -->|Three| F[Car]`

enum ViewMode {
  Preview = 'preview',
  Code = 'code',
  Diagram = 'diagram',
}

const modeOptions = [
  {
    label: (
      <Center>
        <Icon icon={IconCode} />
      </Center>
    ),
    value: ViewMode.Code,
  },
  {
    label: (
      <Center>
        <Icon icon={IconColumns2} />
      </Center>
    ),
    value: ViewMode.Preview,
  },
  {
    label: (
      <Center>
        <Icon icon={IconPhoto} />
      </Center>
    ),
    value: ViewMode.Diagram,
  },
]

export function Editor() {
  const [code, setCode] = useState(defaultCode || '')
  const { classes } = useStyles()
  const [mode, setMode] = useState(ViewMode.Preview)

  return (
    <div className={classes.container}>
      <Center className={classes.toolbar}>
        <Group>
          <FileMenu
            onExportPng={() => exportDiagram()}
            onExportText={() => exportText(code)}
            onExportSvg={() => exportSvg()}
          />
          <SegmentedControl
            size="sm"
            radius="md"
            data={modeOptions}
            value={mode}
            onChange={(val: ViewMode) => {
              setMode(val)
            }}
          />
        </Group>
      </Center>
      <PanelGroup direction="horizontal">
        {mode != ViewMode.Diagram && (
          <Panel id="code" minSize={35} className={classes.codePanel} order={1}>
            <Box
              sx={(t) => ({
                padding: '5px',
                paddingLeft: '10px',
                borderBottom: `1px solid ${t.colors.gray[2]}`,
              })}
            >
              <Text size="lg" weight="bold">
                Mermaid
              </Text>
            </Box>
            <CodeEditor value={code} onChange={setCode} />
          </Panel>
        )}
        {mode == ViewMode.Preview && (
          <PanelResizeHandle className={classes.divider} />
        )}
        {mode != ViewMode.Code && (
          <Panel
            id="diagram"
            minSize={35}
            className={classes.diagramPanel}
            order={2}
          >
            <MermaidCanvas code={code} syncWithCode />
          </Panel>
        )}
      </PanelGroup>
    </div>
  )
}
