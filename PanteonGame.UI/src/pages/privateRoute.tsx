import { Route, Redirect, RouteProps } from 'react-router-dom';
import JwtHelper from '../helpers/core/JwtHelper';

interface PrivateRouteProps extends RouteProps {
    component: React.ComponentType<any>;
}

function isLoggedIn() {
  const token = localStorage.getItem('jwtToken');
  return token && !JwtHelper.isTokenExpired(token);
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => 
                isLoggedIn() ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );
};

export default PrivateRoute;
