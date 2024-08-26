"use client";
import { useState, useEffect } from "react";
import { Cell } from "@/types/types.board";

interface CellBoxProps extends Cell {
  isMouseDown: boolean;
}

export default function CellBox({
  value,
  color,
  topBorder,
  bottomBorder,
  leftBorder,
  rightBorder,
  isMouseDown,
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
    setCellValue(newValue);
  };

  const handleMouseEnter = () => {
    let newValue = "";
    if (isMouseDown) {
      if (cellValue === "") {
        newValue = "X";
      }
      setCellValue(newValue);
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
    >
      <span>{cellValue === "X" ? "\u2715" : cellValue === "Q" ? "♛" : ""}</span>
    </div>
  );
}
