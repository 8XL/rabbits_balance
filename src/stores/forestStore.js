import { observable, action } from 'mobx';

import { shuffle, percents } from './modules';

export default class forestStore{
    constructor(){
        this.shuffle = shuffle;
        this.percents = percents;
    }

    @observable
        forest = [];

    @action    
        fillForest = async() =>{
            for(let el of dataForest){
                this.addTiles(el.obj, el.min, el.max)
            }
            await this.shuffle(this.forest)
        }

    addTiles = (obj, min, max) => {
        const length = this.percents(min, max);
        if(this.forest.length < 1){
            this.forest.length = length;
            this.forest.fill(obj);
        } else if(obj.name === 'grass'){
            const end = this.forest.length;
            this.forest.length = 400;
            this.forest.fill(obj, end);
        } else {
            this.forest.length += length;
            this.forest.fill(obj, this.forest.length - length);
        } 
    }
    
    
}

const dataForest = [
    {
        obj: {
            name: 'hole',
            rabbit: false,
            wolf: false
        },
        min: 1,
        max: 3
    },
    {
        obj: {
            name: 'water',
            rabbit: false,
            wolf: false
        },
        min: 10,
        max: 13
    },
    {
        obj: {
            name: 'swamp',
            rabbit: false,
            wolf: false
        },
        min: 4,
        max: 5
    },
    {
        obj: {
            name: 'mud',
            rabbit: false,
            wolf: false
        },
        min: 8,
        max: 10
    },
    {
        obj: {
            name: 'forest',
            rabbit: false,
            wolf: false
        },
        min: 15,
        max: 20
    },
    {
        obj: {
            name: 'grass',
            rabbit: false,
            wolf: false
        },
    },
]
