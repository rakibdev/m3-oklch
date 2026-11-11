import {
  Hct,
  MaterialDynamicColors,
  SchemeTonalSpot,
  argbFromHex,
  hexFromArgb
} from '@material/material-color-utilities'
import { createDynamicPalette, hexToHct, type MaterialPalette } from '../typescript/main.ts'

export const source = '#ff5722'

export const createHctPalette = (): MaterialPalette => {
  const scheme = new SchemeTonalSpot(Hct.fromInt(argbFromHex(source)), true, 0)
  const get = (color: typeof MaterialDynamicColors.primary) => hexFromArgb(color.getArgb(scheme))
  return {
    foreground: get(MaterialDynamicColors.onSurface),
    mutedForeground: get(MaterialDynamicColors.onSurfaceVariant),
    background: get(MaterialDynamicColors.surface),
    card: get(MaterialDynamicColors.surfaceContainer),
    popover: get(MaterialDynamicColors.surfaceContainerHigh),
    hover: get(MaterialDynamicColors.surfaceContainerHighest),
    border: get(MaterialDynamicColors.outlineVariant),
    primary: get(MaterialDynamicColors.primary),
    primaryForeground: get(MaterialDynamicColors.onPrimary),
    secondary: get(MaterialDynamicColors.secondaryContainer),
    secondaryForeground: get(MaterialDynamicColors.onSecondaryContainer)
  }
}

export const createOklchPalette = () => createDynamicPalette(hexToHct(source), true)
