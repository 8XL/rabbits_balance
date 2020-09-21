import { observable, action, computed, autorun } from 'mobx';

import { shuffle } from './modules';
import mainStore from './mainStore';

export default class rabbitStore {
    constructor(){
        this.shuffle = shuffle;
    }

    @observable
        rabbits = [];
    
    @computed get 
        getRabbits(){
            return this.rabbits
        }

    @observable
        delayForRabbits = {
            water: 2,
            swamp: 3,
            mud: 2,
            forest: 2,
        }

    @computed get
        getDelayRabbits(){
            return this.delayForRabbits
        }

    @observable
        rabbitsCount = 10;

    @action
        fillPopulation = () => {
            for(let i = 0; i<this.rabbitsCount; i++){
                const randomStartPosition = Math.floor(Math.random() * (390 - 340 + 1) + 340);
                const rabbit = {
                    name: 'rabbit',
                    position: randomStartPosition,
                    tile: '',
                    delayCounter: 0,
                    hole: false,
                }
                this.rabbits = [...this.rabbits, rabbit];
            }
        }

    @action
        rabbitMovement = () => {
            mainStore.animalMovement(this.rabbits, this.setRabbits)
        }
    
    @action
        setRabbits = (rabbits) => {
            this.rabbits = rabbits
        }
    
    @action
        setTile = (i, tile) => {
            this.rabbits[i].tile = tile;
        }
}