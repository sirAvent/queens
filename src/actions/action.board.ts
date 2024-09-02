import { Cell, ColorStates } from "@/types/types.board";
import { boardColors } from "@/constants/constants.board";

export const updateInvalidCells = (queenBoard: number[][], board: Cell[][]) => {
  board.map((row) => {
    row.map((cell) => {
      cell.isValid = true;
    });
  });

  const colorSatisfied: ColorStates = boardColors.reduce((acc, color) => {
    acc[color] = false; // Initialize each color to false
    return acc;
  }, {} as ColorStates);

  for (let i = 0; i < queenBoard.length; i++) {
    const [x1, y1] = queenBoard[i];
    const queenColor = board[x1][y1].color;

    // Check if a queen already exists in the same cell color
    if (colorSatisfied[queenColor]) {
      board.map((row) => {
        row.map((cell) => {
          if (cell.color === queenColor) {
            cell.isValid = false;
          }
        });
      });
    } else {
      colorSatisfied[queenColor] = true;
    }

    for (let j = i + 1; j < queenBoard.length; j++) {
      const [x2, y2] = queenBoard[j];

      // Check for same row
      if (x1 === x2) {
        board[x1].map((cell) => {
          cell.isValid = false;
        });
      }

      // Check for same column
      if (y1 === y2) {
        board.map((row) => {
          row[y1].isValid = false;
        });
      }

      // Check for diagonal neighbors
      if (Math.abs(x1 - x2) === 1 && Math.abs(y1 - y2) === 1) {
        board[x1][y1].isValid = false;
        board[x2][y2].isValid = false;
      }
    }
  }
};
