
declare interface IMainStore {
	movementCounter: number;
	getMovementCounter: number;
	intervalSpeed: number;
	getIntervalSpeed: number;
	changeInterval: (sec: number)=>void;
	intervalActions: ()=>void;
	interval: ()=>void;
}