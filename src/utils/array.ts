export const extractKeys = (arr: Array<Record<string, any>>): string[] => {
  const keysSet: Set<string> = new Set();

  arr.forEach((obj) => {
    Object.keys(obj).forEach((key) => {
      keysSet.add(key);
    });
  });

  return Array.from(keysSet);
};

export const convertNumberToArray = (n: number): number[] => {
  return Array.from({ length: n }, (_, i) => i + 1);
};
