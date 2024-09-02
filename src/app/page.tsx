"use client";
import React, { Suspense, useEffect } from "react";
import { useGlobalState } from "@/context/GlobalContext";
import Board from "@/components/board/board";
import { Cell } from "@/types/types.board";
import { clearBoard, getBoard } from "@/utils/utils.board";
import { useSearchParams } from "next/navigation";
import { decodeBoard, encodeBoard } from "@/utils/utils.serialize";

function HomeContent() {
  const { board, setBoard, isWin, setIsWin } = useGlobalState();
  const boardId = useSearchParams().get("id");
  const idStr = boardId ? decodeURIComponent(boardId) : "";
  const boardData = getBoard(decodeBoard(idStr)) as Cell[][];

  useEffect(() => {
    setBoard(boardData);
  }, [idStr, setBoard]);

  const logBoardData = () => {
    console.log(board);
  };

  const newGame = () => {
    setBoard(getBoard(null));
    setIsWin(false);
  };

  const onClear = () => {
    const clearedBoard = clearBoard(board);
    setBoard(clearedBoard);
  };

  return (
    <main>
      <Board data={board} onUpdateBoard={setBoard} />
      <div>Is Game Won: {isWin ? "yes" : "no"}</div>
      <div>Board ID: {encodeBoard(board)}</div>
      <div>URL Param: {encodeURIComponent(encodeBoard(board))}</div>
      <button
        onClick={logBoardData}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Log Board Data
      </button>
      <button
        onClick={newGame}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        New Game
      </button>
      <button
        onClick={onClear}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Clear Board
      </button>
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
