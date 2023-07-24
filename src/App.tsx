import { createStyles } from '@mantine/core'
import { Editor } from './editor'

const useStyles = createStyles((theme) => ({
  app: {
    width: '100vw',
    height: '100vh',
    backgroundColor: theme.colors.gray[0],
  },
}))

export default function App() {
  const { classes } = useStyles()
  return (
    <div className={classes.app}>
      <Editor />
    </div>
  )
}
