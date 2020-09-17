import React, { useState, useEffect } from 'react';
import { planService } from "services/planService";
import Icon from "common/Icon"
import Return from "common/Return"
import { CheckboxGenericComponent } from 'common/CheckboxGenericComponent';
import AddPlanModal from "./AddPlanModal";
import { Loader } from "common/Loader"

const noPlans = "No plans"
const plansTitle = "Plans"
const addExerciseToCategory = "To be able to add exercises you need to add a category first"

export const Plans = () => {
    const [plans, setPlans] = useState();
    const [openModal, setOpenModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
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

    const submissionHandleElement = () => {
        console.log('test')
    }

    return (
        <div className="container">
            <div className="container__title">
                <Return />
                <h2>{plansTitle}</h2>
                <div onClick={openAddPlanModal}>
                    <Icon name={"plus"} fill={"#5E4AE3"} /></div>
            </div>
            <AddPlanModal openModal={openModal} onClose={() => setOpenModal(false)} />
            <div>
                <Loader isLoading={isLoading}>
                    {plans ? <CheckboxGenericComponent dataType="plans" displayedValue="title" dataList={plans} onSelect={submissionHandleElement} /> : <h1>{noPlans}</h1>}
                </Loader>
            </div>
        </div>
    );
}


export default Plans;