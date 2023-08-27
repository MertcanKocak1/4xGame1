import { useContext, useEffect, useState } from 'react';
import {
    Grid,
    GridColumn as Column,
    GridToolbar,
    GridDataStateChangeEvent,
    GridFilterCellProps,
    GridCellProps,
    GridRowProps,
} from '@progress/kendo-react-grid';
import '@progress/kendo-theme-default/dist/all.css';
import { RootStoreContext } from '../helpers/stores/RootStore';
import NewBuildingDialog from '../helpers/components/NewBuildingDialog';
import { observer } from 'mobx-react-lite';
import { toODataString } from '@progress/kendo-data-query';
import { DropdownFilterCell } from '../helpers/components/dropdownFilterCell';
import { BuildingTypes } from '../helpers/constants/BuildingTypes';
import { IBuildingParam } from '../helpers/models/Building';
import UpdateBuildingDialog from '../helpers/components/UpdateBuildingDialog';
import React from 'react';

type GridStateType = {
  skip?: number;
  take?: number;
};

interface EditCommandCellProps extends GridCellProps {
  enterEdit: (item: IBuildingParam) => void;
}

const buildingTypeFilterCell: any = (props: GridFilterCellProps) => (
    <DropdownFilterCell
        {...props}
        data={Object.values(BuildingTypes)}
        defaultItem={'Select Building Type'}
    />
);

const EditCommandCell = (props: EditCommandCellProps) => {
    return (
        <td>
            <button
                className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
                onClick={() => props.enterEdit(props.dataItem)}>
                Edit
            </button>
        </td>
    );
};

const BuildingManagement = observer(() => {
    const [gridState, setGridState] = useState<GridStateType>({ skip: 0, take: 10 });
    const rootStore = useContext(RootStoreContext);
    const { isDialogOpen, setDialogOpen, ListBuildingData, BuildingData } = rootStore.buildingStore;
    const [editItem, setEditItem] = useState<IBuildingParam>();
    const [openForm, setOpenForm] = useState<boolean>(false);
    const fetchBuildings = async (query: string = '$top=10&$count=true&$orderby=id') => {
        await ListBuildingData(query);
    };
    
    useEffect(() => {
        fetchBuildings();
    }, []);

    const rowRender = (trElement: React.ReactElement<HTMLTableRowElement>, props: GridRowProps) => {
        const isDeleted = !props.dataItem.isDeleted;
        const red = { backgroundColor: 'rgb(243, 23, 0, 0.32)' };
        const trProps: any = { style: isDeleted ?   {}:red };
        return React.cloneElement(
            trElement,
            { ...trProps },
            trElement.props.children as React.ReactNode
        );
    };

    const handleDataStateChange = async (event: GridDataStateChangeEvent) => {
        console.log('Data state change event:', event);
        try {
            if (!event || !event.dataState) {
                console.warn('Invalid event or event.data:', event);
                return;
            }

            setGridState(event.dataState);

            let odataQuery = toODataString(event.dataState);
            if (!odataQuery) {
                console.warn('Invalid OData query:', odataQuery);
                return;
            }
            await ListBuildingData(odataQuery + '&$count=true');
        } catch (error) {
            console.error('Error in handleDataStateChange:', error);
        }
    };
    const MyEditCommandCell = (props: GridCellProps) => (
        <EditCommandCell {...props} enterEdit={enterEdit} />
    );
    const enterEdit = (item: IBuildingParam) => {
        setOpenForm(true);
        setEditItem(item);
    };
    const handleCancelEdit = () => {
        setOpenForm(false);
    };

    return (
        <>
            <Grid
                filterable={true}
                sortable={true}
                style={{ width: '80vw', margin: '0 auto', height: '600px' }}
                onDataStateChange={handleDataStateChange}
                data={BuildingData.value}
                total={BuildingData['@odata.count']}
                pageable={{
                    buttonCount: 4,
                    pageSizes: [5, 10, 15],
                }}
                rowRender={rowRender}
                {...gridState}>
                <GridToolbar>
                    <button
                        title="New Building"
                        className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
                        onClick={() => setDialogOpen(true)}>
                        New Building
                    </button>
                </GridToolbar>
                <Column
                    field="buildingType"
                    title="Building Type"
                    filterCell={buildingTypeFilterCell}
                />
                <Column
                    field="buildingCost"
                    title="Building Cost"
                    filterable={true}
                    filter="numeric"
                />
                <Column
                    field="constructionTime"
                    title="Construction Time(s)"
                    filterable={true}
                    filter="numeric"
                />
                <Column cell={MyEditCommandCell} filterable={false} sortable={false} />
            </Grid>
            {openForm && <UpdateBuildingDialog cancelEdit={handleCancelEdit} item={editItem!} refreshGrid={fetchBuildings} />}
            {isDialogOpen && <NewBuildingDialog refreshGrid= {fetchBuildings}/>}
        </>
    );
});

export default BuildingManagement;
