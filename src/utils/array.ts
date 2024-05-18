export const extractKeys = (arr: Array<Record<string, any>>): string[] => {
  const keysSet: Set<string> = new Set();

  arr.forEach((obj) => {
    Object.keys(obj).forEach((key) => {
      keysSet.add(key);
    });
  });

  return Array.from(keysSet);
};
