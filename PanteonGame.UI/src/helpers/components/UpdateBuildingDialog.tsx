import { Dialog } from "@progress/kendo-react-dialogs";
import {
  Form,
  Field,
  FormElement,
} from "@progress/kendo-react-form";
import { NumericTextBox } from "@progress/kendo-react-inputs";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { observer } from 'mobx-react-lite';
import { IBuildingParam } from "../models/Building";
import { BuildingTypes } from "../constants/BuildingTypes";
import { RootStoreContext } from "../stores/RootStore";
import { useContext } from "react";

interface EditFormProps {
  cancelEdit: () => void;
  item: IBuildingParam;
}

const UpdateBuildingDialog = (props: EditFormProps) => {
    const  rootStore  = useContext(RootStoreContext);

    const handleUpdate = (values: { [name: string]: any; }, event?: React.SyntheticEvent<any, Event>) => {
        const buildingValues = values as IBuildingParam;
    
        if (!buildingValues.buildingType || !buildingValues.buildingCost || !buildingValues.constructionTime) {
            alert("All fields are required!");
            return;
        }
        if (!props.item.id) {
            alert("Building ID is missing!");
            return;
        }
    
        rootStore.buildingStore.updateBuilding(props.item.id, buildingValues)
            .then(() => {
                alert("Building updated successfully!");
                props.cancelEdit(); 
            })
            .catch(error => {
                console.error("Error updating the building:", error);
            });
    }
    return (
      <Dialog title={`Edit Building`} onClose={props.cancelEdit}>
        <Form
          onSubmit={handleUpdate}
          initialValues={props.item}
          render={(formRenderProps) => (
            <FormElement style={{ maxWidth: 650 }}>
              <fieldset className={"k-form-fieldset"}>
                <div className="mb-3">
                <Field
                    name="buildingType"
                    component={DropDownList}
                    data={Object.values(BuildingTypes)}
                    label={"Building Type"}
                />
                </div>
                <div className="mb-3">
                  <Field
                    name="buildingCost"  
                    component={NumericTextBox} 
                    label={"Building Cost"}
                  />
                </div>
                <div className="mb-3">
                  <Field
                    name="constructionTime" 
                    component={NumericTextBox}
                    label={"Construction Time(s)"}
                  />
                </div>
              </fieldset>
              <div className="k-form-buttons">
                <button
                  type={"submit"}
                  className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
                  disabled={!formRenderProps.allowSubmit}
                >
                  Update
                </button>
                <button
                  type="button" 
                  className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
                  onClick={props.cancelEdit}
                >
                  Cancel
                </button>
              </div>
            </FormElement>
          )}
        />
      </Dialog>
    );
  };
  

export default observer(UpdateBuildingDialog);