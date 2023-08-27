import { IBaseParam, IBaseResult } from "./BaseModel";

export interface IBuildingParam extends IBaseParam{
    buildingType: string;
    buildingCost?: number;
    constructionTime?: number;
    isDeleted? : boolean;
}
export interface IBuildingResult extends IBaseResult { 
    buildingType: string;
    buildingCost: number;
    constructionTime: number;
    isDeleted?: boolean
}