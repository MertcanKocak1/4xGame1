import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Login from "./pages/user/login";
import Register from './pages/user/register';
import PrivateRoute from './pages/user/privateRoute';
import BuildingManagement from './pages/user/buildingManagement';
import JwtHelper from './helpers/core/JwtHelper';
function isLoggedIn() {
  const token = localStorage.getItem('jwtToken');
  return token && !JwtHelper.isTokenExpired(token);
}

function App() {
  return (
    <Router>
    <PrivateRoute exact path="/configuration" component={BuildingManagement} />
    <Route exact path="/login">
      {isLoggedIn() ? <Redirect to="/configuration"/> : <Login />}
    </Route>
      <Route exact path="/register" render={() => (
        isLoggedIn() ? (<Redirect to="/configuration"/>) : (<Register />)
      )} />
      <Route path="*" render={() => (
          isLoggedIn() ? (<Redirect to="/configuration"/>) : (<Redirect to="/login" />)
        )} />
  </Router>
  );
}
export default App;