"use client";
import { useState, useEffect } from "react";
import { Cell } from "@/types/types.board";

interface CellBoxProps extends Cell {
  rowInd: number;
  colInd: number;
  isMouseDown: boolean;
  clickedValue: string;
  isClear: boolean;
  setClickedValue: (value: string) => void;
  onUpdateCell: (newValue: string) => void;
}

export default function CellBox({
  value,
  color,
  rowInd,
  colInd,
  topBorder,
  bottomBorder,
  leftBorder,
  rightBorder,
  isMouseDown,
  clickedValue,
  setClickedValue,
  isClear,
  onUpdateCell,
}: CellBoxProps) {
  const [cellValue, setCellValue] = useState(value);

  useEffect(() => {
    if (cellValue === "Q") {
      console.log("Queen at", rowInd, colInd);
    }
  }, [cellValue]);

  const handleClick = () => {
    let newValue = "";
    if (cellValue === "") {
      newValue = "X";
    } else if (cellValue === "X") {
      newValue = "Q";
    }

    setClickedValue(cellValue);
    setCellValue(newValue);
    onUpdateCell(newValue);
  };

  const handleMouseEnter = () => {
    let newValue = "";
    if (isMouseDown) {
      if (!isClear && cellValue === "") {
        newValue = "X";
      }
      if ((isClear && cellValue !== "") || (!isClear && cellValue === "")) {
        setCellValue(newValue);
        onUpdateCell(newValue);
      }
    }
  };

  const handleMouseLeave = () => {
    if (isMouseDown && isClear) {
      setCellValue("");
      onUpdateCell("");
    }
  };

  return (
    <div
      className="flex justify-center items-center border-black h-12 w-12 hover:brightness-125 hover:cursor-pointer select-none"
      style={{
        backgroundColor: color,
        borderTopWidth: topBorder,
        borderBottomWidth: bottomBorder,
        borderLeftWidth: leftBorder,
        borderRightWidth: rightBorder,
      }}
      onMouseDown={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span>{cellValue === "X" ? "\u2715" : cellValue === "Q" ? "♛" : ""}</span>
    </div>
  );
}
