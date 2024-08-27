"use client";
import React, { Suspense, useEffect } from "react";
import { useGlobalState } from "@/context/GlobalContext";
import Board from "@/components/board/board";
import { Cell } from "@/types/types.board";
import { getBoard } from "@/utils/utils.board";
import { useSearchParams } from "next/navigation";
import { decodeBoard, encodeBoard } from "@/utils/utils.serialize";

function HomeContent() {
  const { board, setBoard } = useGlobalState();
  const boardId = useSearchParams().get("id");
  const idStr = boardId ? decodeURIComponent(boardId) : "";

  useEffect(() => {
    const boardData = getBoard(decodeBoard(idStr)) as Cell[][];
    setBoard(boardData);
  }, [idStr, setBoard]);

  const logBoardData = () => {
    console.log(board);
  };

  return (
    <main>
      <Board data={board} onUpdateBoard={setBoard} />
      <div>Board ID: {encodeBoard(board)}</div>
      <div>URL Param: {encodeURIComponent(encodeBoard(board))}</div>
      <button
        onClick={logBoardData}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Log Board Data
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
