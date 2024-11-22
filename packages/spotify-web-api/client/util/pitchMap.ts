export const pitchMinor = [
  "5A",
  "12A",
  "7A",
  "2A",
  "9A",
  "4A",
  "11A",
  "6A",
  "1A",
  "8A",
  "3A",
  "10A",
];

export const pitchMajor = [
  "8B",
  "3B",
  "10B",
  "5B",
  "12B",
  "7B",
  "2B",
  "9B",
  "4B",
  "11B",
  "6B",
  "1B",
];

export const getCamelotKey = (key?: number | null, mode?: number | null) => {
  if (!isInteger(key) || !isInteger(mode)) {
    return null;
  }
  return mode === 1 ? pitchMajor[key] : pitchMinor[key];
};

const isInteger = (value: number | null | undefined): value is number =>
  typeof value === "number" && Number.isInteger(value);
