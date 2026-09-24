import React, { memo } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
  StyleProp,
} from 'react-native';
import { COLORS, SIZES } from '@constants/theme';
import Typography from './Typography';

// ──────────────────────────────────────────────
// INTERFACE
// ──────────────────────────────────────────────
interface ShopButtonProps {
  title: string;
  onPress: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'outline'; // ➕ không truyền thì mặc định 'primary'
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  accessibilityLabel?: string;
}

// ──────────────────────────────────────────────
// COMPONENT
// ──────────────────────────────────────────────
const ShopButton: React.FC<ShopButtonProps> = ({
  title,
  onPress,
  isLoading = false,
  disabled = false,
  variant = 'primary', // ➕
  style,
  textStyle,
  accessibilityLabel,
}) => {
  // ➕ tra đúng style nền + màu chữ theo variant
  const variantStyle = styles[variant];
  const textColor = variant === 'outline' ? COLORS.primary : COLORS.surface;

  return (
    <TouchableOpacity
      // Thứ tự mảng style CHỦ ĐÍCH:
      // layout chung → màu theo variant → khoá (disabled) → style riêng (ưu tiên cao nhất vì đứng cuối)
      style={[styles.button, variantStyle, disabled && styles.disabledButton, style]}
      onPress={onPress}
      disabled={disabled || isLoading}
      activeOpacity={0.8}
      accessibilityLabel={accessibilityLabel ?? title}
      accessibilityRole="button"
    >
      {isLoading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <Typography variant="body1" color={textColor} style={[styles.defaultText, textStyle]}>
          {title}
        </Typography>
      )}
    </TouchableOpacity>
  );
};

// ──────────────────────────────────────────────
// STYLES
// ──────────────────────────────────────────────
const styles = StyleSheet.create({
  // Layout chung — KHÔNG đổi màu ở đây
  button: {
    height: 52,
    borderRadius: SIZES.radius,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SIZES.paddingLarge,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },
  disabledButton: {
    opacity: 0.45,
  },
  defaultText: {
    fontWeight: '600',
  },

  // ➕ Ba biến thể — chỉ đổi màu nền/viền, KHÔNG lặp lại layout đã có ở `button`
  primary: {
    backgroundColor: COLORS.primary, // Hành động chính: Thanh toán, Đăng nhập, Xác nhận
  },
  secondary: {
    backgroundColor: COLORS.secondary, // Hành động phụ: Giỏ hàng, Quét mã
    shadowOpacity: 0,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    shadowOpacity: 0, // Nút viền rỗng không cần đổ bóng, nhìn đỡ "nặng" hơn nút đặc màu
  },
});

export default memo(ShopButton);
