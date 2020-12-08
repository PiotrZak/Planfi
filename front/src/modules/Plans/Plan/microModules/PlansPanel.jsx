import React from 'react';
import Icon from 'components/atoms/Icon';
import styled from 'styled-components';
import "react-multi-carousel/lib/styles.css";
import Loader from 'components/atoms/Loader';
import GenericElement from "components/molecules/GenericElement/GenericElement"
import { isMobile } from "react-device-detect";
import { StyledReactBottomSheetExtended, PanelContainer, PanelItem, MobilePanelItem, StyledMobileReactBottomSheet, BottomItem} from 'components/organisms/BottomSheet'
import { MainHeadline, Headline, Subline } from '../../../../components/typography';

const noCategories = "No categories"
const selectCategory = "Select category:"

const BottomNav = styled.div`
    display:flex;
    background: ${({ theme }) => theme.white};
`;

const BottomNavItem = styled.div`
    display:flex;
    align-items:center;
    margin:3.6rem 0 0 3.6rem;
`

export const PlansPanel = ({ bottomSheet, setBottomSheet, categories, openAssignExercises, isLoading }) => {
    return (
        <StyledReactBottomSheetExtended
            showBlockLayer={false}
            className={""}
            visible={bottomSheet}
            onClose={() => setBottomSheet('none')}
            appendCancelBtn={false}>
            <Loader isLoading={isLoading}>
            <BottomNav>
                <BottomNavItem>
                    <Headline>{selectCategory}</Headline>
                </BottomNavItem>
            </BottomNav>
                {categories ?
                    categories.map((element, i) =>
                        <BottomItem onClick={() => openAssignExercises(element.categoryId)}>
                            <Headline>{element.title}</Headline>
                            <Subline>{`${element.series} / ${element.times}`}</Subline>
                        </BottomItem>
                    )
                    : <p>{noCategories}</p>
                }
            </Loader>
        </StyledReactBottomSheetExtended>
    );
}