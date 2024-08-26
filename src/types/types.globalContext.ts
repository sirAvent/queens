import { Dispatch, SetStateAction } from 'react';
import { Cell } from "./types.board";
export interface GlobalState {
  board: Cell[][];
}

export interface GlobalState {
  board: Cell[][];
  setBoard: Dispatch<SetStateAction<Cell[][]>>;
}
