"use client";
import { useState, useEffect } from "react";
import { Cell } from "@/types/types.board";

interface CellBoxProps extends Cell {
  isMouseDown: boolean;
  clickedValue: string;
  isClear: boolean;
  setClickedValue: (value: string) => void;
}

export default function CellBox({
  value,
  color,
  topBorder,
  bottomBorder,
  leftBorder,
  rightBorder,
  isMouseDown,
  clickedValue,
  setClickedValue,
  isClear,
}: CellBoxProps) {
  const [cellValue, setCellValue] = useState("");

  useEffect(() => {
    if (cellValue === "Q") {
      console.log("Cell value changed to Q");
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
  };

  const handleMouseEnter = () => {
    console.log("Hovering over:", cellValue);
    let newValue = "";
    if (isMouseDown) {
      if (!isClear && cellValue === "") {
        newValue = "X";
      }
      if ((isClear && cellValue !== "") || (!isClear && cellValue === "")) {
        setCellValue(newValue);
      }
    }
  };

  const handleMouseLeave = () => {
    if (isMouseDown && isClear) {
      setCellValue("")
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
