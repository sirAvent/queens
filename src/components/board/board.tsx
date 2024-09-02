import { useState, useEffect } from "react";
import { Cell } from "@/types/types.board";
import CellBox from "../cellBox/cellBox";
import { updateInvalidCells } from "@/actions/action.board";

interface BoardProps {
  data: Cell[][];
  onUpdateBoard: (newData: Cell[][]) => void;
}

export default function Board({
  data: initialData,
  onUpdateBoard,
}: BoardProps) {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [clickedValue, setClickedValue] = useState("");
  const [data, setData] = useState<Cell[][]>(initialData);

  function getQCoordinates(cells: Cell[][]): number[][] {
    const coordinates: number[][] = [];
    for (let row = 0; row < cells.length; row++) {
      for (let col = 0; col < cells[row].length; col++) {
        if (cells[row][col].value === "Q") {
          coordinates.push([row, col]);
        }
      }
    }

    return coordinates;
  }

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  useEffect(() => {
    updateInvalidCells(getQCoordinates(data), data);
  }, [data]);

  useEffect(() => {
    const handleMouseDown = () => {
      setIsMouseDown(true);
    };
    const handleMouseUp = () => {
      setIsMouseDown(false);
      setClickedValue("");
    };

    const handleTouchMove = (event: TouchEvent) => {
      setIsMouseDown(true);
      let touch = event.touches[0];
      let element = document.elementFromPoint(touch.clientX, touch.clientY);
      if (element?.classList.contains("cell-box")) {
        const event = new CustomEvent("updateCell", {
          detail: {
            x: element.getAttribute("data-x"),
            y: element.getAttribute("data-y"),
          },
        });
        window.dispatchEvent(event);
      }
    };

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchstart", handleMouseDown);
    document.addEventListener("touchend", handleMouseUp);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchstart", handleMouseDown);
      document.removeEventListener("touchend", handleMouseUp);
    };
  }, []);

  const updateCell = (
    rowIndex: number,
    cellIndex: number,
    newCellValue: string
  ) => {
    const newData = [...data];
    newData[rowIndex][cellIndex].value = newCellValue;
    setData(newData);
    onUpdateBoard(newData);
  };

  return (
    <div className="touch-none flex flex-col items-center justify-center select-none">
      {data.map((row, rowIndex) => (
        <div key={rowIndex} className="flex flex-row">
          {row.map((cell, cellIndex) => (
            <CellBox
              key={cellIndex}
              x={rowIndex}
              y={cellIndex}
              value={cell.value}
              color={cell.color}
              isValid={cell.isValid}
              topBorder={cell.topBorder}
              bottomBorder={cell.bottomBorder}
              leftBorder={cell.leftBorder}
              rightBorder={cell.rightBorder}
              isMouseDown={isMouseDown}
              clickedValue={clickedValue}
              setClickedValue={setClickedValue}
              isClear={clickedValue !== ""}
              onUpdateCell={(newCellValue: string) =>
                updateCell(rowIndex, cellIndex, newCellValue)
              }
            />
          ))}
        </div>
      ))}
    </div>
  );
}
