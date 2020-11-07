/// <reference path="data.d.ts" />
import { restrictions, shuffle, randomIndex, factor, timestamp } from '../modules/modules';
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
		side:{
			min: 175,
			max: 225,
		},
		quantity: 10,
		intellect: 12,
		memory: 10,
		reproduction: 15,
	},
	fox:{
		delayes:{
			hole: 5,
			forest: 3,
			water: 2,
			swamp: 2,
		},
		side:{
			min: 100,
			max: 300,
		},
		huntingFactor:{
			hole: 40,
			forest: 30,
			mud: 20,
			grass: 10,
			water: 5,
		},
		quantity: 8,
		intellect: 30,
		memory: 15,
		reproduction: 7,
	}
}

const animalsTemplate: {[name: string]: IFox | IRabbit} = {
	rabbit: {
		name: 'rabbit',
    position: 0,
    tile: '',
    delayCounter: 0,
    hole: false,
    id: 0,
    memory: []
	},
	fox:{
		name: 'fox',
		position: 0,
		tile: '',
		delayCounter: 0,
		hunting: null,
		id: 0,
		memory: []
	}
}

export {dataForest, animalsDetails, animalsTemplate}