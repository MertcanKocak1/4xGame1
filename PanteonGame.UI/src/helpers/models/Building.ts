import { IBaseParam, IBaseResult } from "./BaseModel";

export interface IBuildingParam extends IBaseParam{
    buildingType: string;
    buildingCost?: number;
    constructionTime?: number;
}
export interface IBuildingResult extends IBaseResult { 
    buildingType: string;
    buildingCost: number;
    constructionTime: number;
}