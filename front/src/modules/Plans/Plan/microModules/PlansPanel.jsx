import React from 'react';
import Icon from 'components/atoms/Icon';
import styled from 'styled-components';
import "react-multi-carousel/lib/styles.css";
import Loader from 'components/atoms/Loader';
import GenericElement from "components/molecules/GenericElement/GenericElement"
import { isMobile } from "react-device-detect";
import { StyledReactBottomSheetExtended, PanelContainer, PanelItem, MobilePanelItem, StyledMobileReactBottomSheet, } from 'components/organisms/BottomSheet'

const noCategories = "No categories"
const selectCategory = "Select category:"

const BottomItem = styled.div`
    border:1px solid ${({ theme }) => theme.colorGray90};
    padding:1.6rem;
    color:white;
    margin:1.8rem 1.8rem;
    background: ${({ theme }) => theme.colorGray90};
    border-radius:8px;
    &:hover{
      cursor:pointer;
    }
`

const MainHeadline = styled.h2`
margin: 0 0 0 0;
font-size:2.8rem;
`;

const Headline = styled.h4`
  margin: 0 0 0 0;
  font-size:1.4rem;
`;

const Subline = styled.p`
  margin: 0 0 0 0;
  font-size:1.1rem;
`;

export const PlansPanel = ({ bottomSheet, setBottomSheet, categories, openAssignExercises, isLoading }) => {
    return (
        <StyledReactBottomSheetExtended
            showBlockLayer={false}
            className={""}
            visible={bottomSheet}
            onClose={() => setBottomSheet('none')}
            appendCancelBtn={false}>
            <Loader isLoading={isLoading}>
                <MainHeadline>{selectCategory}</MainHeadline>
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