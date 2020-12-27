import React from 'react';
import Icon from 'components/atoms/Icon';
import styled from 'styled-components';
import "react-multi-carousel/lib/styles.css";
import Loader from 'components/atoms/Loader';
import { StyledReactBottomSheetExtended, BottomItem } from 'components/organisms/BottomSheet'
import { MainHeadline, Headline, Subline } from '../../../../components/typography';
import { translate } from 'utils/Translation';

const BottomNav = styled.div`
    display:flex;
    background: ${({ theme }) => theme.white};
`;

const BottomNavItem = styled.div`
    display:flex;
    align-items:center;
    margin:3.6rem 0 0 3.6rem;
`

export const PlansPanel = ({
    bottomSheet,
    setBottomSheet,
    categories,
    openAssignExercises,
    isLoading 
}) => {
    return (
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
                {categories ?
                    categories.map((element, i) =>
                        <BottomItem onClick={() => openAssignExercises(element.categoryId)}>
                            <Headline>{element.title}</Headline>
                            <Subline>{`${element.series} / ${element.times}`}</Subline>
                        </BottomItem>
                    )
                    : <p>{translate('NoCategories')}</p>
                }
            </Loader>
        </StyledReactBottomSheetExtended>
    );
}