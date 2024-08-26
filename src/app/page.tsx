"use client"
import { useEffect } from "react";
import { useGlobalState } from "@/context/GlobalContext";
import Board from "@/components/board/board";
import { Cell } from "@/types/types.board";
import { getBoard } from "@/utils/utils.board";
import { useSearchParams } from 'next/navigation';
import { decodeBoard } from "@/utils/utils.serialize";

export default function Home() {
  const { board, setBoard } = useGlobalState();
  const boardId = useSearchParams().get('id');
  const idStr = boardId ? decodeURIComponent(boardId) : '';

  useEffect(() => {
    const boardData = getBoard(decodeBoard(idStr)) as Cell[][];
    setBoard(boardData);
  }, [setBoard]);

  return (
    <main>
      <Board data={board} />
      <div>{boardId}</div>
      <div>{JSON.stringify(board)}</div>
    </main>
  );
}
