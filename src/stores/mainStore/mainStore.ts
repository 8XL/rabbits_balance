/// <reference path='mainStore.d.ts'/>
import { observable, action, computed, autorun, reaction } from 'mobx';

import { factor, restrictions } from '../../modules/modules';
import { animalsDetails } from '../../staticData/data'
import forestStore from '../forestStore/forestStore';
import animalStore from '../animalStore/animalStore';
import tableStore from '../tableStore/tableStore';

class mainStore implements IMainStore{
	forestStore: IForestStore;
    rabbitStore: IAnimalStore;
    foxStore: IAnimalStore;
    tableStore: ITableStore;
    
    factor: VoidToNumF;
    restrictions: NumToArrF;

  constructor(){
    this.forestStore = new forestStore();
    this.rabbitStore = new animalStore('rabbit');
    this.foxStore = new animalStore('fox');
    this.tableStore = new tableStore();

    this.factor = factor;
    this.restrictions = restrictions;

    autorun(()=>{
      this.forestStore.fillForest();
      this.interval()
	})
			
    reaction(
      ()=> this.getMovementCounter,
      score=>{
        this.tableStore.setPanel({score: score})
        this.rabbitStore.setMovementCounter(score)
        this.foxStore.setMovementCounter(score)
    })
		
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
            this.animalsHunting();
            this.movementCounter +=1;
        }

    @action 
        interval = ():void =>{
            setTimeout(() => {
                this.intervalActions();
                setTimeout(this.interval, this.intervalSpeed * 800)
            }, this.intervalSpeed * 800);
       }
//============================ Поедание(я не придумал подходящего слова)
    @action
        animalsHunting = (): void => {
            const foxes = this.foxStore.getAnimals;
            const rabbits = this.rabbitStore.getAnimals;
            foxes
                .map(fox=>{return fox.position})
                .forEach(pos=>rabbits.map((rabbit, i)=>{
                    if(pos===rabbit.position && rabbit.tile !== 'swamp'&& rabbit.tile !== 'water'){
                        if(this.factor()<=animalsDetails.fox.huntingFactor![rabbit.tile]){
                            rabbits.splice(i, 1);
                            console.log('САЖРАЛ')
                            this.rabbitStore.setAnimals(rabbits);
                        }
                    }
                }))
            // метка охотника и таргет
            const posesOfRabbits = rabbits.map(el=>{
                return el.position
            })
            for(let fox of this.foxStore.getAnimals){
                this.restrictions(fox.position).map(pos=>{
                    if(posesOfRabbits.includes(fox.position+pos)){
                        (fox as IFox).hunting = posesOfRabbits[posesOfRabbits.indexOf(fox.position+pos)] as number
                        console.log('ХАНТЕР', (fox as IFox).hunting)
                    }
                })
                
            }
        }
};

export default new mainStore();