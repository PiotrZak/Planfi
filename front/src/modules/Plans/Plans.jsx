import React, { useState, useEffect, useContext } from 'react';
import { planService } from "services/planService";
import Icon from "common/Icon"
import Return from "common/Return"
import { CheckboxGenericComponent } from 'common/CheckboxGenericComponent';
import AddPlanModal from "./AddPlanModal";
import EditPlanModal from "./EditPlanModal";
import { Loader } from "common/Loader"
import {commonUtil} from "utils/common.util"
import { alertActions } from 'redux/actions/alert.actions'
import { useDispatch } from 'react-redux';
import { isMobile } from "react-device-detect";
import { ThemeContext } from 'App';

var ReactBottomsheet = require('react-bottomsheet');

const noPlans = "No plans"
const plansTitle = "Plans"
const deletePlan = "Delete plan"
const deletePlansText = "Delete plans"
const addExerciseToCategory = "To be able to add exercises you need to add a category first"
const editPlan = "Edit plan"
const selected = "selected"
const planDeleted = "Plan succesfully deleted!";

export const Plans = () => {

    const { theme } = useContext(ThemeContext);

    const [plans, setPlans] = useState();
    const [selectedPlans, setSelectedPlans] = useState([]);

    const [openModal, setOpenModal] = useState(false);

    const [openEditModal, setOpenEditModal] = useState(false);

    const [isLoading, setIsLoading] = useState(true)
    const [bottomSheet, setBottomSheet] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {

        console.log(theme)
        planService
            .getAllPlans()
            .then((data) => {
                setPlans(data);
                setIsLoading(false)
            })
            .catch(() => {
            });
    }, [setOpenModal, openModal]);

    const openAddPlanModal = () => {
        setOpenModal(!openModal)
    }

    const deletePlans = () => {
        planService
            .deletePlans(selectedPlans)
            .then(() => {
                dispatch(alertActions.success(planDeleted))
            })
            .catch((error) => {
                dispatch(alertActions.error(error))
            });
    }

    const submissionHandleElement = (selectedData) => {
        const selectedPlans = commonUtil.getCheckedData(selectedData, "planId")
        setSelectedPlans(selectedPlans)
        if (selectedPlans.length > 0) {
            setBottomSheet(true);
        } else {
            setBottomSheet(false);
        }
    }

    return (
        <div>
            <div className={"container " + (theme)}>
                <div className="container__title">
                    <Return />
                    <h2>{plansTitle}</h2>
                    <div onClick={openAddPlanModal}>
                        <Icon name={"plus"} fill={"#5E4AE3"} /></div>
                </div>
                <AddPlanModal openModal={openModal} onClose={() => setOpenModal(false)} />
                <EditPlanModal selectedPlansId ={selectedPlans} openModal={openEditModal} onClose={() => setOpenEditModal(false)} />
                <div>
                    <Loader isLoading={isLoading}>
                        {plans ? <CheckboxGenericComponent dataType="plans" displayedValue="title" dataList={plans} onSelect={submissionHandleElement} /> : <h1>{noPlans}</h1>}
                    </Loader>
                </div>
            </div>
            <ReactBottomsheet
                showBlockLayer={false}
                className="bottomsheet-without-background"
                visible={bottomSheet}
                onClose={() => setBottomSheet(false)}
                appendCancelBtn={false}>
                {isMobile ?
                    <>
                        <button onClick={() => deletePlans()} className="bottom-sheet-item">{selectedPlans.length == 1 ? deletePlan : deletePlansText}</button>

                    </>
                    :
                    <>
                        <div className="bottom-sheet-item__oneline">
                            <Icon name="check" fill="#2E6D2C" />
                            <p>{selectedPlans.length} {selected}</p>
                            <div onClick={() => deletePlans()} className="bottom-sheet-item__content"><Icon height={"18px"} name="trash" fill="#C3C3CF" />{deletePlan}</div>
                            {selectedPlans.length < 2 && <div onClick = {() => setOpenEditModal(true)} className='bottom-sheet-item__content'><Icon height={"18px"} name="edit" fill="#C3C3CF" />{editPlan}</div>}
                        </div>
                    </>
                }
            </ReactBottomsheet>
        </div>
    );
}




export default Plans;