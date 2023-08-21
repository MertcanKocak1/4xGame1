import jwtDecode from 'jwt-decode';

interface DecodedToken {
    exp: number;
    iat?: number;
    [key: string]: any;
}

class JwtHelper {
    static isTokenExpired(token: string): boolean {
        if (!token) return true;
        
        try {
            const decodedToken: DecodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000;

            return decodedToken.exp < currentTime;
        } catch (err) {
            return true;
        }
    }
}

export default JwtHelper;
