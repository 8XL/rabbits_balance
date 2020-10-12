declare type TGetForest = TTile[];
declare type THoles = number[];
declare type TGetHoles = THoles;
declare type TFillForest = any;
declare type TSetDataTiles =(arr: TTile[]) => void;
declare type TAddTiles = (tile: TTile, min?: number, max?: number) => void;

declare interface IForestStore {
	forest: TTile[];
	getForest: TGetForest;
	holes: THoles;
	getHoles: TGetHoles;
	fillForest: any;
	setDataTiles: TSetDataTiles;
	addTiles: TAddTiles;
}

declare type IForestStoreCtor = () => IForestStore;