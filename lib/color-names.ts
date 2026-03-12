/**
 * 常用颜色中英文映射，与 admin 后台 COMMON_COLORS 保持一致。
 * 前台根据 locale 显示对应语言的颜色名。
 */
export const COLOR_NAMES: { hex: string; nameZh: string; nameEn: string }[] = [
  { hex: '#000000', nameZh: '经典黑', nameEn: 'Black' },
  { hex: '#B7A89A', nameZh: '大象灰', nameEn: 'Etoupe' },
  { hex: '#C19A6B', nameZh: '焦糖棕', nameEn: 'Caramel' },
  { hex: '#F5F0E8', nameZh: '奶油白', nameEn: 'Cream' },
  { hex: '#8B4513', nameZh: '深棕色', nameEn: 'Brown' },
  { hex: '#B22222', nameZh: '正红', nameEn: 'Red' },
  { hex: '#6B1C23', nameZh: '酒红', nameEn: 'Burgundy' },
  { hex: '#D4A0A0', nameZh: '玫瑰粉', nameEn: 'Rose' },
  { hex: '#9CAF88', nameZh: '墨绿色', nameEn: 'Green' },
  { hex: '#1B2A4A', nameZh: '藏蓝', nameEn: 'Navy' },
  { hex: '#C5A55A', nameZh: '金色', nameEn: 'Gold' },
  { hex: '#7C7C7C', nameZh: '深灰', nameEn: 'Dark Grey' },
]

export type Locale = 'en' | 'zh'

/**
 * 根据 colorHex 或 colorName（中文）匹配，返回当前语言下的颜色显示名。
 * 未匹配到时返回原始 colorName（兼容后台自定义颜色）。
 */
export function getColorDisplayName(
  colorHex: string | undefined,
  colorName: string,
  locale: Locale
): string {
  const hex = (colorHex || '').toLowerCase().trim()
  const nameZh = (colorName || '').trim()

  const found = COLOR_NAMES.find(
    (c) => c.hex.toLowerCase() === hex || c.nameZh === nameZh
  )
  if (found) {
    return locale === 'en' ? found.nameEn : found.nameZh
  }
  return colorName || ''
}
