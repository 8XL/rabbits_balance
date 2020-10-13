declare type TGetForest = TTile[];
declare type THoles = number[];
declare type TGetHoles = THoles;
declare type TFillForest = any;
declare type TSetDataTiles = (arr: TTile[]) => void;
declare type TAddTiles = (el: TForestObj) => void;

declare interface IForestStore {
	forest: TTile[];
	getForest: TTile[];
	holes: THoles;
	getHoles: THoles;
	fillForest: any;
	setDataTiles: TSetDataTiles;
	addTiles: TAddTiles;
}

declare type TForestStoreCtor = () => IForestStore;