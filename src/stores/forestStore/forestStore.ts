/// <reference path="forestStore.d.ts" />
//я чуть не заплакал, пока разбирался...в ведь у меня борода даже есть
import { observable, action, computed } from 'mobx';

import { shuffle, percents } from '../../modules/modules';
import { dataForest } from '../../staticData/data';

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
			holes: THoles = [];

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

	@action 
			addTiles: TAddTiles = (tile, min, max) => {
					const length = this.percents(min!, max!);
					if(tile.name === 'grass'){
						const end = this.forest.length;
						this.forest.length = 400;
						this.forest.fill(tile, end);
					}else if(this.forest.length < 1){
							this.forest.length = length;
							this.forest.fill(tile);
					}  else {
							this.forest.length += length;
							this.forest.fill(tile, this.forest.length - length);
					} 
			}  
}
