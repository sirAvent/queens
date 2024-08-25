import { Cell } from "@/types/types.board";
import CellBox from "../cellBox/cellBox";

interface BoardProps {
  data: Cell[][];
}

export default function Board({ data }: BoardProps) {
  return (
    <div className="flex flex-col items-center">
      {data.map((row, rowIndex) => (
        <div key={rowIndex} className="flex flex-row">
          {row.map((cell, cellIndex) => (
            <CellBox
              key={cellIndex}
              value={cell.value}
              color={cell.color}
              topBorder={cell.topBorder}
              bottomBorder={cell.bottomBorder}
              leftBorder={cell.leftBorder}
              rightBorder={cell.rightBorder}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
