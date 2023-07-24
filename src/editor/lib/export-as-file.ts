import { notifications } from '@mantine/notifications'
import { dialog, fs } from '@tauri-apps/api'
import { toBlob } from 'html-to-image'

export function exportDiagram() {
  dialog
    .save({
      filters: [{ name: 'Image', extensions: ['png'] }],
      title: 'Export diagram',
    })
    .then(async (path) => {
      if (!path) throw new Error('Canceled')
      const svgElem = document.getElementById('diagram-container')
      if (!svgElem) throw new Error('Element not found')
      const fileContent = await toBlob(svgElem)
      if (!fileContent) throw new Error('File convert failed')
      const buf = await fileContent.arrayBuffer()
      return fs.writeBinaryFile(path, buf)
    })
    .then(() => {
      notifications.show({
        title: 'Success',
        message: 'Export completed',
        color: 'green',
      })
    })
    .catch((err: Error) => {
      notifications.show({
        title: 'Error',
        message: err.message,
        color: 'red',
      })
    })
}

export function exportText(code: string) {
  dialog
    .save({
      filters: [{ name: 'Mermaid diagram', extensions: ['mmd', 'mermaid'] }],
      title: 'Export text',
    })
    .then(async (path) => {
      if (!path) throw new Error('Canceled')
      return fs.writeTextFile(path, code)
    })
    .then(() => {
      notifications.show({
        title: 'Success',
        message: 'Export completed',
        color: 'green',
      })
    })
    .catch((err: Error) => {
      notifications.show({
        title: 'Error',
        message: err.message,
        color: 'red',
      })
    })
}

export function exportSvg() {
  dialog
    .save({
      filters: [{ name: 'SVG Files', extensions: ['svg'] }],
      title: 'Export svg',
    })
    .then(async (path) => {
      if (!path) throw new Error('Canceled')
      const svgElem = document.getElementById('diagram-container')
      if (!svgElem) throw new Error('Element not found')
      return fs.writeTextFile(path, svgElem.innerHTML)
    })
    .then(() => {
      notifications.show({
        title: 'Success',
        message: 'Export completed',
        color: 'green',
      })
    })
    .catch((err: Error) => {
      notifications.show({
        title: 'Error',
        message: err.message,
        color: 'red',
      })
    })
}
