import { observable, action, computed, autorun } from 'mobx';

import { restrictions, shuffle, randomIndex, factor } from './modules';
import forestStore from './forestStore';
import rabbitStore from './rabbitStore';

class mainStore{

    constructor(){
        this.forestStore = new forestStore();
        this.rabbitStore = new rabbitStore();

        this.restrictions = restrictions;
        this.shuffle = shuffle;
        this.randomIndex = randomIndex;
        this.factor = factor;
        
        autorun(()=>{
            this.forestStore.fillForest();
            this.rabbitStore.fillPopulation();
            this.movementInterval();
        })
    }

    @observable
        movementCounter = 0;

    @action
        movementInterval = () => {
            setInterval(()=>this.intervalActions(), 1000);
        }

    @action 
        intervalActions = async () =>{
            await this.animalMovement(this.rabbitStore.rabbits, this.rabbitStore.setRabbits); // обертка для интервала
            this.controlPopulation(this.rabbitStore.rabbits, this.rabbitStore.addPopulation);
        }

    @action
        animalMovement = async(animals, action) => {
            const newPos = animals.map(animal=>{
                const step = this.setDelay(animal);
                this.shuffle(step);
                const movement = this.randomIndex(step)
                animal.position = animal.hole ? step[movement] : animal.position+= step[movement];
                return animal
            });
            await action(newPos);
        }
    
    @action 
        setDelay = (animal) => {
            const delayData = this.rabbitStore.getDelayRabbits
            if(delayData[animal.tile]){
                if(animal.delayCounter>=0 && animal.delayCounter < delayData[animal.tile]){
                    animal.delayCounter +=1;
                    return [0]
                } else if(animal.delayCounter >=delayData[animal.tile]){
                    animal.delayCounter = 0;
                    return this.restrictions(animal.position)
                }
            } else if(animal.tile === 'hole'){
                animal.hole = !animal.hole;
                if(animal.hole){
                    const arr = [...this.forestStore.getHoles];
                    return arr;    
                } else {
                    return this.restrictions(animal.position);
                }
            } else if(animal.tile === 'grass'){
                return this.restrictions(animal.position)
            }
        }

    @action 
        controlPopulation = (animals, addAnimal) => {
            const positions = [];
            const recurPositions = [];

            animals.forEach(animal=>(animal.tile!=='water' && animal.tile!=='swamp')&&positions.push(animal.position));
            
            for(let i = 0; i < positions.length; i++){
                if(positions.indexOf(positions[i]) !== positions.lastIndexOf(positions[i])){
                    recurPositions.push(positions[i]);
                }
            }
            const getCoitusPos = Array.from(new Set(recurPositions));
            getCoitusPos.map(pos=>{
                const percent = this.factor();
                percent<=10 && addAnimal(pos);
            });
        }
};

export default new mainStore();