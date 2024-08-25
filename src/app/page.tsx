import { getBoard } from "@/utils/utils.board";
import Board from "@/components/board/board";
import { Cell } from "@/types/types.board";
export default function Home() {
  const boardJson = getBoard() as Cell[][];
  
  return (
    <main>
      <Board data={boardJson}/>
      <div>
        {JSON.stringify(boardJson)}
      </div>
    </main>
  );
}
