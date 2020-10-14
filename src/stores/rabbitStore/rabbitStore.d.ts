declare type TRabbit = {
	name: string,
  position: number,
  tile: string,
  delayCounter: number,
  hole?: boolean,
  id: number,
  memory: number[]
};
declare type TRabbits = TRabbit[];
declare type TDelayForRabbits = Record<string, number>;
declare type TFillPopulation = (animals:number)=> void;
declare type TAddPopulation = (pos?: number) => void;
declare type TSetRabbits = (animals: TRabbit[]) => void;
declare type TSetTile = (i: any, tile: any) => void;

declare interface IRabbitStore {
	rabbits: TRabbits;
	getRabbits: TRabbits;
	rabbitsCount: number;
	getRabbitsCount: TRabbitsCount;
	delayForRabbits: TDelayForRabbits;
	fillPopulation: TFillPopulation;
	addPopulation: TAddPopulation;
	setRabbits:TSetRabbits;
	setTile:TSetTile;
};