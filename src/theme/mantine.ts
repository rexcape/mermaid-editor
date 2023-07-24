import type { MantineProviderProps, MantineThemeOverride } from '@mantine/core'

const theme: MantineThemeOverride = {
  fontFamilyMonospace: '"MonoLisa", Consolas, monospace',
}

export const mantineConfig: Omit<MantineProviderProps, 'children'> = {
  withGlobalStyles: true,
  withNormalizeCSS: true,
  theme,
}
