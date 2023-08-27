import { AxiosError } from 'axios';
import UserApi from '../api/UserApi';
import { ILoginResponse, IRegisterResponse, IUserParam, IUserResult } from '../models/User';
import { RootStore } from './RootStore';
import { makeAutoObservable, action } from 'mobx';

interface IApiError {
    message: string;
}

export default class UserStore {
    rootStore: RootStore;
    user: IUserResult | null = null;
    error: string | null = null;
    loginResponse: ILoginResponse | null = null;
    registerResponse: IRegisterResponse | null = null;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeAutoObservable(this, {
            login: action.bound,
            register: action.bound,
            setUser: action.bound,
            removeUser: action.bound,
        });
    }

    async login(userCredentials: IUserParam) {
        try {
            const userResponse: ILoginResponse = await UserApi.login(userCredentials);
            this.clearError();
            this.setUser(userResponse);
        } catch (error) {
            this.handleError(error);
        }
    }

    async register(userDetails: IUserParam) {
        try {
            const registerResponse: IRegisterResponse = await UserApi.register(userDetails);
            this.clearError();
            this.registerResponse = registerResponse;
        } catch (error) {
            this.handleError(error);
        }
    }
    handleError(error: unknown) {
        if (error && typeof error === 'object' && 'response' in error) {
            const axiosError = error as AxiosError<IApiError>;
            const responseData: any = axiosError.response?.data;

            if (typeof responseData === 'object' && '' in responseData) {
                const firstErrorMessage = responseData[''][0];
                this.error = firstErrorMessage || 'An unexpected error occurred.';
            } else {
                const message = (responseData as IApiError)?.message;
                this.error = message || 'An unexpected error occurred.';
            }
        } else {
            this.error = 'An unexpected error occurred.';
        }
    }
    setUser(loginResponse: ILoginResponse) {
        if (loginResponse && loginResponse.token) {
            this.loginResponse = loginResponse;
            localStorage.setItem('jwtToken', loginResponse.token);
        } else {
            this.error = 'Received user data is missing jwtToken.';
        }
    }
    clearError() {
        this.error = null;
    }
    removeUser() {
        this.loginResponse = null;
        localStorage.removeItem('jwtToken');
        localStorage.clear();
    }
}
