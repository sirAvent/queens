import { Cell } from "@/types/types.board";

export const updateInvalidCells = (
  queenBoard: number[][],
  board: Cell[][]
) => {
  board.map((row) => {
    row.map((cell) => {
      cell.isValid = true;
    });
  });

  for (let i = 0; i < queenBoard.length; i++) {
    const [x1, y1] = queenBoard[i];

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
