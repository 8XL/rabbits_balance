/// <reference path='mainStore.d.ts'/>
import { observable, action, computed, autorun, reaction } from 'mobx';

import { restrictions, shuffle, randomIndex, factor } from '../../modules/modules';
import forestStore from '../forestStore/forestStore';
import rabbitStore from '../rabbitStore/rabbitStore';
import tableStore from '../tableStore/tableStore';

class mainStore implements IMainStore{
	forestStore: IForestStore;
	rabbitStore: IRabbitStore;
	tableStore: ITableStore;
	
	restrictions: NumToArrF;
	shuffle: TShuffle;
	randomIndex: ArrToNumF;
    factor: VoidToNumF;
    
  constructor(){
    this.forestStore = new forestStore();
    this.rabbitStore = new rabbitStore();
	this.tableStore = new tableStore();
		
    this.restrictions = restrictions;
    this.shuffle = shuffle;
    this.randomIndex = randomIndex;
    this.factor = factor;
    // промис сюда вот и там ретёрны
    autorun(()=>{
      this.forestStore.fillForest();
      this.interval()
		})
			
    reaction(
      ()=> this.getMovementCounter,
      score=>
        this.tableStore.setPanel({score: score})
	)
		
    reaction(
      ()=>this.getIntervalSpeed,
      sec=>
        this.tableStore.setPanel({speed: sec})
    )
  }

    @observable
        movementCounter: number = 0;
    
    @computed get
        getMovementCounter(): number{
            return this.movementCounter
        }

//============================ Время интервала(скорость шага)    
    @observable
        intervalSpeed: number = 5;

    @computed get
        getIntervalSpeed(): number{
            return this.intervalSpeed
				}
				
    @action
        changeInterval = (sec: number) =>{
            this.intervalSpeed = sec;
        }
//============================ Экшены внутри интервала
    @action 
        intervalActions = () =>{ // обертка для интервала
            this.animalMovement(this.rabbitStore.rabbits, this.rabbitStore.setRabbits); 
            this.restrictPopulation(this.rabbitStore.rabbits, this.rabbitStore.addPopulation);

            this.movementCounter +=1;
        }

    @action 
        interval = ():void =>{
            setTimeout(() => {
                this.intervalActions();
                setTimeout(this.interval, this.intervalSpeed * 800)
            }, this.intervalSpeed * 800);
       }
//============================ Блок движения животных

    @action
        animalMovement: TAnimalMovement = (animals, action) => {
            const newPos: TRabbits =  animals.map(animal=>{
                const delay = this.setDelay(animal)
                const steps = this.shuffle(delay);
                
                const movement = steps.length > 1 ? this.animalMemory(animal, steps) : 0;
                animal.position = animal.hole ? movement : animal.position += movement;
                return animal
            });
            action(newPos);
        }

    @action
        animalMemory: TAnimalMemory = (animal, step) => {
            let cloneStep = step;
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
        setDelay: TSetDelay = (animal) => {  
            const delayData = this.rabbitStore.delayForRabbits;
            if(delayData[animal.tile]){
                if(animal.delayCounter>=0 && animal.delayCounter < delayData[animal.tile]){
                    animal.delayCounter +=1;
                    return [0]
                } else if(animal.delayCounter >= delayData[animal.tile]){
                    animal.delayCounter = 0;
                    //с вероятностью в 15 процентов животное может запомнить замедляющий тайл 
                    //при выходе из него и ограничеваем память кролика в 10 элементов
                    if(this.factor() <= 15){
                        animal.memory.length > 10 && animal.memory.splice(0, animal.memory.length - 20);
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
            return [0]
        }
//============================ Контроль популяции в тайлах
    @action 
        restrictPopulation: TRestrictPopulation = (animals, setAnimal) => {
            const positions: number[] = [];
            const recurPositions = [];

            animals.forEach(animal=>(
                animal.tile!=='water' && animal.tile!=='swamp'
            )&&positions.push(animal.position));
            
            for(let i = 0; i < positions.length; i++){
                if(positions.indexOf(positions[i]) !== positions.lastIndexOf(positions[i])){
                    recurPositions.push(positions[i]);
                }
            }
            const getCoitusPos = Array.from(new Set(recurPositions));
            getCoitusPos.map(pos=>
                this.factor()<=20 && setAnimal(pos)
            );
        }
};

export default new mainStore();