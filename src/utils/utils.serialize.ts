import { boardColors } from "../constants/constants.board";
import { Cell } from "../types/types.board";

export const encodeBoard = (board: Cell[][]) => {
  const colorMap = new Map(boardColors.map((color, index) => [color, index]));

  let binaryString = "";
  for (let row of board) {
    for (let cell of row) {
      let colorIndex = colorMap.get(cell.color);
      if (colorIndex === undefined) {
        colorIndex = 0; // Default to color index 0 if color is not found
      }
      let valueIndex = cell.value === "Q" ? 1 : 0;
      let encodedCell = (colorIndex << 1) | valueIndex;
      binaryString += encodedCell.toString(2).padStart(4, "0");
    }
  }

  // Convert binary string to base64
  let bytes = [];
  for (let i = 0; i < binaryString.length; i += 8) {
    bytes.push(parseInt(binaryString.slice(i, i + 8), 2));
  }
  let base64String = Buffer.from(new Uint8Array(bytes)).toString("base64");
  return base64String;
};

export const decodeBoard = (base64String: string) => {
  // Convert base64 to binary string
  const bytes = Buffer.from(base64String, "base64");
  let binaryString = "";

  for (let i = 0; i < bytes.length; i++) {
    binaryString += bytes[i].toString(2).padStart(8, "0");
  }

  // Ensure the binary string length is 256 (64 cells * 4 bits)
  if (binaryString.length < 256) {
    binaryString = binaryString.padStart(256, "0");
  }

  const board = [];
  let index = 0;

  for (let i = 0; i < 8; i++) {
    const row = [];
    for (let j = 0; j < 8; j++) {
      const encodedCell = parseInt(binaryString.substr(index, 4), 2);
      index += 4;

      const colorIndex = (encodedCell >> 1) & 0x07;
      const valueIndex = encodedCell & 0x01;

      const value = valueIndex === 1 ? "Q" : "";
      row.push({
        color: boardColors[colorIndex],
        value: value,
        topBorder: 0,
        bottomBorder: 0,
        leftBorder: 0,
        rightBorder: 0,
      });
    }
    board.push(row);
  }

  return board;
};
