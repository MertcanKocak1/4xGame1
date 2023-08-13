import { IEnvelope } from "../core/ODataResultEnvelope";
import { IBuildingResult } from "../models/Building";
import { RootStore } from "./RootStore";
import { makeAutoObservable } from "mobx";

export default class BuildingStore {
    rootStore: RootStore;
    BuildingData: IEnvelope<IBuildingResult> = {
        value: [],
        "@odata.count" : 0, 
        count : 0
    }
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeAutoObservable (this);
    }

    // ListBuildingData = (odataString : string): Promise<IEnvelope<IBuildingResult> | undefined> => {
    //     return undefined;
    // }
    ClearBuildingData:() => void = () => {
        this.BuildingData = {
            value: [],
            "@odata.count" : 0,
            count : 0
        }
    }
}
