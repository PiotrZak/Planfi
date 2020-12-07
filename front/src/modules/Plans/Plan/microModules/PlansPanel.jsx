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