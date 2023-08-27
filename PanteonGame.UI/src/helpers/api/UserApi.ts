import axios from 'axios';
import { IEnvelope } from '../core/ODataResultEnvelope';
import { ILoginResponse, IRegisterResponse, IUserParam, IUserResult } from '../models/User';

const baseUrl = process.env.REACT_APP_API_URL;

const UserApi = {
    listeleOData: (odataString: string): Promise<IEnvelope<IUserResult>> =>
        axios.get(`${baseUrl}/odata/?${odataString}`),

    login: (userCredentials: IUserParam): Promise<ILoginResponse> => {
        return axios
            .post(`${baseUrl}/api/Account/login`, userCredentials)
            .then((response) => response.data);
    },

    register: (userDetails: IUserParam): Promise<IRegisterResponse> => {
        return axios
            .post(`${baseUrl}/api/Account/register`, userDetails)
            .then((response) => response.data);
    },
};

export default UserApi;
