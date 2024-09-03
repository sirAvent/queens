import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useGlobalState } from "@/context/GlobalContext";

interface StopwatchProps {
  isRunning: boolean;
  setIsRunning: (isRunning: boolean) => void;
}

export interface StopwatchRef {
  reset: () => void;
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
      }
    }, [isWin, setIsRunning]);

    const handleReset = () => {
      setTime(0);
    };

    // Expose the reset method via ref
    useImperativeHandle(ref, () => ({
      reset: handleReset,
    }));

    const formatTime = (time: number): string => {
      const getSeconds = `0${Math.floor((time / 1000) % 60)}`.slice(-2);
      const getMinutes = `${Math.floor((time / 60000) % 60)}`.slice(-2);

      return `${getMinutes}:${getSeconds}`;
    };

    return (
      <div>
        <div>{formatTime(time)}</div>
      </div>
    );
  }
);

export default Stopwatch;
