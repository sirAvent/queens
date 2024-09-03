"use client";
import React, { Suspense, useEffect, useState, useRef } from "react";
import { useGlobalState } from "@/context/GlobalContext";
import Board from "@/components/board/board";
import { Cell } from "@/types/types.board";
import { clearBoard, getBoard } from "@/utils/utils.board";
import { useSearchParams } from "next/navigation";
import { decodeBoard, encodeBoard } from "@/utils/utils.serialize";
import Stopwatch, { StopwatchRef } from "@/components/stopwatch/stopwatch";

function HomeContent() {
  const { board, setBoard, isWin, setIsWin, isStart, setIsStart } =
    useGlobalState();
  const boardId = useSearchParams().get("id");
  const idStr = boardId ? decodeURIComponent(boardId) : "";
  const [boardData, setBoardData] = useState<Cell[][]>(
    getBoard(decodeBoard(idStr))
  );

  const [isRunning, setIsRunning] = useState<boolean>(false);
  const stopwatchRef = useRef<StopwatchRef>(null);

  useEffect(() => {
    const data = getBoard(decodeBoard(idStr));
    setBoardData(data);
    setBoard(data);
  }, [idStr, setBoard]);

  useEffect(() => {
    setBoard(boardData);
  }, [boardData, setBoard]);

  const newGame = () => {
    setBoard(getBoard(null));
    setIsWin(false);
    if (stopwatchRef.current) {
      stopwatchRef.current.reset();
    }
    setIsStart(true);
  };

  const onClear = () => {
    const clearedBoard = clearBoard(board);
    setBoard(clearedBoard);
  };

  const onStart = () => {
    setIsStart(true);
    setIsRunning(true);
  };

  return (
    <main className={`${!isStart && "justify-center"} flex flex-col h-svh`}>
      <div className="self-center">
        <div className={`${!isStart && "hidden"} mt-20`}>
          <Board data={board} onUpdateBoard={setBoard} />
        </div>
        <button
          className={`${
            isStart && "hidden"
          } text-xl border border-foreground px-8 py-2 rounded-full`}
          onClick={onStart}
        >
          Play
        </button>
      </div>

      <div className="absolute top-0 w-svw webkit-center">
        {/* <div>Board ID: {encodeBoard(board)}</div>
        <div>URL Param: {encodeURIComponent(encodeBoard(board))}</div> */}
        <div className="flex flex-row items-center justify-between self-center text-lg px-4 pt-4 max-w-lg">
          <Stopwatch
            isRunning={isRunning}
            setIsRunning={setIsRunning}
            ref={stopwatchRef}
          />
          <button
            onClick={onClear}
            className="px-5 py-1.5 border border-foreground rounded-full"
          >
            Clear
          </button>
        </div>
      </div>
      <div className="absolute bottom-0 w-svw webkit-center p-4">
        <button
          onClick={newGame}
          className="border border-foreground px-5 py-3 rounded-full"
        >
          New Game
        </button>
      </div>
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
