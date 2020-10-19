/// <reference path="animalStore.d.ts" />

import { observable, action, reaction, computed, autorun } from 'mobx';

import { restrictions, shuffle, randomIndex, factor, timestamp } from '../../modules/modules';
import { animalsDetails } from '../../staticData/data'
import mainStore from '../mainStore/mainStore';

export default class animalStore implements IAnimalStore{
	shuffle: TShuffle;
  timestamp: VoidToNumF;
  restrictions: NumToArrF;
	randomIndex: ArrToNumF;
  factor: VoidToNumF;
  details: TAnimalDetails;
  name: string;

  constructor(animalName: string) {
    this.restrictions = restrictions;
    this.shuffle = shuffle;
    this.randomIndex = randomIndex;
    this.factor = factor;
    this.timestamp = timestamp;
    
    this.name = animalName;
    this.details = animalsDetails[this.name];
    
		autorun(()=>{
      this.animalsDelay = this.details.delayes;
      this.fillPopulation(this.details.quantity);
    });

    reaction(()=>this.getMovementCounter,
      count => {
        this.animalMovement();
        mainStore.tableStore.setPanel({[this.name]:this.animals.length})
      }
    )
  }

  @observable 
    movementCounter = 0;

  @computed get
    getMovementCounter():number{
      return this.movementCounter
    }
  
  @action
    setMovementCounter:TSetMovementCounter = (counter) =>{
      this.movementCounter = counter;
    }

  @observable
    animals: TAnimals = [];
    
  @computed get 
    getAnimals():TAnimals{
      return this.animals
		}

  @observable
    animalsDelay: Record<string, number> = {}

  @action
    fillPopulation: TFillPopulation = (animals) => {
      for(let i = 1; i<=animals; i++){
				this.addPopulation()
      }
    }
    
  @action
    addPopulation: TAddPopulation = (pos?) => {   
      const randomStartPosition: number = Math.floor(Math.random() * (this.details.side.max - this.details.side.min + 1) + this.details.side.min);
      const position: number = pos ? pos : randomStartPosition;
      const animal:TAnimal = {
        name: this.name,
        position: position,
        tile: '',
        delayCounter: 0,
        hole: false,
        id: this.timestamp(),
        memory: []
      };
      this.animals = [...this.animals, animal];
      console.log('КОИТУС', animal.name)
    }

//============================ Контроль популяции в тайлах
    
	@action
    setAnimals:TSetAnimals = (animals) => {
      this.animals = animals
    }
    
  @action
    setTile:TSetTile = (i, tile) => {
      this.animals[i].tile = tile;
    }

  @action
    animalMovement: TAnimalMovement = () => {
      const newPoses: TAnimals =  this.animals.map((animal, i)=>{
        const delay = this.setDelay(animal)
        const steps = this.shuffle(delay);
        if(animal.hole){
          animal.position = steps[this.randomIndex(steps)]
          return animal
        }
        const movement = steps.length > 1 ? this.animalMemory(animal, steps) : 0;
        animal.position = animal.position += movement;
        return animal
      }).filter(animal=>{
//============================ в фильтрацию вписывай побочки
        if(animal.tile === 'swamp' && this.factor()<=5){
          console.log('УТАПИЛСь', animal.name)
          return false
        }else {
          return animal
        }
      });;

      this.setAnimals(newPoses);
      this.restrictPopulation(newPoses);
    }

  @action 
    restrictPopulation: TRestrictPopulation = (animals) => {
      const positions: number[] = [];
      const recurPositions: number[] = [];

      animals.forEach(animal=>
        (animal.tile!=='water' && animal.tile!=='swamp')
        &&positions.push(animal.position));
      
      for(let i = 0; i < positions.length; i++){
        if(positions.indexOf(positions[i]) !== positions.lastIndexOf(positions[i])){
          recurPositions.push(positions[i]);
        }
      }
      const getCoitusPos = Array.from(new Set(recurPositions));
      getCoitusPos.forEach(pos=>
        this.factor()<=this.details.reproduction && this.addPopulation(pos)
      );
    } 

  @action 
    setDelay: TSetDelay = (animal) => {  
      if(this.animalsDelay[animal.tile]){
        if(animal.delayCounter>=0 && animal.delayCounter < this.animalsDelay[animal.tile]){
          animal.delayCounter +=1;
          return [0]
        } else if(animal.delayCounter >= this.animalsDelay[animal.tile]){
          animal.delayCounter = 0;
          if(this.factor() <= this.details.intellect){
            // блок памяти
            // ПОФИКСИ ПАМЯТЬ ЛИСЫ, ГДЕ ЛЕС И НОРЫ НЕ ДОБАВЛЯТЬ
            animal.memory.length > this.details.memory && animal.memory.splice(0, animal.memory.length - this.details.memory);
            animal.memory.push(animal.position);
            return this.restrictions(animal.position)
          }
          return this.restrictions(animal.position)
        }
      } else if(animal.name==='rabbit' && animal.tile === 'hole'){
        animal.hole = !animal.hole;
        if(animal.hole){
            const arr = [...mainStore.forestStore.getHoles];
            return arr;    
        } else {
            return this.restrictions(animal.position);
        }
      } else if(animal.tile === 'grass'){
        return this.restrictions(animal.position)
      }
      return this.restrictions(animal.position)
    }

  @action
    animalMemory: TAnimalMemory = (animal, step) => {
      let movement = this.randomIndex(step);
      if(animal.memory.length>0){
        for(let i=0; i<animal.memory.length; i++){
          if(this.factor()<=this.details.memory && animal.position + step[movement] === animal.memory[i]){
            step.splice(movement, 1);
            movement = this.randomIndex(step);
            return step[movement]
          }
        }
        return step[movement]
      }
      return step[movement]
    }
}