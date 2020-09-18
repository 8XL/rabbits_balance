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
        rabbitsCount = 10;

    @action
        fillPopulation = () => {
            for(let i = 0; i<this.rabbitsCount; i++){
                const rabbit = Math.floor(Math.random() * (390 - 340 + 1) + 340)
                this.rabbits = [...this.rabbits, rabbit];
            }
        }

    @action
        rabbitMovement = () => {
            setInterval(()=>mainStore.animalMovement(this.rabbits, this.setRabbits), 1000)
        }
    
    @action
        setRabbits = (rabbits) => {
            this.rabbits = rabbits
        }
}