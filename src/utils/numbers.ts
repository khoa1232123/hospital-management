export const isNumberInput = (input: string): boolean => {
  // Sử dụng regex để kiểm tra nếu input chỉ chứa các ký tự số
  const numberPattern = /^[0-9]+$/;
  return numberPattern.test(input);
};
