import { Button, Menu } from '@mantine/core'
import {
  IconDeviceFloppy,
  IconFile,
  IconPng,
  IconSvg,
  IconTxt,
} from '@tabler/icons-react'
import { Icon } from '@/components'

export interface FileMenuProps {
  onSave?: () => any
  onSaveAs?: () => any
  onExportPng?: () => any
  onExportText?: () => any
  onExportSvg?: () => any
}

export function FileMenu(props: FileMenuProps) {
  return (
    <Menu radius="md">
      <Menu.Target>
        <Button
          radius="md"
          size="sm"
          variant="default"
          leftIcon={<Icon icon={IconFile} />}
        >
          File
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>File</Menu.Label>
        <Menu.Item
          icon={<Icon icon={IconDeviceFloppy} />}
          onClick={props.onSave}
        >
          Save
        </Menu.Item>

        <Menu.Label>Export</Menu.Label>
        <Menu.Item icon={<Icon icon={IconPng} />} onClick={props.onExportPng}>
          Export PNG
        </Menu.Item>

        <Menu.Item icon={<Icon icon={IconSvg} />} onClick={props.onExportSvg}>
          Export SVG
        </Menu.Item>

        <Menu.Item icon={<Icon icon={IconTxt} />} onClick={props.onExportText}>
          Export Text
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}
