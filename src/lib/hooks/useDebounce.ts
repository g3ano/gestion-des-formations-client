import { useEffect, useState } from 'react';

const useDebounce = (value: string) => {
  const [debouncedValue, setDebouncedValue] = useState('');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, 600);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [value]);

  return debouncedValue;
};

export default useDebounce;
