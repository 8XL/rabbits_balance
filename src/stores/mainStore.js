import { observable, action, computed, autorun } from 'mobx';

import { restrictions, shuffle, randomIndex } from './modules';
import forestStore from './forestStore';
import rabbitStore from './rabbitStore';

class mainStore{

    constructor(){
        this.forestStore = new forestStore();
        this.rabbitStore = new rabbitStore();

        this.restrictions = restrictions;
        this.shuffle = shuffle;
        this.randomIndex = randomIndex;
        
        autorun(()=>{
            this.forestStore.fillForest();
            this.rabbitStore.fillPopulation();
        })
    }

    @action
        animalMovement = async(animals, action) => {
            const newPos = animals.map(el=>{
                const step = this.restrictions(el);
                this.shuffle(step);
                const movement = this.randomIndex(step)
                el+=step[movement];
                return el
            });
            await action(newPos);
        }
};

export default new mainStore();