export type Td = {
	name: string,
	rabbit: boolean,
	wolf: boolean,
}

export type TTile = Record<string, boolean | string>

export type TForestObj = {
	tile: TTile,
	min?: number,
	max?: number,
}

export type TDataForest = TForestObj[];
export const dataForest: TDataForest  = [
	{
			tile: {
					name: 'hole',
					rabbit: false,
					wolf: false
			},
			min: 1,
			max: 3
	},
	{
			tile: {
					name: 'water',
					rabbit: false,
					wolf: false
			},
			min: 7,
			max: 10
	},
	{
			tile: {
					name: 'swamp',
					rabbit: false,
					wolf: false
			},
			min: 3,
			max: 4
	},
	{
			tile: {
					name: 'mud',
					rabbit: false,
					wolf: false
			},
			min: 3,
			max: 4
	},
	{
			tile: {
					name: 'forest',
					rabbit: false,
					wolf: false
			},
			min: 10,
			max: 15
	},
	{
			tile: {
					name: 'grass',
					rabbit: false,
					wolf: false
			},
	},
]
