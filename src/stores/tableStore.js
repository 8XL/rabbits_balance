import { observable, action, computed } from 'mobx';
import mainStore from './mainStore';

export default class tableStore {
    @observable
        panel = {
            score: mainStore.getMovementCounter,
            rabbits: mainStore.rabbitStore.getRabbitsCount,
            foxes: 0,
            speed: mainStore.getIntervalSpeed,
        }
    
    @computed get
        getPanel(){
            return this.panel
        }
    
    @action
        setPanel = (name) => {
            const key = Object.keys(name);
            this.panel[key] = name[key];
        }
}