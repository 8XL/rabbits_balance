declare type TSetMovementCounter = (counter: numbermber) => void;
declare type TAnimals = (IFox | IRabbit)[];
declare type TFillPopulation = (animals:number)=> void;
declare type TAddPopulation = (pos?: number) => void;
declare type TSetAnimals = (animals: (IFox | IRabbit)[]) => void;
declare type TSetTile = (i: any, tile: any) => void;
declare type TRestrictPopulation = (animals: TAnimals) => void;
declare type TAnimalMovement = () => void;
declare type TSetDelay = (animal: TAnimal) => number[];
declare type TAnimalMemory = (animal: TAnimal, step: number[]) => number;

declare interface IAnimalStoreCtor{
	new (name: string): IAnimalStore
};

declare interface IAnimalStore {
	getMovementCounter: number;
	setMovementCounter: TSetMovementCounter;
	animals: TAnimals;
	getAnimals: TAnimals;
	animalsDelay: Record<string, number>;
	fillPopulation: TFillPopulation;
	addPopulation: TAddPopulation;
	setAnimals:TSetAnimals;
	setTile:TSetTile;
	animalMovement: TAnimalMovement
	restrictPopulation:TRestrictPopulation
	setDelay: TSetDelay
	animalMemory: TAnimalMemory
};

