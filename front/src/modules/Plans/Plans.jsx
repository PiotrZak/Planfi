import React, { useState, useEffect, useCallback } from 'react';
import { planService } from "services/planService";
import { Link } from 'react-router-dom';
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

const IconWrapper = styled.div`
    margin-top: .4rem;
`;

//todo
const PlanSearch = "Which plan You need to search?";

const Plan = (props) => {

    const { theme } = useThemeContext();

    const [plans, setPlans] = useState();
    const [exercises, setExercises] = useState();
    const [searchTerm, setSearchTerm] = React.useState("");
    const [openModal, setOpenModal] = useState(false);

    const [isLoading, setIsLoading] = useState(false)

    //todo
    const [selectedExercise, setselectedExercise] = useState([])
    const [selectedElementsBottomSheet, setSelectedElementsBottomSheet] = useState(false)
    const [bottomSheet, setBottomSheet] = useState('none')

    const { match } = props;
    let id = match.params.id;

    useEffect(() => {
        getPlans(id)
    }, [id]);

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
        const selectedExercises = commonUtil.getCheckedData(selectedData, "planId")
        setselectedExercise(selectedExercises)
        selectedExercises.length > 0 ? setBottomSheet('flex') : setBottomSheet('none');
    }

    const filterExercises = event => {
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
                <Search callBack={filterExercises} placeholder={translate('PlanSearch')} />
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
            {/* todo */}
        </>
    );
}

export default Plan;