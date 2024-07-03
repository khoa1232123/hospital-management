import { OptionsType } from "@/types/field";

type DataType = { [key: string]: any };

const isEmptyObject = (obj: any): boolean => {
  return Object.values(obj).every((value) => value === "");
};

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

export const convertNumberToOptions = (n: number): OptionsType[] => {
  const result: OptionsType[] = [];
  for (let i = 1; i <= n; i++) {
    result.push({ value: i, label: `Number ${i}` });
  }
  return result;
};

export const cleanData = (data: DataType): DataType => {
  const cleanedData: DataType = {};

  for (const key in data) {
    if (!key.includes("].")) {
      if (Array.isArray(data[key])) {
        // Filter out empty objects from arrays
        cleanedData[key] = data[key].filter(
          (item: any) => !isEmptyObject(item)
        );
      } else {
        cleanedData[key] = data[key];
      }
    }
  }

  return cleanedData;
};

export const getValueData = (data: any, key: string): string | number => {
  const keys = key.split('.');
  let result = data;

  for (const k of keys) {
    if (result[k] === undefined) {
      return "";
    }
    result = result[k];
  }

  return result;
}
