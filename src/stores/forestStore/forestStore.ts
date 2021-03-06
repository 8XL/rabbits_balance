/// <reference path="forestStore.d.ts" />
//я чуть не заплакал, пока разбирался...в ведь у меня борода даже есть
import { observable, action, computed, autorun } from 'mobx';

import { shuffle, percents } from '../../modules/modules';
import { dataForest } from '../../staticData/data';

export default class forestStore implements IForestStore{
	shuffle: TShuffle;
	percents: TPercents;
	data: TDataForest;

	constructor(){
		this.data = dataForest;
		this.shuffle = shuffle;
		this.percents = percents;

		autorun(()=>{
			this.fillForest();
		});
	}

	@observable
			forest: TDataTile[] = [];

	@computed get
			getForest(): TDataTile[] {
					return this.forest
			}

	@observable
			holes:number[] = [];

	@computed get
			getHoles():number[] {
					return this.holes
			}

	@action    
		fillForest = ():void =>{
			for(let el of this.data){
				this.addTiles(el);
			}
		}

	@action 
		addTiles: TAddTiles = (el) => {
			const length = this.percents(el.min!, el.max!);
			if(el.tile === 'grass'){
				const end = this.forest.length;
				this.forest.length = 400;
				this.forest.fill(el.tile, end);
				this.shuffle(this.forest);
				this.setDataTiles(this.forest);
			}else if(this.forest.length < 1){
				this.forest.length = length;
				this.forest.fill(el.tile);
			} else {
				this.forest.length += length;
				this.forest.fill(el.tile, this.forest.length - length);
			} 
		}
	
	@action 
		setDataTiles: TSetDataTiles = (arr) => {
			let holes: number[] = []
			arr.forEach((tile, i)=>{
				tile==='hole'&&holes.push(i);
			})
			this.holes = holes;
		}
}
