import React from 'react';
import styled from 'styled-components';
import ReturnWithTitle from 'components/molecules/ReturnWithTitle';
import { translate } from 'utils/Translation';
import ExerciseTemplate from 'templates/ExerciseTemplate';
import Button from 'components/atoms/Button';
import Paragraph from 'components/atoms/Paragraph';
import Label from 'components/atoms/Label';
import Input from 'components/molecules/Input';
import Icon from 'components/atoms/Icon';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import ErrorMessageForm from 'components/atoms/ErrorMessageForm';
import TextArea from 'components/molecules/TextArea';

const ContainerTopBeam = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

const WrapperAttachments = styled.div`
  display: flex;
  margin-top: 2.2rem;
`;

const StyledParagraph = styled(Paragraph)`
  line-height: 0;
  margin: .8rem 0 0 .5rem;
`;

const StyledTextArea = styled(TextArea)`
  height: 28.3rem;
`;

const ContainerDescription = styled.div`
  margin-top: 2rem;
`;

const initialValues = {
  exerciseName: '',
  exerciseDescription: '',
};

const validationSchema = Yup.object({
  exerciseName: Yup.string().required(translate('ThisFieldIsRequired')),
  exerciseDescription: Yup.string().required(translate('ThisFieldIsRequired')),
});

const onSubmit = (values) => {
  console.log(values);
};

const AddExerciseRefactor = () => (
  <ExerciseTemplate>
    <ContainerTopBeam>
      <ReturnWithTitle text={translate('AddExercise')} />
      <Button size="sm" buttonType="primary">{translate('Save')}</Button>
    </ContainerTopBeam>
    <Paragraph type="body-3-regular">{translate('AddExerciseInfo')}</Paragraph>
    {/* eslint-disable-next-line max-len */}
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} validateOnChange={false}>
      {({ errors, touched }) => (
        <Form>
          <Label text={translate('ExerciseName')}>
            <Field type="text" name="exerciseName" as={Input} error={errors.exerciseName && touched.exerciseName} />
          </Label>
          <ErrorMessageForm name="exerciseName" />
          <WrapperAttachments>
            <Icon name="image-plus" fill="white" height="1.5rem" width="1.5rem" />
            <StyledParagraph type="Label-Button">{translate('AddAttachments')}</StyledParagraph>
          </WrapperAttachments>
          <ContainerDescription>
            <Label text={translate('AddExerciseDescription')}>
              <Field type="text" name="exerciseDescription" as={StyledTextArea} error={errors.exerciseDescription && touched.exerciseDescription} />
            </Label>
            <ErrorMessageForm name="exerciseDescription" />
          </ContainerDescription>
        </Form>
      )}
    </Formik>
  </ExerciseTemplate>
);

export default AddExerciseRefactor;
