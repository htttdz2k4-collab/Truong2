import React, { useState, useCallback, useReducer } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import ShopButton from '@components/ui/ShopButton';
import Typography from '@components/ui/Typography';
import ShopInput from '@components/ShopInput';
import { useCountdown } from '@hooks/useCountdown';
import { useTheme } from '@contexts/ThemeContext';
import { SIZES } from '@constants/theme';

// ──────────────────────────────────────────────
// REDUCER: Quản lý số lượng sản phẩm
// ──────────────────────────────────────────────
type QtyAction = { type: 'ADD' } | { type: 'REMOVE' };

function qtyReducer(state: number, action: QtyAction): number {
  switch (action.type) {
    case 'ADD':
      return state + 1;
    case 'REMOVE':
      return Math.max(1, state - 1); // Không cho giảm xuống dưới 1
    default:
      return state;
  }
}

// ──────────────────────────────────────────────
// COMPONENT
// ──────────────────────────────────────────────
const HomeScreen = () => {
  const { colors, isDark, toggleTheme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [coupon, setCoupon] = useState('');
  const { timeLeft, isFinished } = useCountdown(60);
  const [quantity, dispatchQty] = useReducer(qtyReducer, 1);

  const handleCheckout = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log('Thanh toán thành công!', coupon, 'Số lượng:', quantity);
    }, 2000);
  }, [coupon, quantity]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Typography variant="h1" color={colors.text} style={styles.title}>
        ShopAI UI Kit
      </Typography>

      <ShopButton
        title={isDark ? 'Chuyển sang Sáng' : 'Chuyển sang Tối'}
        onPress={toggleTheme}
        style={[styles.themeBtn, { backgroundColor: colors.primary }]}
      />

      <Typography variant="body2" color={colors.textLight} style={styles.subtitle}>
        {isFinished ? 'Đã hết hạn khuyến mãi!' : `Flash sale kết thúc sau: ${timeLeft}s`}
      </Typography>

      <View style={[styles.card, { backgroundColor: colors.surface }]}>
        <Typography variant="h2" color={colors.primary} style={styles.price}>
          Tổng tiền: {(15000000 * quantity).toLocaleString('vi-VN')}đ
        </Typography>

        {/* Nút điều chỉnh số lượng */}
        <View style={styles.qtyRow}>
          <TouchableOpacity
            style={[styles.qtyBtn, { borderColor: colors.primary }]}
            onPress={() => dispatchQty({ type: 'REMOVE' })}
            activeOpacity={0.7}
          >
            <Typography variant="h3" color={colors.primary}>
              −
            </Typography>
          </TouchableOpacity>

          <Typography variant="h3" color={colors.text} style={styles.qtyText}>
            {quantity}
          </Typography>

          <TouchableOpacity
            style={[styles.qtyBtn, { borderColor: colors.primary }]}
            onPress={() => dispatchQty({ type: 'ADD' })}
            activeOpacity={0.7}
          >
            <Typography variant="h3" color={colors.primary}>
              +
            </Typography>
          </TouchableOpacity>
        </View>

        <ShopInput
          label="Mã giảm giá"
          placeholder="Nhập mã (VD: SHOPAI10)"
          value={coupon}
          onChangeText={setCoupon}
          autoCapitalize="characters"
        />

        <ShopButton
          title="Xác nhận thanh toán"
          onPress={handleCheckout}
          isLoading={loading}
          disabled={isFinished}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: SIZES.padding,
  },
  title: { textAlign: 'center', marginBottom: 12 },
  themeBtn: { marginBottom: 16 },
  subtitle: { textAlign: 'center', marginBottom: 16 },
  card: {
    padding: 20,
    borderRadius: SIZES.radius,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  price: { marginBottom: 20, textAlign: 'center' },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SIZES.padding,
  },
  qtyBtn: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderRadius: SIZES.radius,
  },
  qtyText: {
    minWidth: 48,
    textAlign: 'center',
  },
});

export default HomeScreen;
