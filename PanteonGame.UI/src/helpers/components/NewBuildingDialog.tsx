import { useContext, useState } from 'react';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
import { BuildingTypes } from '../constants/BuildingTypes';
import { RootStoreContext } from '../stores/RootStore';
import { observer } from 'mobx-react-lite';
import {ComboBox} from "@progress/kendo-react-dropdowns";
import { NumericTextBox } from "@progress/kendo-react-inputs";
import { IBuildingParam } from '../models/Building';

const NewBuildingDialog= () => {
    const rootStore =  useContext(RootStoreContext);
    const {setDialogOpen} = rootStore.buildingStore;
    const [buildingType, setBuildingType] = useState<BuildingTypes | undefined>();
    const [buildingCost, setBuildingCost] = useState<number | undefined | null>();
    const [constructionTime, setConstructionTime] = useState<number | undefined | null>();
    const {addBuilding} = rootStore.buildingStore;
    const clearProps = () => {
        setBuildingType(undefined);
        setBuildingCost(0);
        setConstructionTime(0);
    }
    const handleAddBuilding = () => { 
        if(buildingType !== undefined && buildingCost !== null && constructionTime !== null) {
            const building: IBuildingParam = {
                buildingType: buildingType,
                buildingCost: buildingCost,
                constructionTime: constructionTime,
            };
            addBuilding(building);
            clearProps();
            setDialogOpen(false);
    }
    else { 
      alert("Please Enter All The Fields"); 
    }
      
  }
  return (
    <Dialog title={"Add New Building"} onClose={() => setDialogOpen(false)}>
         <p>Building Type</p>
         <ComboBox
                style={{ width: "300px" }}
                data={Object.values(BuildingTypes)}
                onChange={(e) => setBuildingType(e.value as BuildingTypes)}
                value={buildingType}
            />
            <p>Building Cost</p>
            <NumericTextBox
                style={{ width: "300px" }}
                onChange={(e) => setBuildingCost(e.value)}
                value={buildingCost}
                defaultValue={0}
                placeholder='Please Enter Cost'
                min={0}
                max={9999}
            />
            <p>Construction Time (Seconds)</p>
            <NumericTextBox
                style={{ width: "300px" }}
                defaultValue={0}
                onChange={(e) => setConstructionTime(e.value)}
                value={constructionTime}
                min={0}
                max={9999}
                placeholder='Please Enter Time'
            />
      <DialogActionsBar>
         <button
          title="Add"
          className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
          onClick={handleAddBuilding}
        >
          Add
        </button> 
        <button
          title="Cancel"
          className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
          onClick={() => setDialogOpen(false)}
        >
          Cancel
        </button>
      </DialogActionsBar>
    </Dialog>
  );
};

export default observer(NewBuildingDialog);
