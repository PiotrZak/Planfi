import React, { useState, useEffect } from 'react';
import { planService } from "services/planService";
import { isMobile } from "react-device-detect";
import Icon from 'components/atoms/Icon';
import styled from 'styled-components';
import { commonUtil } from "utils/common.util"
import "react-multi-carousel/lib/styles.css";
import Search from "components/molecules/Search"
import { translate } from 'utils/Translation';
import BackTopNav from 'components/molecules/BackTopNav';
import StyledReactBottomSheet, { PanelContainer, PanelItem, MobilePanelItem, StyledMobileReactBottomSheet, } from 'components/organisms/BottomSheet'
import { CheckboxGenericComponent } from 'components/organisms/CheckboxGeneric';
import GlobalTemplate, { Nav } from "templates/GlobalTemplate"
import { useNotificationContext, ADD } from 'support/context/NotificationContext';
import { useThemeContext } from 'support/context/ThemeContext';
import AddPlanModal from './AddPlanModal';
import EditPlanModal from "./EditPlanModal";

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

    const [plans, setPlans] = useState();
    const [searchTerm, setSearchTerm] = React.useState("");

    const [openModal, setOpenModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);

    const [bottomSheet, setBottomSheet] = useState('none')
    const [isLoading, setIsLoading] = useState(false)

    const [selectedPlans, setSelectedPlans] = useState([])
    const [selectedElementsBottomSheet, setSelectedElementsBottomSheet] = useState(false)

    const { match } = props;
    let id = match.params.id;

    useEffect(() => {
        getPlans(id)
    }, [id, openModal, openEditModal, setOpenEditModal]);

    const closeModal = () => {
        setOpenModal(false)
    }

    const getPlans = (id) => {
        planService
            .getAllPlans(id)
            .then((data) => {
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
                    {Plan && <h2>{Plan.title}</h2>}
                    {Plan &&
                        <IconWrapper>
                            <Icon onClick={() => setOpenModal(true)} name="plus" fill={theme.colorInputActive} />
                        </IconWrapper>
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

const PlansPanel = ({
    openEditModal,
    setOpenEditModal,
    theme,
    bottomSheet,
    setBottomSheet,
    selectedPlans
}) => {

    const { notificationDispatch } = useNotificationContext();

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

    const closeModal = () => {
        setOpenEditModal(false)
        setBottomSheet('none')
    }

    return (
        <StyledReactBottomSheet
            showBlockLayer={false}
            visible={bottomSheet}
            className={""}
            onClose={() => setBottomSheet(false)}
            appendCancelBtn={false}>
            {isMobile ?
                <>
                    <StyledMobileReactBottomSheet>
                        <PanelItem onClick={() => deletePlans()}>
                            {selectedPlans.length == 1
                                ? <p>{translate('DeletePlan')}</p>
                                : <p>{translate('DeletePlans')}</p>
                            }
                        </PanelItem>
                        {selectedPlans.length < 2 &&
                            <PanelItem onClick={setOpenEditModal}>
                                <p>{translate('EditPlan')}</p>
                            </PanelItem>
                        }
                    </StyledMobileReactBottomSheet>
                </>
                :
                <>
                    <PanelContainer>
                        <PanelItem>
                            <IconWrapper>
                                <Icon name="check" fill={theme.colorInputActive} />
                            </IconWrapper>
                            {selectedPlans.length} {translate('selected')}
                        </PanelItem>
                        <PanelItem onClick={() => deletePlans()}>
                            <Icon name="trash" fill={theme.colorInputActive} />{translate('DeletePlan')}
                        </PanelItem>
                        {selectedPlans.length < 2 &&
                            <PanelItem onClick={setOpenEditModal}>
                                <Icon name="edit" fill={theme.colorInputActive} />{translate('EditCategory')}
                            </PanelItem>
                        }
                    </PanelContainer>
                </>
            }
            <EditPlanModal
                selectedPlans={selectedPlans[0]}
                theme={theme}
                openEditModal={openEditModal}
                onClose={closeModal} />
        </StyledReactBottomSheet>
    )
}

export default Plan;