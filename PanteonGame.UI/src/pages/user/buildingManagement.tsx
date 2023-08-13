import { observer } from "mobx-react";
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';

const rows: GridRowsProp = [
    { id: 1, col1: 'Hello', col2: 'World', col3: 'Foo' },
    { id: 2, col1: 'DataGridPro', col2: 'is Awesome', col3: 'Lorem' },
    { id: 3, col1: 'MUI', col2: 'is Amazing', col3: 'Lorem' },
  ];

  const columns: GridColDef[] = [
    { field: 'col1', headerName: 'Building Type', width: 250 },
    { field: 'col2', headerName: 'Building Cost', width: 250 },
    { field: 'col3', headerName: 'Construction Time', width: 250 },
  ];
  
const BuildingManagement = () => {
    
    return (
        <div style={{ height: 300, width: '80%' }}>
          <DataGrid rows={rows} columns={columns}/>
        </div>
      );
}

export default observer(BuildingManagement);
