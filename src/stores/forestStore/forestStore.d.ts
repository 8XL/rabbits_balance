declare type TGetForest = TDataTile[];
declare type TSetDataTiles = (arr: TDataTile[]) => void;
declare type TAddTiles = (el: TForestObj) => void;

declare interface IForestStore {
	forest: TDataTile[];
	getForest: TDataTile[];
	holes: number[];
	getHoles: number[];
	fillForest: ()=>void;
	setDataTiles: TSetDataTiles;
	addTiles: TAddTiles;
}
