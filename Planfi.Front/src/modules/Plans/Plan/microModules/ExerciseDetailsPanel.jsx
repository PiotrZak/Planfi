import React, { useState } from 'react';
import Icon from 'components/atoms/Icon';
import "react-multi-carousel/lib/styles.css";
import styled from 'styled-components';
import Button from "components/atoms/Button"
import Counter from "components/atoms/Counter"
import { planService } from "services/planService";
import { StyledReactBottomSheetExtended, BottomNav, BottomNavItem } from 'components/organisms/BottomSheet'
import { Headline, MainHeadline } from 'components/typography';
import { useNotificationContext, ADD } from 'support/context/NotificationContext';
import Paragraph from "components/atoms/Paragraph";
import { translate } from 'utils/Translation';
import { weightToChange, timesToChange, Breakpoints, repeatsToChange } from 'support/magicVariables';
import { withLazyComponent } from "utils/lazyComponent";
import { Formik, Form } from "formik";
import { useThemeContext } from 'support/context/ThemeContext';
import Carousel from "react-multi-carousel";
import {uuidv4} from 'utils/common.util'

const Checkbox = withLazyComponent(
    React.lazy(() => import("components/atoms/Checkbox"))
);

const IconWrapper = styled.div`
    margin-top: .4rem;
`;

const ExerciseAddItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin:1.8rem 1.8rem;
`;

const ModalButtonContainer = styled.div`
    position: fixed;
    bottom: 0;
    width: 100%;
`;

const CheckboxContainer = styled.div`
  display: flex;
`;

const initialValues = {
    addNextExercise: false,
};

export const ExerciseDetailsPanel = ({
    planId,
    exercise,
    openExerciseDetailsPlan,
    setOpenExerciseDetailsPlan,
    setBottomSheet,
    refreshData,
}) => {

    const { theme } = useThemeContext();
    const { notificationDispatch } = useNotificationContext();
    const [defaultValue, setDefaultValue] = useState(0)
    const [resetCounter, setResetCounter] = useState(false)
    const [series, setSeries] = useState([])

    const onSubmit = (values) => {

        const exerciseModel = {
            series: series,
            planId: planId,
            exerciseId: [exercise.exerciseId],
        }

        planService
            .assignExercises(exerciseModel)
            .then(() => {
                notificationDispatch({
                    type: ADD,
                    payload: {
                        content: { success: 'OK', message: translate('ExerciseAssignedToPlan') },
                        type: 'positive',
                    },
                });
                refreshData()
                setSeries([])
                values.addNextExercise === true ? returnToExercises() : returnToPlan()
            })
            .catch((error) => {
                notificationDispatch({
                    type: ADD,
                    payload: {
                        content: { error, message: translate('ErrorAlert') },
                        type: 'error',
                    },
                });
            });
    }

    const addSerie = () => {
        setSeries([...series, {
            serieId: uuidv4(),
            weight: 0,
            times: 0,
            repeats: 0,
        }]);

    }

    const handleSerie = (data, index, propertyName) => {
        console.log(propertyName)
        const updatedSeries = [...series];
        updatedSeries[index][propertyName] = data;
        setSeries(updatedSeries);
    }

    const returnToExercises = () => {
        setResetCounter(true)
        setOpenExerciseDetailsPlan('none')
        setBottomSheet('flex')
    }

    const returnToPlan = () => {
        setResetCounter(true)
        setOpenExerciseDetailsPlan('none')
        setBottomSheet('none')
    }

    return (
        <StyledReactBottomSheetExtended
            showBlockLayer={false}
            visible={openExerciseDetailsPlan}
            className={""}
            onClose={() => setOpenExerciseDetailsPlan('none')}
            appendCancelBtn={false}>
            <BottomNav>
                <BottomNavItem onClick={() => returnToExercises()}>
                    <IconWrapper>
                        <Icon name="union" fill={theme.colorGray70} />
                    </IconWrapper>
                </BottomNavItem>
                <BottomNavItem>
                    <MainHeadline>{exercise.name}</MainHeadline>
                </BottomNavItem>
            </BottomNav>


            <Headline onClick={() => addSerie()}>Add new serie</Headline>

            <Carousel swipeable={true} responsive={Breakpoints}>
                {series.map((serie, index) => (
                    <div key={index}>
                        <ExerciseAddItem>
                            <Headline>{translate('Weight')}</Headline>
                            <Counter
                                index={index}
                                propertyName={'weight'}
                                setResetCounter={setResetCounter}
                                resetCounter={resetCounter}
                                defaultValue={defaultValue}
                                initialValueToChange={weightToChange}
                                handleData={handleSerie}
                                initialUnit={'kg'} />
                        </ExerciseAddItem>
                        <ExerciseAddItem>
                            <Headline>{translate('ExerciseTime')}</Headline>
                            <Counter
                                index={index}
                                propertyName={'times'}
                                setResetCounter={setResetCounter}
                                resetCounter={resetCounter}
                                defaultValue={defaultValue}
                                initialValueToChange={timesToChange}
                                handleData={handleSerie}
                                initialUnit={'s'} />
                        </ExerciseAddItem>
                        <ExerciseAddItem>
                            <Headline>{translate('Repeat')}</Headline>
                            <Counter
                                index={index}
                                propertyName={'repeats'}
                                setResetCounter={setResetCounter}
                                resetCounter={resetCounter}
                                defaultValue={defaultValue}
                                initialValueToChange={repeatsToChange}
                                handleData={handleSerie}
                                initialUnit={''} />
                        </ExerciseAddItem>
                        <p>{serie.repeats}</p>
                    </div>
                ))}
            </Carousel>

            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validateOnChange={false}
            >
                {() => (
                    <Form>
                        <CheckboxContainer>
                            <Checkbox
                                checkboxType="formik"
                                type="checkbox"
                                name="addNextExercise"
                            />
                            <Paragraph type="body-3-regular">
                                {translate("AddNextExercise")}
                            </Paragraph>
                        </CheckboxContainer>

                        <ModalButtonContainer>
                            <Button type="submit" buttonType="primary" size="lg" buttonPlace="auth">{translate('AssignToPlan')}</Button>
                        </ModalButtonContainer>
                    </Form>
                )}
            </Formik>
        </StyledReactBottomSheetExtended>
    )
}
