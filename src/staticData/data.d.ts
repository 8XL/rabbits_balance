declare type TDataTile = string;
declare type TDataForestObj = {
	tile: TDataTile,
	min?: number,
	max?: number,
}
declare type TDelays = Record<string, number>;
declare type TAnimalsDelayes = Record<string, number>;

declare type TAnimalsDetails = Record<string, Record<string, TDelays | number>>

declare type TDataForest = readonly TDataForestObj[];