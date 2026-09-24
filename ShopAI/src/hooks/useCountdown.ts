import { useState, useEffect } from 'react';

/**
 * Hook đếm ngược từ `seconds` về 0
 * @param seconds - Số giây đếm ngược ban đầu
 * @returns { timeLeft, isFinished }
 */
export const useCountdown = (seconds: number) => {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    // Đã hết thì dừng
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Cleanup khi unmount hoặc timeLeft thay đổi
    return () => clearInterval(timer);
  }, [timeLeft]);

  return {
    timeLeft,
    isFinished: timeLeft <= 0,
  };
};
