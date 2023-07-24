import { useState } from 'react'
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'
import {
  ActionIcon,
  Group,
  Overlay,
  Text,
  Tooltip,
  createStyles,
} from '@mantine/core'
import { IconZoomIn, IconZoomOut, IconZoomReset } from '@tabler/icons-react'
import { Icon } from '@/components'
import { MermaidSvg } from './MermaidSvg'

const useStyles = createStyles((theme) => ({
  container: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  wrapper: {
    width: '100% !important',
    height: '100% !important',
  },
  content: {
    width: '100% !important',
    height: '100% !important',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controls: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 10,
  },
  overlay: {
    padding: theme.spacing.xl,
  },
}))

interface MermaidCanvasProps {
  code: string
  syncWithCode: boolean
}

export function MermaidCanvas({ code, syncWithCode }: MermaidCanvasProps) {
  const { classes } = useStyles()
  const [error, setError] = useState<undefined | string>()
  return (
    <>
      {error && (
        <Overlay
          color="#000"
          fixed={false}
          blur={0.8}
          className={classes.overlay}
        >
          <Text
            size="lg"
            sx={(theme) => ({
              color: '#fff',
              fontFamily: theme.fontFamilyMonospace,
              width: '1/3',
            })}
          >
            {error}
          </Text>
        </Overlay>
      )}
      <TransformWrapper centerOnInit={true}>
        {({ zoomIn, zoomOut, resetTransform }) => (
          <div className={classes.container}>
            <Group className={classes.controls} spacing={8}>
              <Tooltip label="zoom in">
                <ActionIcon variant="light" onClick={() => zoomIn()}>
                  <Icon icon={IconZoomIn} />
                </ActionIcon>
              </Tooltip>
              <Tooltip label="reset">
                <ActionIcon variant="light" onClick={() => resetTransform()}>
                  <Icon icon={IconZoomReset} />
                </ActionIcon>
              </Tooltip>
              <Tooltip label="zoom out">
                <ActionIcon variant="light" onClick={() => zoomOut()}>
                  <Icon icon={IconZoomOut} />
                </ActionIcon>
              </Tooltip>
            </Group>
            <TransformComponent
              wrapperClass={classes.wrapper}
              contentClass={classes.content}
            >
              <MermaidSvg
                code={code}
                syncWithCode={syncWithCode}
                onError={setError}
              />
            </TransformComponent>
          </div>
        )}
      </TransformWrapper>
    </>
  )
}
