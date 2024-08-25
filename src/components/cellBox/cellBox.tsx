"use client";
import { Cell } from "@/types/types.board";
import { useState } from "react";

export default function CellBox({
  value,
  color,
  topBorder,
  bottomBorder,
  leftBorder,
  rightBorder,
}: Cell) {
  const [cellValue, setCellValue] = useState("");
  const handleClick = () => {
    let newValue = "";
    if (cellValue === "") {
      newValue = "X";
    } else if (cellValue === "X") {
      newValue = "Q";
    }
    setCellValue(newValue);
  };

  return (
    <div
      className="border-black h-12 w-12 hover:brightness-125 hover:cursor-pointer"
      style={{
        backgroundColor: color,
        borderTopWidth: topBorder,
        borderBottomWidth: bottomBorder,
        borderLeftWidth: leftBorder,
        borderRightWidth: rightBorder,
      }}
      onClick={handleClick}
    >
      {cellValue}
    </div>
  );
}
