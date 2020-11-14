import React, { useState } from 'react';
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
import ImagePreview from 'components/molecules/ImagePreview';

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

const FileUploadButton = styled.input.attrs({ type: 'file' })`
  display: none;
`;

const ImagePreviewContainer = styled.div`
   margin-top: .8rem;
   display: grid;
   grid-template-columns: repeat(4, 5rem);
   grid-template-rows: 5rem;
   grid-gap: .8rem;
`;

const triggerFileUploadButton = () => {
  document.getElementById('choose-file-button').click();
};

const initialValues = {
  exerciseName: '',
  exerciseDescription: '',
};

const validationSchema = Yup.object({
  exerciseName: Yup.string().required(translate('ThisFieldIsRequired')),
  exerciseDescription: Yup.string(),
});

const onSubmit = (values) => {
  console.log(values);
};

const AddExerciseRefactor = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleImageChange = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file));

      setSelectedFiles((prevImages) => prevImages.concat(filesArray));
      Array.from(e.target.files).map(
        (file) => URL.revokeObjectURL(file), // avoid memory leak
      );
    }
  };

  const renderPhotos = (source) => {
    if (source.length > 0) {
      return (
        <ImagePreviewContainer id="image-preview-container">
          { source.map((photo) => <ImagePreview imageSrc={photo} alt="" key={photo} complete />)}
        </ImagePreviewContainer>
      );
    }
  };

  return (
    <ExerciseTemplate>
      {/* eslint-disable-next-line max-len */}
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} validateOnChange={false}>
        {({ errors, touched, isValid }) => (
          <Form>
            <ContainerTopBeam>
              <ReturnWithTitle text={translate('AddExercise')} />
              <Button size="sm" buttonType="primary" type="submit" disabled={!isValid}>{translate('Save')}</Button>
            </ContainerTopBeam>
            <Paragraph type="body-3-regular">{translate('AddExerciseInfo')}</Paragraph>
            <Label text={translate('ExerciseName')}>
              <Field type="text" name="exerciseName" as={Input} error={errors.exerciseName && touched.exerciseName} />
            </Label>
            <ErrorMessageForm name="exerciseName" />
            <WrapperAttachments onClick={triggerFileUploadButton}>
              <Icon name="image-plus" fill="white" height="1.5rem" width="1.5rem" />
              <StyledParagraph>{translate('AddAttachments')}</StyledParagraph>
              <FileUploadButton id="choose-file-button" onChange={handleImageChange} multiple />
            </WrapperAttachments>
            {renderPhotos(selectedFiles)}
            <ContainerDescription>
              <Label text={translate('AddExerciseDescription')}>
                <Field type="text" name="exerciseDescription" as={StyledTextArea} />
              </Label>
            </ContainerDescription>
          </Form>
        )}
      </Formik>
    </ExerciseTemplate>
  );
};

export default AddExerciseRefactor;
