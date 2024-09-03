import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useGlobalState } from "@/context/GlobalContext";
import { formatTime } from "@/utils/utils.format";

interface StopwatchProps {
  isRunning: boolean;
  setIsRunning: (isRunning: boolean) => void;
}

export interface StopwatchRef {
  reset: () => void;
  time: number;
}

const Stopwatch = forwardRef<StopwatchRef, StopwatchProps>(
  ({ isRunning, setIsRunning }, ref) => {
    const [time, setTime] = useState<number>(0);
    const { isWin } = useGlobalState();

    useEffect(() => {
      let interval: NodeJS.Timeout | undefined;
      if (isRunning) {
        interval = setInterval(() => {
          setTime((prevTime) => prevTime + 10);
        }, 10);
      } else if (!isRunning && interval) {
        clearInterval(interval);
      }
      return () => {
        if (interval) {
          clearInterval(interval);
        }
      };
    }, [isRunning]);

    useEffect(() => {
      if (isWin) {
        setIsRunning(false);
      } else {
        setIsRunning(true);
      }
    }, [isWin, setIsRunning]);

    const handleReset = () => {
      setTime(0);
    };

    // Expose the reset method and time via ref
    useImperativeHandle(ref, () => ({
      reset: handleReset,
      time: time,
    }));

    return (
      <div>
        <div>{formatTime(time)}</div>
      </div>
    );
  }
);

// Set display name for better debugging
Stopwatch.displayName = "Stopwatch";

export default Stopwatch;
