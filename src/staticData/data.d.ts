declare type TDataTile = string;
declare type TDataForestObj = {
	tile: TDataTile,
	min?: number,
	max?: number,
}
declare type TAnimalsQuantity = Record<string, number>;
declare type TAnimalsDelayes = Record<string, Record<string, number>>;

declare type TDataForest = readonly TDataForestObj[];