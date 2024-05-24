export const debouncedValue = <T extends any[]>(
  callback: (...args: T) => void,
  delay: number
) => {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  return function (...args: T) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};
