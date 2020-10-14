declare type TPanel = Record<string, number>;
declare type TSetPanel = (name: TPanel) => void;

declare interface ITableStore {
	panel: TPanel
	getPanel:TPanel
	setPanel: TSetPanel
}