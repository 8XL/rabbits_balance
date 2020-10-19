declare type TDataTile = string;
declare type TDataForestObj = {
	tile: TDataTile,
	min?: number,
	max?: number,
}
declare type TDataForest = readonly TDataForestObj[];

declare type TAnimalDetails = {
	delayes: Record<string, number>,
	side: Record<string, number>,
	huntingFactor?: Record<string, number>,
	quantity: number,
	intellect: number,
	memory: number,
	reproduction: number,
}

declare type TAnimalsDetails = {
	[name: string]:TAnimalDetails,
}