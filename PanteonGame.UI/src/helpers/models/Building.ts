import { IBaseParam, IBaseResult } from "./BaseModel";

export interface IBuildingParam extends IBaseParam{
    BuildingType: string;
    BuildingCost: number;
    ConstructionTime: number;
}
export interface IBuildingResult extends IBaseResult { 
    BuildingType: string;
    BuildingCost: number;
    ConstructionTime: number;
}