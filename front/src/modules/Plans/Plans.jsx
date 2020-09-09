import React, { useState, useEffect } from 'react';
import { planService } from "./../../services/planService";
import Icon from "./../../../src/common/Icon"
import Return from "./../../common/Return"
import Button from "./../../common/GenericElement/GenericElement"
import AddPlanModal from "./AddPlanModal";

export const Plans = () => {
    const [plans, setPlans] = useState();
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        planService
            .getAllPlans()
            .then((data) => {
                setPlans(data);
            })
            .catch(() => {
            });
    }, [setOpenModal, openModal]);

    const openAddPlanModal = () => {
        setOpenModal(!openModal)
    }

    const noplans = "No plans"
    const plansTitle = "Plans"
    const addExerciseToCategory = "To be able to add exercises you need to add a category first"


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
                {plans ? plans.map((plan) => <Button headline={plan.title} plan={plan} />)
                    : noplans + addExerciseToCategory}
            </div>
        </div>
    );
}


export default Plans;