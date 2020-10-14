declare type TDataTile = Record<string, boolean | string>
declare type TDataForestObj = {
	tile: TDataTile,
	min?: number,
	max?: number,
}

declare type TDataForest = readonly TDataForestObj[];