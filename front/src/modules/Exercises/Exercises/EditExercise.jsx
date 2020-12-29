import { withLazyComponent } from 'utils/lazyComponent';
import React, { useState, useEffect } from 'react';
import Button from "components/atoms/Button"
import styled from 'styled-components';
import { exerciseService } from 'services/exerciseService';
import Counter from "components/atoms/Counter"
import { useHistory } from "react-router-dom";
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { Headline } from 'components/typography';
import { translate } from 'utils/Translation';
const Nav = withLazyComponent(React.lazy(() => import('components/atoms/Nav')));
const GlobalTemplate = withLazyComponent(React.lazy(() => import('templates/GlobalTemplate')));
const BackTopNav = withLazyComponent(React.lazy(() => import('components/molecules/BackTopNav')));
const Paragraph = withLazyComponent(React.lazy(() => import('components/atoms/Paragraph')));
const Label = withLazyComponent(React.lazy(() => import('components/atoms/Label')));
const Input = withLazyComponent(React.lazy(() => import('components/molecules/Input')));
const TextArea = withLazyComponent(React.lazy(() => import('components/molecules/TextArea')));
const ErrorMessageForm = withLazyComponent(React.lazy(() => import('components/atoms/ErrorMessageForm')));

const initialValues = {
    exerciseName: '',
    exerciseDescription: '',
    times: '',
    series: '',
    weight: '',
    file: '',
};

const ImagePreviewContainer = styled.div`
   margin-top: 2rem;
   display: grid;
   grid-template-columns: repeat(4, 5rem);
   grid-template-rows: 5rem;
   grid-gap: .8rem;
   img {
       height:4.2rem;
       width:4.2rem;
   }
`;

const StyledTextArea = styled(TextArea)`
  height: 28.3rem;
`;

const ContainerDescription = styled.div`
  margin-top: 2rem;
`;

const ExerciseEditItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin:1.8rem 1.8rem;
`;

const validationSchema = Yup.object({
    exerciseName: Yup.string(),
    exerciseDescription: Yup.string(),
});


const EditExercise = (props) => {

    const exercisesEdited = "Exercise succesfully edited!"
    const EditExercise = "Edit Exercise"
    const EditExerciseInfo = "Edit Exercise"
    const Times = "Times"
    const Series = "Series"
    const Weight = "Weight"
    const Edit = "Edit"

    let id;
    if(props.location.state.exercise != undefined){
     id = props.location.state.exercise.exerciseId
    }
    else{
        id = props.location.state.selectedExercise
    }

    useEffect(() => {
        getExercise(id);
    }, []);

    const getExercise = (id) => {
        exerciseService
            .getExerciseById(id)
            .then((data) => {
                console.log(data)
                setExerciseData(data);
            })
            .catch((error) => {
            });
    }

    const [initialExerciseData] = useState()
    const [exerciseData, setExerciseData] = useState([])
    const [errors, setErrors] = useState({})
    const history = useHistory();
    const requiredFields = ["name", "description"];

    const onSubmit = () => {
        console.log('test')
    }

    const submit = (e) => {
        editExercise(exerciseData)
    }

    const editExercise = () => {

        const formData = new FormData();
        formData.append("Name", exerciseData.name == null ? initialExerciseData.name : exerciseData.name)
        formData.append("Description", exerciseData.description == null ? initialExerciseData.description : exerciseData.description)
        formData.append("Times", exerciseData.times == null ? initialExerciseData.times : exerciseData.times)
        formData.append("Series", exerciseData.series == null ? initialExerciseData.series : exerciseData.series)
        formData.append("Weight", exerciseData.weight == null ? initialExerciseData.weight : exerciseData.weight)
        if (exerciseData.files != null) {
            for (let i = 0; i < exerciseData.files.length; i++) {
                formData.append(`Files`, exerciseData.files[i])
            }
        }
        formData.append("CategoryId", props.location.state.id)

        exerciseService
            .editExercise(initialExerciseData.exerciseId, formData)
            .then(() => {
                history.push({
                    pathname: `/exercise/${initialExerciseData.exerciseId}`,
                    state: { id: initialExerciseData.exerciseId }
                })
            })
            .catch((error) => {
            });
    }

    const handleSeries = (data) => {
        setExerciseData({ ...exerciseData, series: data + 1 })
    }

    const handleTime = (data) => {
        setExerciseData({ ...exerciseData, times: data + 1 })
    }

    const handleWeight = (data) => {
        setExerciseData({ ...exerciseData, weight: data + 1 })
    }

    const handleRepeat = (data) => {
        setExerciseData({ ...exerciseData, repeat: data + 1 })
    }

    const handleFileData = (data) => {
        setExerciseData({ ...exerciseData, files: data })
    }

    return (
        <>
            <GlobalTemplate>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                    validateOnChange={false}
                >
                    {({ errors, touched, isValid }) => (
                        <Form>
                            <Nav>
                                <BackTopNav text={translate('EditExercise')} />
                                <Button size="sm" buttonType="primary" type="submit" onClick={submit} disabled={!isValid}>{translate('Save')}</Button>
                            </Nav>
                            <Paragraph type="body-3-regular">{translate('EditExerciseInfo')}</Paragraph>
                            <Label text={translate('ExerciseName')}>
                                <Field placeholder={exerciseData.name} type="text" name="exerciseName" as={Input} error={errors.exerciseName && touched.exerciseName} />
                            </Label>
                            <ErrorMessageForm name="exerciseName" />
                            {/* todo - deleting and adding files when editing */}
                            <ImagePreviewContainer id="image-preview-container">
                                {exerciseData.files && exerciseData.files.map((file, i) =>
                                    <img className="exercise-image" key={i} alt={i} src={`data:image/jpeg;base64,${file}`} />)}
                            </ImagePreviewContainer>
                            <ContainerDescription>
                                <Label text={translate('AddExerciseDescription')}>
                                    <Field placeholder={exerciseData.description} type="text" name="exerciseDescription" as={StyledTextArea} />
                                </Label>
                            </ContainerDescription>
                            <ExerciseEditItem>
                                <Headline>{translate('Repeat')}</Headline>
                                <Counter 
                                    fill={'#FFFFFF'}
                                    defaultValue={exerciseData.repeats}
                                    valueToChange={1}
                                    handleData={handleRepeat}
                                    unit={''} />
                            </ExerciseEditItem>

                            <ExerciseEditItem>
                                <Headline>{translate('ExerciseTime')}</Headline>
                                <Counter
                                    fill={'#FFFFFF'}
                                    defaultValue={exerciseData.times}
                                    valueToChange={30}
                                    handleData={handleTime}
                                    unit={'s'} />
                            </ExerciseEditItem>

                            <ExerciseEditItem>
                                <Headline>{translate('Series')}</Headline>
                                <Counter
                                    fill={'#FFFFFF'}
                                    defaultValue={exerciseData.series}
                                    valueToChange={1}
                                    handleData={handleSeries}
                                    unit={''} />
                            </ExerciseEditItem>

                            <ExerciseEditItem>
                                <Headline>{translate('Weight')}</Headline>
                                <Counter
                                    fill={'#FFFFFF'}
                                    defaultValue={exerciseData.weight}
                                    valueToChange={5}
                                    handleData={handleWeight}
                                    unit={'kg'} />
                            </ExerciseEditItem>
                        </Form>
                    )}
                </Formik>
            </GlobalTemplate>


        </>
    );
}

export default EditExercise;
