import React, { useState } from 'react';
import { Grid, GridColumn as Column, GridToolbar } from '@progress/kendo-react-grid';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
import { filterBy, CompositeFilterDescriptor } from '@progress/kendo-data-query';
import '@progress/kendo-theme-default/dist/all.css';

const data = [
  { id: 1, BuildingType: 'Apartment', BuildingCost: 500000, ConstructionTime: '6 months' },
  { id: 2, BuildingType: 'Office', BuildingCost: 800000, ConstructionTime: '9 months' },
  { id: 3, BuildingType: 'Hotel', BuildingCost: 1200000, ConstructionTime: '12 months' },
];

const BuildingManagement = () => {
  const [filter, setFilter] = useState<CompositeFilterDescriptor | undefined>(undefined);
  const [buildings, setBuildings] = useState(data);
  const filteredData = filter ? filterBy(buildings, filter) : buildings; 

  const handleFilterChange = (e: { filter: CompositeFilterDescriptor }) => {
    setFilter(e.filter);
  }

  const [showDialog, setShowDialog] = useState(false);
  const [newBuilding, setNewBuilding] = useState({
    BuildingType: '',
    BuildingCost: 0,
    ConstructionTime: ''
  });
  
  const handleAddBuilding = () => {
    const newId = buildings.length > 0 ? buildings[buildings.length - 1].id + 1 : 1;
    setBuildings([...buildings, { ...newBuilding, id: newId }]);
    setNewBuilding({
      BuildingType: '',
      BuildingCost: 0,
      ConstructionTime: ''
    });
    setShowDialog(false);
  };

  return (
    <>
      <Grid
        filterable={true}
        sortable = {true}
        data={filteredData}
        filter={filter}
        style={{ width: '80vw', margin: '0 auto', height: '400px' }} 
        onFilterChange={handleFilterChange}
      >
        <GridToolbar>
          <button
            title="New Building"
            className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
            onClick={() => setShowDialog(true)}
          >
            New Building
          </button>
        </GridToolbar>
        <Column field='BuildingType' title='Building Type' filterable={true} />
        <Column field='BuildingCost' title='Building Cost' filterable={true} filter='numeric' />
        <Column field='ConstructionTime' title='Construction Time'  filterable={true} />
      </Grid>

      {showDialog && (
        <Dialog title={"Add New Building"} onClose={() => setShowDialog(false)}>
          <form>
            <div className="mb-3">
              <label>Building Type</label>
              <input
                value={newBuilding.BuildingType}
                onChange={(e) => setNewBuilding({ ...newBuilding, BuildingType: e.target.value })}
                className="k-input"
              />
            </div>
            <div className="mb-3">
              <label>Building Cost</label>
              <input
                type="number"
                value={newBuilding.BuildingCost.toString()}
                onChange={(e) => setNewBuilding({ ...newBuilding, BuildingCost: Number(e.target.value) })}
                className="k-input"
              />
            </div>
            <div className="mb-3">
              <label>Construction Time</label>
              <input
                value={newBuilding.ConstructionTime}
                onChange={(e) => setNewBuilding({ ...newBuilding, ConstructionTime: e.target.value })}
                className="k-input"
              />
            </div>
          </form>
          <DialogActionsBar>
            <button
              title="Add"
              className="k-button"
              onClick={handleAddBuilding}
            >
              Add
            </button>
            <button
              title="Cancel"
              className="k-button"
              onClick={() => setShowDialog(false)}
            >
              Cancel
            </button>
          </DialogActionsBar>
        </Dialog>
      )}
    </>
  );
};

export default BuildingManagement;
