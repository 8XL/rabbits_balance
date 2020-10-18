/// <reference path="data.d.ts" />
const dataForest: TDataForest  = [
	{
			tile: 'hole',
			min: 1,
			max: 3
	},
	{
			tile: 'water',
			min: 7,
			max: 10
	},
	{
			tile: 'swamp',
			min: 3,
			max: 4
	},
	{
			tile: 'mud',
			min: 3,
			max: 4
	},
	{
			tile: 'forest',
			min: 10,
			max: 15
	},
	{
			tile: 'grass',
	},
]

const animalsQuantity: TAnimalsQuantity = {
	rabbit: 10,
	fox: 4
}

const animalsDelayes: TAnimalsDelayes = {
	rabbit: {
		water: 3,
		swamp: 3,
		mud: 2,
		forest: 2,
	},
	fox: {
		water: 2,
		swamp: 3,
	}
}

export {dataForest, animalsQuantity, animalsDelayes}