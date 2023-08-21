import React, { useContext, useEffect, useState } from 'react';
import { Grid, GridColumn as Column, GridToolbar, GridPageChangeEvent } from '@progress/kendo-react-grid';
import { filterBy, CompositeFilterDescriptor } from '@progress/kendo-data-query';
import '@progress/kendo-theme-default/dist/all.css';
import { RootStoreContext } from '../../helpers/stores/RootStore';
import NewBuildingDialog from '../../helpers/components/NewBuildingDialog';
import { observer } from 'mobx-react-lite';
import { PagerTargetEvent } from "@progress/kendo-react-data-tools";
import { IBuildingParam, IBuildingResult } from '../../helpers/models/Building';

interface PageState {
  skip: number;
  take: number;
}
const initialDataState: PageState = { skip: 0, take: 10 };

const BuildingManagement = () => {
  const [page, setPage] = React.useState<PageState>(initialDataState);
    const [pageSizeValue, setPageSizeValue] = React.useState<
    number | string | undefined
  >();
  const pageChange = (event: GridPageChangeEvent) => {
    const targetEvent = event.targetEvent as PagerTargetEvent;
    const take = targetEvent.value === "All" ? 77 : event.page.take;

    if (targetEvent.value) {
      setPageSizeValue(targetEvent.value);
    }
    setPage({
      ...event.page,
      take,
    });
  };
  const [filter, setFilter] = useState<CompositeFilterDescriptor | undefined>(undefined);
  const [buildings, setBuildings] = useState<IBuildingResult[]>([]);
  const filteredData = filter ? filterBy(buildings, filter) : buildings; 
  const rootStore = useContext(RootStoreContext);
  const {isDialogOpen, setDialogOpen, ListBuildingData, BuildingData} = rootStore.buildingStore;
  useEffect(() => {
    const fetchBuildings = async () => {
      await ListBuildingData('$top=10&$count=true');
      setBuildings(BuildingData.value);
    }
    fetchBuildings();
  }, [BuildingData.value, ListBuildingData]);

  const handleFilterChange = (e: { filter: CompositeFilterDescriptor }) => {
    setFilter(e.filter);
  }

  return (
    <>
      <Grid
        filterable={true}
        sortable = {true}
        filter={filter}
        style={{ width: '80vw', margin: '0 auto', height: '400px' }} 
        onFilterChange={handleFilterChange}
        data={buildings.slice(page.skip, page.take + page.skip)}
        skip={page.skip}
        take={page.take}
        total={filteredData.length}
        pageable={{
          buttonCount: 4,
          pageSizes: [5, 10, 15, "All"],
          pageSizeValue: pageSizeValue,
        }}
        onPageChange={pageChange}
      >
        <GridToolbar>
          <button
            title="New Building"
            className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
            onClick={() => setDialogOpen(true)}
          >
            New Building
          </button>
        </GridToolbar>
        <Column field='buildingType' title='Building Type' filterable={true} />
        <Column field='buildingCost' title='Building Cost' filterable={true} filter='numeric' />
        <Column field='constructionTime' title='Construction Time(s)'  filterable={true} filter='numeric' />
      </Grid>

      {isDialogOpen && (
       <NewBuildingDialog />
      )}
    </>
  );
};

export default observer(BuildingManagement);
