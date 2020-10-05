import { observable, action, computed, autorun, reaction } from 'mobx';

import { restrictions, shuffle, randomIndex, factor } from './modules';
import forestStore from './forestStore';
import rabbitStore from './rabbitStore';
import tableStore from './tableStore';

class mainStore{

    constructor(){
        this.forestStore = new forestStore();
        this.rabbitStore = new rabbitStore();
        this.tableStore = new tableStore();

        this.restrictions = restrictions;
        this.shuffle = shuffle;
        this.randomIndex = randomIndex;
        this.factor = factor;
        
        autorun(()=>{
            this.forestStore.fillForest();
            this.rabbitStore.fillPopulation();
            this.movementInterval();
        })

        reaction(
            ()=> this.getMovementCounter,
            score=>{
               this.tableStore.setTable({score: score})
            }
        )
        
        reaction(
            ()=> this.rabbitStore.getRabbitsCount,
            rabbits=>{
                this.tableStore.setTable({rabbits: rabbits})
            }
        )

        reaction(
            ()=> this.getIntervalSpeed,
            sec=>{
                this.tableStore.setTable({speed: sec})
            }
        )
    }

    @observable
        movementCounter = 0;
    
    @computed get
        getMovementCounter(){
            return this.movementCounter
        }
    
    @observable
        intervalSpeed = 10

    @computed get
        getIntervalSpeed(){
            return this.intervalSpeed
        }

    @action
        changeInterval = (sec) => {
            this.intervalSpeed += sec;
        }
//============================ Экшены внутри интервала
    @action 
        intervalActions = async () =>{ // обертка для интервала
            await this.animalMovement(this.rabbitStore.rabbits, this.rabbitStore.setRabbits); 
            this.controlPopulation(this.rabbitStore.rabbits, this.rabbitStore.addPopulation);

            this.movementCounter +=1;
        }
//============================ Блок движения животных
    @action
        movementInterval = () => {
            setInterval(()=>this.intervalActions(), this.intervalSpeed * 1000);
        }

    @action
        animalMovement = async(animals, action) => {
            const newPos = animals.map(animal=>{
                const step = this.setDelay(animal);
                this.shuffle(step);
                const movement = step.length > 1 ? this.animalMemory(animal, step) : 0;
                animal.position = animal.hole ? movement : animal.position += movement;
                return animal
            });
            await action(newPos);
        }

    @action
        animalMemory = (animal, step) => {
            const cloneStep = step;
            let movement = this.randomIndex(cloneStep);
            if(animal.memory.length>0){
                for(let i=0; i<animal.memory.length; i++){
                //интеллект кролика в среднем равен 0.4 EQ, значит мы предполагаем
                //что кролик может пользоваться своим ителлектом с вероятностью в 
                //20% ))))))
                    if(this.factor()<=20 && animal.position + cloneStep[movement] === animal.memory[i]){
                        cloneStep.splice(movement, 1);
                        movement = this.randomIndex(cloneStep);
                        return cloneStep[movement]
                    }
                    return cloneStep[movement]
                }
            }
            return cloneStep[movement]
        }
    
    @action 
        setDelay = (animal) => {
            const delayData = this.rabbitStore.getDelayRabbits;

            if(delayData[animal.tile]){
                if(animal.delayCounter>=0 && animal.delayCounter < delayData[animal.tile]){
                    animal.delayCounter +=1;
                    return [0]
                } else if(animal.delayCounter >= delayData[animal.tile]){
                    animal.delayCounter = 0;
                    //с вероятностью в 15 процентов животное может запомнить замедляющий тайл 
                    //при выходе из него и ограничеваем память кролика в 20 элементов
                    if(this.factor() <= 15){
                        animal.memory.length > 20 && animal.memory.splice(0, animal.memory.length - 20);
                        animal.memory.push(animal.position);
                    }
                    return this.restrictions(animal.position)
                }
            } else if(animal.name==='rabbit' && animal.tile === 'hole'){
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
//============================ Контроль популяции
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