import { observable, action, computed } from 'mobx';
import mainStore from './mainStore';

export default class tableStore {

    @observable
        table = {
            score: mainStore.getMovementCounter,
            rabbits: mainStore.rabbitStore.getRabbits.length,
            foxes: 0,
            speed: mainStore.getIntervalSpeed,
        }
    
    @computed get
        getTable(){
            return this.table
        }
    
    @action
        setTable = (name) => {
            const key = [...Object.keys(name)];
            this.table[key] = name[key];
            console.log(name[key], key)
        }
}