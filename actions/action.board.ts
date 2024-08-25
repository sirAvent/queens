import { boardColors, gray } from "../constants/constants.board";
import { Cell } from "../interfaces/interface.board";
import { shuffle } from "../utils/utils.format";

const isSafe = (board: Cell[][], row: number, col: number): boolean => {
  for (let i = 0; i < col; i++) {
    if (board[row][i].value === "Q") {
      return false;
    }
  }
  for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
    if (board[i][j].value === "Q") {
      return false;
    }
  }
  for (let i = row, j = col; i < 8 && j >= 0; i++, j--) {
    if (board[i][j].value === "Q") {
      return false;
    }
  }
  return true;
};

const solveQueens = (): Cell[][] | null => {
  const board: Cell[][] = Array.from({ length: 8 }, () =>
    Array.from({ length: 8 }, () => ({ value: "", color: gray }))
  );

  const backtrack = (col: number): boolean => {
    if (col >= 8) {
      return true;
    }
    const rows = Array.from({ length: 8 }, (_, i) => i);
    shuffle(rows);
    for (const row of rows) {
      if (isSafe(board, row, col)) {
        board[row][col].value = "Q";
        if (backtrack(col + 1)) {
          return true;
        }
        board[row][col].value = "";
      }
    }
    return false;
  };

  return backtrack(0) ? board : null;
};

const generateColorStrengths = (
  numColors: number,
  baseStrength: number = 0.5,
  strengthVariation: number = 0.8
): { [key: string]: number } => {
  const colorStrengths: { [key: string]: number } = {};

  // Generate a list of random values
  const randomValues = Array.from({ length: numColors }, () => Math.random());

  // Calculate the total of random values
  const total = randomValues.reduce((acc, value) => acc + value, 0);

  // Normalize the random values to sum to 1
  const normalizedValues = randomValues.map((value) => value / total);

  // Apply the strength variation
  const adjustedValues = normalizedValues.map(
    (value) => baseStrength + (value - 0.5) * strengthVariation
  );

  // Ensure all values are within [0, 1] range
  const finalValues = adjustedValues.map((value) =>
    Math.max(0, Math.min(1, value))
  );

  // Assign strengths to colors
  finalValues.forEach((strength, i) => {
    colorStrengths[`Color_${i + 1}`] = strength;
  });

  return colorStrengths;
};

const expandColors = (
  board: Cell[][],
  colorStrengths: { [key: string]: number }
): Cell[][] => {
  const getExpansionPriority = (i: number, j: number): number => {
    // Prioritize corners and edges
    if ([0, 7].includes(i) && [0, 7].includes(j)) {
      // Corners
      return 3;
    } else if ([0, 7].includes(i) || [0, 7].includes(j)) {
      // Edges
      return 2;
    } else {
      // Interior
      return 1;
    }
  };

  const directions: [number, number][] = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  while (board.flat().some((cell) => cell.color === gray)) {
    for (const [color, strength] of Object.entries(colorStrengths)) {
      if (Math.random() < strength) {
        const expansionOptions: [number, number, number][] = [];
        for (let i = 0; i < 8; i++) {
          for (let j = 0; j < 8; j++) {
            if (board[i][j].color === color) {
              for (const [di, dj] of directions) {
                const ni = i + di;
                const nj = j + dj;
                if (
                  ni >= 0 &&
                  ni < 8 &&
                  nj >= 0 &&
                  nj < 8 &&
                  board[ni][nj].color === gray
                ) {
                  const priority = getExpansionPriority(ni, nj);
                  expansionOptions.push([priority, ni, nj]);
                }
              }
            }
          }
        }

        if (expansionOptions.length > 0) {
          // Sort by priority (highest first) and then randomly choose among highest priority
          const maxPriority = Math.max(
            ...expansionOptions.map((option) => option[0])
          );
          const bestOptions = expansionOptions.filter(
            (option) => option[0] === maxPriority
          );
          const [, ni, nj] =
            bestOptions[Math.floor(Math.random() * bestOptions.length)];
          board[ni][nj].color = color;
        }
      }
    }

    if (board.flat().every((cell) => cell.color !== gray)) {
      break;
    }
  }

  return board;
};

export const getBoard = () => {
  let board = solveQueens();
  while (!board) {
    board = solveQueens();
  }
  // Generate 8 unique colors for queens
  const boardColorMap = boardColors;
  shuffle(boardColorMap);

  // Assign colors to queens
  let queenCount = 0;

  const numColors = 8;
  const baseStrength = 0.5; // Represents the central tendency of the color strengths
  const strengthVariation = 0.7; // Determines deviation from base strength

  const colorStrengths = generateColorStrengths(
    numColors,
    baseStrength,
    strengthVariation
  );

  for (const row of board) {
    for (const cell of row) {
      if (cell.value === "Q") {
        const color = boardColorMap[queenCount];
        cell.color = color;
        // Assign a random strength within the specified range
        const strength =
          baseStrength + (Math.random() - 0.5) * strengthVariation;
        colorStrengths[color] = strength;
        queenCount++;
      }
    }
  }

  // Expand colors
  board = expandColors(board, colorStrengths);
  console.log(JSON.stringify(board));
  return JSON.stringify(board);
};

getBoard()