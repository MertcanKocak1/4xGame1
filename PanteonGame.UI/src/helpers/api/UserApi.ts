import axios from "axios";
import { IEnvelope } from "../core/ODataResultEnvelope";
import { IUserResult } from "../models/User";

const baseUrl = process.env.REACT_APP_API_URL;

const UserApi = { 
    listeleOData: (odataString : string): Promise<IEnvelope<IUserResult>> => axios.get(`${baseUrl}/odata/?${odataString}`),
}
export default UserApi;