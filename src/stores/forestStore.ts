import { observable, action, computed } from 'mobx';

import { shuffle, percents } from '../modules/modules';
import { ShuffleF, PercentsF } from '../modules/TModules';
import { dataForest, TDataForest, TTile} from '../staticData';

export type TGetForest = TTile[];
export type THoles = number[];
export type TGetHoles = THoles;
export type TFillForest = any;
export interface TSetDataTiles {
	(arr: TTile[]) : void;
}
export type TAddTiles = (tile: TTile, min: number, max: number) => void;

export interface IForestStoreCtor {
	(): IForestStore
}

export interface IForestStore {
	forest: TTile[];
	getForest: TGetForest;
	holes: THoles;
	getHoles: TGetHoles;
	fillForest: any;
	setDataTiles: TSetDataTiles;
	addTiles: TAddTiles;
}

export default class forestStore implements IForestStore{
	shuffle: ShuffleF;
	percents: PercentsF;
	data: TDataForest;

	constructor(){
			this.data = dataForest;
			this.shuffle = shuffle;
			this.percents = percents;
	}

	@observable
			forest: TTile[] = [];

	@computed get
			getForest() {
					return this.forest
			}

	@observable
			holes = [];

	@computed get
			getHoles(){
					return this.holes
			}

	@action    
			fillForest = () =>{
					for(let el of this.data){
							this.addTiles(el.tile, el.min, el.max);
					}
					this.shuffle(this.forest);
					this.setDataTiles(this.forest);
			}

	@action 
			setDataTiles: TSetDataTiles = (arr) => {
					arr.forEach((tile, i)=>{
							tile.name==='hole'&&this.holes.push(i);
					})
			}
//реши ошибку с never
	@action 
			addTiles: TAddTiles = (tile, min, max) => {
					const length = this.percents(min, max);
					if(this.forest.length < 1){
							this.forest.length = length;
							this.forest.fill(tile);
					} else if(tile.name === 'grass'){
							const end = this.forest.length;
							this.forest.length = 400;
							this.forest.fill(tile, end);
					} else {
							this.forest.length += length;
							this.forest.fill(tile, this.forest.length - length);
					} 
			}  
}
