declare type TDataTile = Record<string, boolean | string>
declare type TDataForestObj = {
	tile: TDataTile,
	min?: number | undefined,
	max?: number | undefined,
}

declare type TDataForest = readonly TDataForestObj[];