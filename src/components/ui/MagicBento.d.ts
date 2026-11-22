import type { CSSProperties, ReactNode } from 'react'

export type MagicBentoItem = {
  id?: string
  label?: string
  title?: string
  description?: string
  icon?: ReactNode
  image?: string
  visual?: ReactNode | string
  content?: ReactNode
  href?: string
  target?: string
  rel?: string
  onClick?: (event: unknown) => void
  colSpan?: number
  rowSpan?: number
}

export type MagicBentoProps = {
  items?: MagicBentoItem[]
  columns?: number
  rowHeight?: number
  gap?: number
  radius?: number
  theme?: 'dark' | 'light'
  glowColor?: string
  enableBorderGlow?: boolean
  enableSpotlight?: boolean
  spotlightRadius?: number
  enableStars?: boolean
  particleCount?: number
  enableTilt?: boolean
  enableMagnetism?: boolean
  clickEffect?: boolean
  textAutoHide?: boolean
  intro?: boolean
  disableAnimations?: boolean
  onItemClick?: (item: MagicBentoItem, index: number) => void
  className?: string
  style?: CSSProperties
}

declare const MagicBento: (props: MagicBentoProps) => ReactNode
export default MagicBento
