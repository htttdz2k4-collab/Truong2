import React, { memo } from 'react';
import { Text, TextStyle, StyleSheet, TextProps, StyleProp } from 'react-native';
import { COLORS, SIZES, FONTS } from '@constants/theme';

// Các kiểu chữ hỗ trợ
type Variant = 'h1' | 'h2' | 'h3' | 'body1' | 'body2' | 'small' | 'tiny';

interface Props extends TextProps {
  variant?: Variant;
  color?: string;
  style?: StyleProp<TextStyle>;
  children: React.ReactNode;
  onPress?: (event?: any) => void;
}

const variantStyles: Record<Variant, TextStyle> = {
  h1: { fontSize: SIZES.h1, ...FONTS.extraBold, color: COLORS.text },
  h2: { fontSize: SIZES.h2, ...FONTS.bold, color: COLORS.text },
  h3: { fontSize: SIZES.h3, ...FONTS.semiBold, color: COLORS.text },
  body1: { fontSize: SIZES.body1, ...FONTS.regular, color: COLORS.text },
  body2: { fontSize: SIZES.body2, ...FONTS.regular, color: COLORS.textSecondary },
  small: { fontSize: SIZES.small, ...FONTS.regular, color: COLORS.textSecondary },
  tiny: { fontSize: SIZES.tiny, ...FONTS.regular, color: COLORS.textLight },
};

const Typography = ({ variant = 'body1', color, style, children, ...rest }: Props) => {
  return (
    <Text style={[styles.base, variantStyles[variant], color ? { color } : null, style]} {...rest}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  base: {
    includeFontPadding: false,
  },
});

export default memo(Typography);
