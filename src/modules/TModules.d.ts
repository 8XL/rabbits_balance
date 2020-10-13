declare type ShuffleF = <T>(arr: T[]) => T[];
declare type PercentsF = (min: number, max: number) => number;
declare type ArrToNumF = <T>(arr: T[]) => number;
declare type VoidToNumF = () => number;
declare type NumToArrF = (num: number) => number[];

// export {ShuffleF, PercentsF, ArrToNumF, VoidToNumF, NumToArrF};