import mainStore from './mainStore'

const stores = {
    mainStore,
    forestStore: mainStore.forestStore,
    rabbitStore: mainStore.rabbitStore
}

export default stores