export const splitString = (s: string): string[] => {
  const result: string[] = [];
  const length = s.length;
  // Duyệt qua tất cả các vị trí bắt đầu có thể
  for (let i = 0; i < length; i++) {
    // Duyệt qua tất cả các độ dài con có thể
    for (let j = i + 1; j <= length; j++) {
      result.push(s.substring(i, j));
    }
  }
  return result;
};
