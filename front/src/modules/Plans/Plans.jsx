import React, { useState, useEffect } from 'react';
import { planService } from "services/planService";
import Icon from 'components/atoms/Icon';
import styled from 'styled-components';
import { commonUtil } from "utils/common.util"
import "react-multi-carousel/lib/styles.css";
import Search from "components/molecules/Search"
import { translate } from 'utils/Translation';
import BackTopNav from 'components/molecules/BackTopNav';
import { CheckboxGenericComponent } from 'components/organisms/CheckboxGeneric';
import GlobalTemplate, { Nav } from "templates/GlobalTemplate"
import { useThemeContext } from 'support/context/ThemeContext';
import AddPlanModal from './AddPlanModal';
import PlansPanel from './PlansPanel';
import {useUserContext} from "../../support/context/UserContext"
import SmallButton from 'components/atoms/SmallButton';

const IconWrapper = styled.div`
    margin-top: .4rem;
`;

//todo
//PlansDeleted
// Delete Plan
// const PlanSearch = "Which plan You need to search?";
// DeletePlan
// EditCategory
// DeletePlans
// EditPlan

const Plan = (props) => {

    const { theme } = useThemeContext();
    const { user } = useUserContext();
    
    const [plans, setPlans] = useState();
    const [searchTerm, setSearchTerm] = React.useState("");
    const [openModal, setOpenModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [bottomSheet, setBottomSheet] = useState('none')
    const [isLoading, setIsLoading] = useState(false)
    const [selectedPlans, setSelectedPlans] = useState([])

    const { match } = props;
    let id = match.params.id;

    useEffect(() => {
        getPlans(user.organizationId)
    }, [id, openModal, openEditModal, setOpenEditModal]);

    const closeModal = () => {
        setOpenModal(false)
    }

    const getPlans = (id) => {
        //organizationId
        planService
            .getOrganizationPlans(id)
            .then((data) => {
                console.log(data)
                setPlans(data);
            })
            .catch((error) => {
            });
    }

    const submissionHandleElement = (selectedData) => {
        const selectedPlans = commonUtil.getCheckedData(selectedData, "planId")
        setSelectedPlans(selectedPlans)
        selectedPlans.length > 0 ? setBottomSheet('flex') : setBottomSheet('none');
    }

    const filterPlans = event => {
        setSearchTerm(event.target.value);
    };

    const results = !searchTerm
        ? plans
        : plans.filter(plan =>
            plan.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
        );

    return (
        <>
            <GlobalTemplate>
                <Nav>
                    <BackTopNav />
                    {plans && <h2>{plans.title}</h2>}
                    {plans &&
                    <SmallButton iconName="plus" onClick={() => setOpenModal(true)} />
                    }
                </Nav>
                <Search callBack={filterPlans} placeholder={translate('PlanSearch')} />
                {results ?
                    <CheckboxGenericComponent
                        dataType="plans"
                        displayedValue={"title"}
                        dataList={results}
                        onSelect={submissionHandleElement} />
                    :
                    <p>{translate('NoExercises')}</p>}
            </GlobalTemplate>
            <AddPlanModal theme={theme} openModal={openModal} onClose={closeModal} />
            <PlansPanel
                theme={theme}
                bottomSheet={bottomSheet}
                setBottomSheet={setBottomSheet}
                selectedPlans={selectedPlans}
                setOpenEditModal={setOpenEditModal}
                openEditModal={openEditModal} />
        </>
    );
}

export default Plan;