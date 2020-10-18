/// <reference path='mainStore.d.ts'/>
import { observable, action, computed, autorun, reaction } from 'mobx';

import forestStore from '../forestStore/forestStore';
import animalStore from '../animalStore/animalStore';
import tableStore from '../tableStore/tableStore';

class mainStore implements IMainStore{
	forestStore: IForestStore;
    rabbitStore: IAnimalStore;
    foxStore: IAnimalStore;
	tableStore: ITableStore;

  constructor(){
    this.forestStore = new forestStore();
    this.rabbitStore = new animalStore('rabbit');
    this.foxStore = new animalStore('fox');
	this.tableStore = new tableStore();

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
            this.movementCounter +=1;
        }

    @action 
        interval = ():void =>{
            setTimeout(() => {
                this.intervalActions();
                setTimeout(this.interval, this.intervalSpeed * 800)
            }, this.intervalSpeed * 800);
       }
};

export default new mainStore();