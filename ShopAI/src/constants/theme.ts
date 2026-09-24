// ============================================================
// THEME — Màu sắc, kích thước dùng chung toàn app ShopAI
// ============================================================

export const COLORS = {
  // Brand
  primary: '#FF4D4F',
  primaryLight: '#FF7875',
  primaryDark: '#CF1322',
  secondary: '#FA8C16', // Màu cam — dùng cho nút hành động phụ (Giỏ hàng, Quét mã)

  // Backgrounds
  background: '#F5F5F5',
  surface: '#FFFFFF',
  surfaceSecondary: '#FAFAFA',

  // Text
  text: '#2C3E50',
  textSecondary: '#7F8C8D',
  textLight: '#95A5A6',
  textInverse: '#FFFFFF',

  // Border
  border: '#E8E8E8',
  borderFocus: '#FF4D4F',

  // Status
  error: '#FF4D4F',
  success: '#52C41A',
  warning: '#FAAD14',
  info: '#1890FF',

  // Misc
  overlay: 'rgba(0,0,0,0.5)',
  transparent: 'transparent',
};

export const SIZES = {
  // Font sizes
  h1: 28,
  h2: 22,
  h3: 18,
  body1: 16,
  body2: 14,
  small: 12,
  tiny: 10,

  // Spacing
  padding: 16,
  paddingSmall: 8,
  paddingLarge: 24,

  // Border radius
  radius: 12,
  radiusSmall: 8,
  radiusLarge: 20,
  radiusRound: 999,
};

export const FONTS = {
  regular: { fontWeight: '400' as const },
  medium: { fontWeight: '500' as const },
  semiBold: { fontWeight: '600' as const },
  bold: { fontWeight: '700' as const },
  extraBold: { fontWeight: '800' as const },
};
