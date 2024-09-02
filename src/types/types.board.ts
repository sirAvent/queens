export type Cell = {
    value: string;
    color: string;
    isValid: boolean;
    topBorder: number;
    bottomBorder: number;
    leftBorder: number;
    rightBorder: number;
}

export type ColorStates = Record<string, boolean>;
