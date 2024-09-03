"use client";
import { useState, useEffect } from "react";
import { Cell } from "@/types/types.board";

interface CellBoxProps extends Cell {
  x: number;
  y: number;
  isMouseDown: boolean;
  isAnimated: boolean;
  clickedValue: string;
  isValid: boolean;
  isClear: boolean;
  setClickedValue: (value: string) => void;
  onUpdateCell: (newValue: string) => void;
}

export default function CellBox({
  x,
  y,
  value,
  color,
  isValid,
  isAnimated,
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
    const handleCustomEvent = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail.x == x && customEvent.detail.y == y) {
        let newValue = isClear ? "" : "X";
        if ((isClear && cellValue !== "") || (!isClear && cellValue === "")) {
          setCellValue(newValue);
          onUpdateCell(newValue);
        }
      }
    };

    window.addEventListener("updateCell", handleCustomEvent);

    return () => {
      window.removeEventListener("updateCell", handleCustomEvent);
    };
  }, [clickedValue, onUpdateCell, x, y, cellValue]);

  useEffect(() => {
    setCellValue(value);
  }, [value]);

  const handleClick = () => {
    let newValue = cellValue === "" ? "X" : cellValue === "X" ? "Q" : "";
    setClickedValue(cellValue);
    setCellValue(newValue);
    onUpdateCell(newValue);
  };

  const handleTouch = () => {
    setClickedValue(cellValue);
  };

  const handleTouchEnd = () => {
    setClickedValue("");
  };

  const handleMouseEnter = () => {
    if (isMouseDown) {
      let newValue = isClear ? "" : "X";

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

  const cellColor: string = !isValid
    ? `linear-gradient(45deg, ${color} 20%, red 23%, ${color} 26%, ${color} 47%, red 50%, ${color} 53%, ${color} 72%, red 75%, ${color} 78%)`
    : `${color}`;

  const keyframes = `
    @keyframes scaleUpDown {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.5);
      }
      100% {
        transform: scale(1);
      }
    }
  `;

  // Compute the delay based on the x prop
  const animationDelay = `${x / 3 + 0.3}s`;

  const spanAnimationStyles =
    isAnimated && cellValue === "Q"
      ? {
          animation: `scaleUpDown 1.3s linear`,
          animationDelay: animationDelay,
        }
      : {};

  return (
    <div
      data-x={x}
      data-y={y}
      className={`${
        cellValue === "Q" && "text-[26px] font-bold"
      } cell-box flex justify-center items-center border-black h-12 w-12 hover:brightness-125 hover:cursor-pointer select-none`}
      style={{
        color: "black",
        background: cellColor,
        borderTopWidth: topBorder,
        borderBottomWidth: bottomBorder,
        borderLeftWidth: leftBorder,
        borderRightWidth: rightBorder,
      }}
      onMouseDown={handleClick}
      onTouchStart={handleTouch}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <style>{keyframes}</style>
      <span style={spanAnimationStyles}>
        {cellValue === "X" ? (
          "\u2715"
        ) : cellValue === "Q" ? (
          <svg
            fill="currentColor"
            height="20px"
            width="20px"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 282.568 282.568"
          >
            <path
              d="M217.608,258.075c0,4.142-3.358,7.5-7.5,7.5h-139c-4.142,0-7.5-3.358-7.5-7.5v-16c0-4.142,3.358-7.5,7.5-7.5h139
    c4.142,0,7.5,3.358,7.5,7.5V258.075z M88.721,46.435c8.117,0,14.721-6.604,14.721-14.721s-6.604-14.721-14.721-14.721
    S74,23.597,74,31.714S80.604,46.435,88.721,46.435z M193.721,46.435c8.117,0,14.721-6.604,14.721-14.721
    s-6.604-14.721-14.721-14.721S179,23.597,179,31.714S185.604,46.435,193.721,46.435z M267.721,35.866
    c-8.188,0-14.848,6.66-14.848,14.848s6.66,14.848,14.848,14.848s14.848-6.66,14.848-14.848S275.908,35.866,267.721,35.866z
     M29.441,49.714c0-8.117-6.604-14.721-14.721-14.721S0,41.597,0,49.714s6.604,14.721,14.721,14.721S29.441,57.831,29.441,49.714z
     M259.732,69.983c-3.39-1.733-7.542-0.653-9.656,2.514l-52.367,78.486l-0.394-90.936c-0.016-3.479-2.419-6.489-5.808-7.274
    c-3.387-0.784-6.871,0.862-8.414,3.979l-42.279,85.426l-42.277-85.41c-1.542-3.117-5.032-4.765-8.414-3.979
    c-3.389,0.785-5.793,3.796-5.808,7.274l-0.394,90.951L31.555,72.497c-2.111-3.167-6.264-4.251-9.655-2.516
    c-3.391,1.735-4.942,5.735-3.609,9.303l49.5,132.417c1.096,2.932,3.896,4.874,7.025,4.874h132c3.129,0,5.93-1.942,7.025-4.874
    l49.5-132.415C264.674,75.719,263.123,71.719,259.732,69.983z"
            />
          </svg>
        ) : (
          ""
        )}
      </span>
    </div>
  );
}
