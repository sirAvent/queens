import { useState, useEffect } from "react";
import { Cell } from "@/types/types.board";
import CellBox from "../cellBox/cellBox";
import { findMatchingCoordinate } from "@/utils/utils.board";

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
  const [queenLocations, setQueenLocations] = useState<[number, number][]>([]);

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  useEffect(() => {}, [data]);

  useEffect(() => {
    const handleMouseDown = () => setIsMouseDown(true);
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

  const updateCell = (
    rowIndex: number,
    cellIndex: number,
    newCellValue: string
  ) => {
    const newData = [...data];
    const oldCellValue = newData[rowIndex][cellIndex].value;
    newData[rowIndex][cellIndex].value = newCellValue;
    const cellLocation: [number, number] = [rowIndex, cellIndex];

    setData(newData);
    onUpdateBoard(newData);

    // Update queen locations
    if (newCellValue === "Q") {
      const validateLocation = findMatchingCoordinate(rowIndex, cellIndex, queenLocations);
      if (validateLocation[0] !== -1 || validateLocation[1] !== -1 ) {
        console.log('invalid Queen spot')
      }
      setQueenLocations(prevLocations => {
        if (!prevLocations.some(location => location[0] === rowIndex && location[1] === cellIndex)) {
          return [...prevLocations, cellLocation];
        }
        return prevLocations;
      });
    }

    if (oldCellValue === "Q") {
      // Remove queen location
      setQueenLocations(prevLocations => {
        return prevLocations.filter(
          location => !(location[0] === rowIndex && location[1] === cellIndex)
        );
      });
    }
  };

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
              isInvalidated={false}
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
