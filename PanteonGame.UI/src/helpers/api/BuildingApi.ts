import axios from "axios";
import { IEnvelope } from "../core/ODataResultEnvelope";
import { IBuildingParam, IBuildingResult } from "../models/Building";

const baseUrl = process.env.REACT_APP_API_URL;

const getToken = () => {
    return localStorage.getItem("jwtToken");
};

const apiInstance = axios.create({
    baseURL: baseUrl,
    headers: {
        //'Authorization': `Bearer ${getToken()}`, 
        'Content-Type': 'application/json'
    }
});
apiInstance.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});
const BuildingApi = { 
    listeleOData: (odataString : string): Promise<IEnvelope<IBuildingResult>> => apiInstance.get(`/odata/Building?${odataString}`),
    
    addbuilding: (building: IBuildingParam): Promise<any> => {
        return apiInstance.post(`/api/Building`, building)
            .then(response => response.data);
    },

    updatebuilding: (buildingId: string, building: IBuildingParam): Promise<any> => {
        return apiInstance.put(`/api/Building/${buildingId}`, building)
            .then(response => response.data);
    },

    deletebuilding: (buildingId: string): Promise<any> => {
        return apiInstance.delete(`/odata/Building/${buildingId}`)
            .then(response => response.data);
    }
}

export default BuildingApi;
