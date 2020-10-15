declare type TDataTile = string;
declare type TDataForestObj = {
	tile: TDataTile,
	min?: number,
	max?: number,
}

declare type TDataForest = readonly TDataForestObj[];