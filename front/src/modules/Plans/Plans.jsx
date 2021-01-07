import React, { useState, useEffect } from 'react';
import { planService } from 'services/planService';
import styled from 'styled-components';
import { commonUtil } from 'utils/common.util';
import 'react-multi-carousel/lib/styles.css';
import Search from 'components/molecules/Search';
import { translate } from 'utils/Translation';
import { CheckboxGenericComponent } from 'components/organisms/CheckboxGeneric';
import GlobalTemplate, { Nav } from 'templates/GlobalTemplate';
import { useThemeContext } from 'support/context/ThemeContext';
import SmallButton from 'components/atoms/SmallButton';
import { useNotificationContext, ADD } from 'support/context/NotificationContext';
import AddPlanModal from './AddPlanModal';
import PlansPanel from './PlansPanel';
import { useUserContext } from '../../support/context/UserContext';

//todo - add loader

const IconWrapper = styled.div`
    margin-top: .4rem;
`;

const Plan = (props) => {

    const { notificationDispatch } = useNotificationContext();
    const { theme } = useThemeContext();
    const { user } = useUserContext();
    
    const [plans, setPlans] = useState([]);
    const [searchTerm, setSearchTerm] = React.useState("");
    const [openModal, setOpenModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [bottomSheet, setBottomSheet] = useState('none')
    const [isLoading, setIsLoading] = useState(false)
    const [selectedPlans, setSelectedPlans] = useState([])

    const { match } = props;
    let id = match.params.id;

    const deletePlans = () => {
        planService
            .deletePlans(selectedPlans)
            .then(() => {
                setBottomSheet('none')
                notificationDispatch({
                    type: ADD,
                    payload: {
                        content: { success: 'OK', message: translate('PlansDeleted') },
                        type: 'positive'
                    }
                })
            })
            .catch((error) => {
                notificationDispatch({
                    type: ADD,
                    payload: {
                        content: { error: error, message: translate('ErrorAlert') },
                        type: 'error'
                    }
                })
            });
    };

    const getPlans = (id) => {
        planService
            .getOrganizationPlans(id)
            .then((data) => {
                setPlans(data);
            })
            .catch((error) => {
                console.error(error)
            });
    }

    useEffect(() => {
        getPlans(user.organizationId)
    }, [id, openModal, openEditModal, setOpenEditModal]);

    const closeModal = () => {
        setOpenModal(false)
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
                    {plans && <h2>{translate('PlansTitle')}</h2>}
                    {plans &&
                    <SmallButton iconName="plus" onClick={() => setOpenModal(true)} />
                    }
                </Nav>
                <Search callBack={filterPlans} placeholder={translate('PlanSearch')} />
                {plans.length >= 1 ?
                    <CheckboxGenericComponent
                        dataType="plans"
                        displayedValue={"title"}
                        dataList={results}
                        onSelect={submissionHandleElement} />
                    : <p>{translate('NoPlans')}</p>}
            </GlobalTemplate>
            <AddPlanModal theme={theme} openModal={openModal} onClose={closeModal} />
            <PlansPanel
                deletePlans = {deletePlans}
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
