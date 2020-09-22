import { observable, action, computed, autorun } from 'mobx';

import { shuffle, timestamp } from './modules';
import mainStore from './mainStore';

export default class rabbitStore {
    constructor(){
        this.shuffle = shuffle;
        this.timestamp = timestamp;
    }

    @observable
        rabbits = [];
    
    @computed get 
        getRabbits(){
            return this.rabbits
        }

    @observable
        delayForRabbits = {
            water: 3,
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
                this.addPopulation()
            }
            console.log(this.rabbits)
        }
    
    @action
        addPopulation = (pos) => {   
            const randomStartPosition = Math.floor(Math.random() * (390 - 145 + 1) + 145);
            const position = pos ? pos : randomStartPosition;
            const rabbit = {
                name: 'rabbit',
                position: position,
                tile: '',
                delayCounter: 0,
                hole: false,
                id: this.timestamp()
            }
            this.rabbits = [...this.rabbits, rabbit];
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