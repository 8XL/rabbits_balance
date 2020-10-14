//Подумай, как вернее с обобщением или NumToArrF
declare type TShuffle = <T>(arr: T[]) => T[];
declare type TPercents = (min: number, max: number) => number;
declare type ArrToNumF = <T>(arr: T[]) => number;
declare type VoidToNumF = () => number;
declare type NumToArrF = (num: number) => number[];

// export {TShuffle, TPercents, ArrToNumF, VoidToNumF, NumToArrF};