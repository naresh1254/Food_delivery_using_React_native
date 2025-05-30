import { useState, useCallback } from 'react';

export function useToast() {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');

  const showToast = useCallback((text: string, duration = 3000) => {
    setMessage(text);
    setIsVisible(true);
  }, []);

  const hideToast = useCallback(() => {
    setIsVisible(false);
  }, []);

  return {
    isVisible,
    message,
    showToast,
    hideToast,
  };
}