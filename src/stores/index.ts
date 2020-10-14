import mainStore from './mainStore/mainStore'

declare type TStores = {
	mainStore: IMainStore,
	forestStore: IForestStore,
	rabbitStore: IRabbitStore,
	tableStore: ITableStore
}

const stores:TStores = {
    mainStore,
    forestStore: mainStore.forestStore,
    rabbitStore: mainStore.rabbitStore,
    tableStore: mainStore.tableStore
}

export default stores