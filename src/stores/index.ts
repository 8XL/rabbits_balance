import mainStore from './mainStore/mainStore'

declare type TStores = {
	mainStore: IMainStore,
	forestStore: IForestStore,
	rabbitStore: IAnimalStore,
	foxStore: IAnimalStore,
	tableStore: ITableStore
}

const stores:TStores = {
    mainStore,
    forestStore: mainStore.forestStore,
		rabbitStore: mainStore.rabbitStore,
		foxStore: mainStore.foxStore,
    tableStore: mainStore.tableStore
}

export default stores