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

const animalsDetails: TAnimalsDetails = {
	rabbit:{
		delayes:{
			water: 3,
			swamp: 3,
			mud: 2,
			forest: 2,
		},
		quantity: 10,
		intellect: 15,
		memory: 10,
		reproduction: 20,
	},
	fox:{
		delayes:{
			water: 2,
			swamp: 3,
		},
		quantity: 4,
		intellect: 30,
		memory: 15,
		reproduction: 7,
	}
}

export {dataForest, animalsDetails}