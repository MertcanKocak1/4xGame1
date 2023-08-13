import { RootStore } from "./RootStore";
import { makeAutoObservable } from "mobx";

export default class UserStore {
    rootStore: RootStore;
    name: string = "";

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeAutoObservable (this);
    }
    setName(newName : string) {
        this.name = newName;
    }
}
