/// <reference path="rabbitStore.d.ts" />

import { observable, action, reaction, computed, autorun } from 'mobx';

import { shuffle, timestamp } from '../../modules/modules';
import mainStore from '../mainStore/mainStore';

export default class rabbitStore implements IRabbitStore{
	shuffle: TShuffle
	timestamp: VoidToNumF

  constructor(){
    this.shuffle = shuffle;
		this.timestamp = timestamp;
		
		autorun(()=>{
			this.fillPopulation(this.rabbitsCount);
		});

		reaction(
			()=> this.getRabbitsCount,
			count=>{
				this.rabbitsCount = count;
				mainStore.tableStore.setPanel({rabbits: count})
			}
		);
  }

  @observable
    rabbits: TRabbits = [];
    
  @computed get 
    getRabbits():TRabbits{
      return this.rabbits
		}
	
	@observable
    rabbitsCount: number = 10;

	@computed get 
    getRabbitsCount(): number {
      return this.rabbits.length
    }

  @observable
    readonly delayForRabbits: TDelayForRabbits = {
      water: 3,
      swamp: 3,
      mud: 2,
      forest: 2,
    }

  @action
    fillPopulation: TFillPopulation = (animals) => {
      for(let i = 1; i<=animals; i++){
				this.addPopulation()
      }
    }
    
  @action
    addPopulation: TAddPopulation = (pos?) => {   
      const randomStartPosition: number = Math.floor(Math.random() * (390 - 145 + 1) + 145);
      const position: number = pos ? pos : randomStartPosition;
      const rabbit:TRabbit = {
        name: 'rabbit',
        position: position,
        tile: '',
        delayCounter: 0,
        hole: false,
        id: this.timestamp(),
        memory: []
      };
			this.rabbits = [...this.rabbits, rabbit];
    }
    
	@action
    setRabbits:TSetRabbits = (rabbits) => {
        this.rabbits = rabbits
    }
    
  @action
    setTile:TSetTile = (i, tile) => {
        this.rabbits[i].tile = tile;
    }
}