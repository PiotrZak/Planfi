import React, { useState } from 'react';
import Icon from 'components/atoms/Icon';
import styled from 'styled-components';
import "react-multi-carousel/lib/styles.css";
import Loader from 'components/atoms/Loader';
import { StyledReactBottomSheetExtended, BottomItem } from 'components/organisms/BottomSheet'
import { Headline, Subline } from '../../../../components/typography';
import { translate } from 'utils/Translation';
import Search from "components/molecules/Search"
import { ExerciseDetailsPanel } from '../../../../modules/Plans/Plan/microModules/ExerciseDetailsPanel';

const BottomNav = styled.div`
    display:flex;
    background: ${({ theme }) => theme.white};
`;

const BottomNavItem = styled.div`
    display:flex;
    align-items:center;
    margin:3.6rem 0 0 3.6rem;
`

const SearchContainer = styled.div`
margin: 1.8rem 1.8rem;
`




export const PlansPanel = ({
    planId,
    setAssignExercises,
    allExercises,
    bottomSheet,
    setBottomSheet,
    categories,
    openAssignExercises,
    isLoading,
    refreshData
}) => {

    const [selectedExercise, setSelectedExercise] = useState([])
    const [openExerciseDetailsPlan, setOpenExerciseDetailsPlan] = useState('none')
    const [searchTerm, setSearchTerm] = useState("");

    const openExerciseDetailsPanel = (exercise) => {
        setSelectedExercise(exercise)
        setAssignExercises('none')
        setOpenExerciseDetailsPlan('flex')
    }

    const filterExercises = event => {
        setSearchTerm(event.target.value);
    };

    const results = !searchTerm
        ? allExercises
        : allExercises.filter(exercise =>
            exercise.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
        );

    return (
        <>
            <StyledReactBottomSheetExtended
                showBlockLayer={false}
                className={""}
                visible={bottomSheet}
                onClose={() => setBottomSheet('none')}
                appendCancelBtn={false}>
                <Loader isLoading={isLoading}>
                    <BottomNav>
                        <BottomNavItem onClick={() => setBottomSheet('none')}>
                            <Icon name="arrow-left" fill="#5E4AE3" />
                            <Headline>{translate('SelectCategory')}</Headline>
                        </BottomNavItem>
                    </BottomNav>
                    <SearchContainer>
                    <Search typeInput="light" callBack={filterExercises} placeholder={translate('ExerciseSearch')} />
                    </SearchContainer>
                    {results && results.map((element, i) =>
                        <BottomItem onClick={() => openExerciseDetailsPanel(element)}>
                            <Headline>{element.name}</Headline>
                            <Subline>{`${element.series} / ${element.times}`}</Subline>
                        </BottomItem>
                    )}
                </Loader>
            </StyledReactBottomSheetExtended>
            <ExerciseDetailsPanel
                refreshData ={refreshData}
                setBottomSheet ={setBottomSheet}
                planId={planId}
                setOpenExerciseDetailsPlan={setOpenExerciseDetailsPlan}
                openExerciseDetailsPlan={openExerciseDetailsPlan}
                exercise={selectedExercise}
                setAssignExercises={setAssignExercises} />
        </>

    );
}