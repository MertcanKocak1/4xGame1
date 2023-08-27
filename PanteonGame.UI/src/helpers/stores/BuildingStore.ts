import { AxiosError } from "axios";
import BuildingApi from "../api/BuildingApi";
import { IEnvelope } from "../core/ODataResultEnvelope";
import { IBuildingParam, IBuildingResult } from "../models/Building";
import { RootStore } from "./RootStore";
import { makeAutoObservable, action } from "mobx";
interface IApiError {
    message: string;
}
export default class BuildingStore {
    rootStore: RootStore;
    BuildingData: IEnvelope<IBuildingResult> = {
        value: [],
        "@odata.count" : 0, 
        count : 0
    }
     error: string | null = null;
    isDialogOpen: boolean = false;
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeAutoObservable (this, {
            setDialogOpen: action.bound,
            ClearBuildingData: action.bound,
            addBuilding:action.bound,
            ListBuildingData: action.bound,
            setBuildingData: action.bound,
        });
    }

    ListBuildingData = async (odataString: string) => {
        try {
            const response : any = await BuildingApi.listeleOData(odataString);
            if (response && response.data) {
                const newBuildingData = {
                    "@odata.count": response.data["@odata.count"],
                    value: response.data.value
                };
                this.setBuildingData(newBuildingData);
            }
            this.clearError();
            return this.BuildingData;
        } catch (error) {
            this.handleError(error);
        }
    }
    
    setBuildingData(newData: IEnvelope<IBuildingResult>) {
        this.BuildingData = newData;
    }
    ClearBuildingData:() => void = () => {
        this.BuildingData = {
            value: [],
            "@odata.count" : 0,
            count : 0
        }
    }
    handleError(error: unknown) {
        if (error && typeof error === 'object' && 'response' in error) {
          const axiosError = error as AxiosError<IApiError>;
          const responseData : any = axiosError.response?.data ;
      
        if (typeof responseData === 'object' && "" in responseData) {
            const firstErrorMessage = responseData[""][0];
            this.error = firstErrorMessage || "An unexpected error occurred.";
          } else {
            const message = (responseData as IApiError)?.message;
            this.error = message || "An unexpected error occurred.";
          }
        } else {
          this.error = "An unexpected error occurred.";
        }
      }
    setDialogOpen(value : boolean){
        this.isDialogOpen = value;
    }
    addBuilding = async (building: IBuildingParam) => {
        try {
            await BuildingApi.addbuilding(building);
            this.clearError();
        } catch (error) {
            this.handleError(error);
        }
    }
    updateBuilding = async (buildingId : string, building: IBuildingParam) => {
        try {
            await BuildingApi.updatebuilding(buildingId, building);
            this.clearError();
        } catch (error) {
            this.handleError(error);
        }
    }
    
    deleteBuilding = async (buildingId: string) => {
        try {
            await BuildingApi.deletebuilding(buildingId);
            this.clearError();
        } catch (error) {
            this.handleError(error);
        }
    }
    clearError(){
        this.error = null;
    }
}
