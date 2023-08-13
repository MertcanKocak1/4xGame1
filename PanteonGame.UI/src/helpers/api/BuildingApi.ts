import axios from "axios";
import { IEnvelope } from "../core/ODataResultEnvelope";
import { IBuildingResult } from "../models/Building";

const baseUrl = process.env.REACT_APP_API_URL;

const BuildingApi = { 
    listeleOData: (odataString : string): Promise<IEnvelope<IBuildingResult>> => axios.get(`${baseUrl}/odata/buildings?${odataString}`),
}
export default BuildingApi;