import mainStore from './mainStore'

const stores = {
    mainStore,
    forestStore: mainStore.forestStore,
    rabbitStore: mainStore.rabbitStore,
    tableStore: mainStore.tableStore
}

export default stores