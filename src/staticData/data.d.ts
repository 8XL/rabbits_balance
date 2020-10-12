declare type Td = {
	name: string,
	rabbit: boolean,
	wolf: boolean,
}

declare type TTile = Record<string, boolean | string>

declare type TForestObj = {
	tile: TTile,
	min?: number | undefined,
	max?: number | undefined,
}

declare type TDataForest = TForestObj[];