import { useState, useEffect } from "react";

// Хук для дебаунсу значення
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);  // Очищаємо попередній таймер при змінах
    };
  }, [value, delay]);

  return debouncedValue;
};
