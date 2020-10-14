declare type TAnimalMovement = (animals: TRabbits, action:TSetRabbits) => void;
declare type TSetDelay = (animal: TRabbit) => number[];
declare type TAnimalMemory = (animal: TRabbit, step: number[]) => number;
declare type TRestrictPopulation = (animals: TRabbits, setAnimal: TAddPopulation) => void;

declare interface IMainStore {
	movementCounter: number;
	getMovementCounter: number;
	intervalSpeed: number;
	getIntervalSpeed: number;
	changeInterval: (sec: number)=>void;
	intervalActions: ()=>void;
	interval: ()=>void;
	animalMovement: TAnimalMovement;
	animalMemory: TAnimalMemory;
	setDelay: TSetDelay;
	restrictPopulation: TRestrictPopulation;
};