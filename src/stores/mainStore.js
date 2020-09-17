import { observable, action, computed, autorun } from 'mobx';

import forestStore from './forestStore'

class mainStore{

    constructor(){
        this.forestStore = new forestStore();
        
        autorun(()=>{
            this.forestStore.fillForest()
        })
    }
};

export default new mainStore();