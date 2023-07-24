import { TablerIconsProps } from '@tabler/icons-react'
import { tablerIconProps } from '@/theme'

export interface IconProps {
  icon: (props: TablerIconsProps) => JSX.Element
  iconProps?: TablerIconsProps
}

export function Icon({ icon: TablerIcon, iconProps }: IconProps) {
  return (
    <>
      <TablerIcon {...tablerIconProps} {...iconProps} />
    </>
  )
}
