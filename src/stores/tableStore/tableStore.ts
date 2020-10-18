/// <reference path="tableStore.d.ts" />

import { observable, action, computed } from 'mobx';
import mainStore from '../mainStore/mainStore';

export default class tableStore implements ITableStore {
  @observable
    panel:TPanel = {
      score: mainStore.getMovementCounter,
      rabbit: mainStore.rabbitStore.getAnimals.length,
      fox: 0,
      speed: mainStore.getIntervalSpeed,
    }
    
  @computed get
    getPanel():TPanel{
      return this.panel
    }
    
  @action
    setPanel:TSetPanel = (name) => {
      console.log(name)
      const key:string[] = Object.keys(name);
      const [a, ...b] = key;
      this.panel[a] = name[a];
		}
}