import { observer } from 'mobx-react-lite';
import Navbar from '../helpers/components/navbar';
import BuildingManagement from './buildingManagement';
import './user/user.css';
const Configuration = () => {

    return <>
        <Navbar />
        <div className="center-content">
                <h1>Configuration Page</h1>
            </div>
        <BuildingManagement />
    </>
}

export default observer(Configuration);