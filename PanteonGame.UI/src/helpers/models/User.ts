export interface IUserParam {
    id? : string;
    jwtToken? : string; 
    UserName? : string; 
    email? : string; 
    PasswordHash?: string; 
}
export interface IUserResult { 
    id? : string;
    jwtToken? : string; 
    UserName? : string; 
    email? : string; 
    PasswordHash?: string; 
}
export interface ILoginResponse {
    token: string;
    message: string;
}
export interface IRegisterResponse {
    message: string;
}