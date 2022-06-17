interface Data {
  pattern: number[][];
  movements: number[];
}

export function verify(data: Data, callback: { (win: boolean): void }) {
  const pattern = data.pattern;
  const movements = data.movements;

  pattern.forEach((array) => {
    if (array.every((arra) => movements.includes(arra))) {
      callback(true);
    }
  });
}

export const pattern_3x3 = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const pattern_4x4 = [
  [0, 1, 2, 3],
  [4, 5, 6, 7],
  [8, 9, 10, 11],
  [12, 13, 14, 15],
  [0, 4, 8, 12],
  [1, 5, 9, 13],
  [2, 6, 10, 14],
  [3, 7, 11, 15],
  [0, 5, 10, 15],
  [3, 6, 9, 12],
];
