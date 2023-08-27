import { createContext } from 'react';
import BuildingStore from './BuildingStore';
import UserStore from './UserStore';

export class RootStore {
    buildingStore: BuildingStore;
    userStore: UserStore;
    constructor() {
        this.buildingStore = new BuildingStore(this);
        this.userStore = new UserStore(this);
    }
}

export const RootStoreContext = createContext<RootStore>(new RootStore());
