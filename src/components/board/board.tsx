import { useEffect, useState } from "react";
import { Cell } from "@/types/types.board";
import CellBox from "../cellBox/cellBox";

interface BoardProps {
  data: Cell[][];
}

export default function Board({ data }: BoardProps) {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [clickedValue, setClickedValue] = useState("");

  useEffect(() => {
    const handleMouseDown = () => {
      setIsMouseDown(true);
    };

    const handleMouseUp = () => {
      setIsMouseDown(false);
      setClickedValue("");
    };

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("touchstart", handleMouseDown);
    document.addEventListener("touchend", handleMouseUp);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchstart", handleMouseDown);
      document.removeEventListener("touchend", handleMouseUp);
    };
  }, []);
  return (
    <div className="flex flex-col items-center justify-center select-none">
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
              isMouseDown={isMouseDown}
              clickedValue={clickedValue} 
              setClickedValue={setClickedValue}
              isClear={clickedValue !== ""}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
