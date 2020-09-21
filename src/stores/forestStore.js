import { observable, action, computed } from 'mobx';

import { shuffle, percents } from './modules';

export default class forestStore{
    constructor(){
        this.data = dataForest;
        this.shuffle = shuffle;
        this.percents = percents;
    }

    @observable
        forest = [];

    @observable
        holes = [];

    @computed get
        getHoles(){
            return this.holes
        }

    @action    
        fillForest = async() =>{
            for(let el of this.data){
                this.addTiles(el.obj, el.min, el.max);
            }
            await this.shuffle(this.forest);
            this.setDataTiles(this.forest);
        }

    @action 
        setDataTiles = (arr) => {
            arr.forEach((el, i)=>{
                el.name==='hole'&&this.holes.push(i);
            })
        }

    @action 
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
        min: 7,
        max: 10
    },
    {
        obj: {
            name: 'swamp',
            rabbit: false,
            wolf: false
        },
        min: 3,
        max: 4
    },
    {
        obj: {
            name: 'mud',
            rabbit: false,
            wolf: false
        },
        min: 3,
        max: 4
    },
    {
        obj: {
            name: 'forest',
            rabbit: false,
            wolf: false
        },
        min: 10,
        max: 15
    },
    {
        obj: {
            name: 'grass',
            rabbit: false,
            wolf: false
        },
    },
]
