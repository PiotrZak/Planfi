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
import AttachmentPreview, { TYPE } from 'components/molecules/AttachmentPreview';
import Random from 'utils/Random';
import { useNotificationContext, ADD } from 'support/context/NotificationContext';
import { exerciseService } from 'services/exerciseService';

const ContainerTopBeam = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

const WrapperAttachments = styled.div`
  display: flex;
  margin-top: 2.2rem;
  max-width: 17rem;
`;

const StyledParagraph = styled(Paragraph)`
  line-height: 0;
  margin: .8rem 0 0 .5rem;
  cursor: pointer;
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
   margin-top: 2rem;
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
  exerciseName: Yup.string().max(16, translate('MaxLengthExerciseName')).required(translate('ThisFieldIsRequired')),
  exerciseDescription: Yup.string().notRequired(),
});

const AddExerciseRefactor = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const { notificationDispatch } = useNotificationContext();

  const fileUploadNotification = (message) => {
    notificationDispatch({
      type: ADD,
      payload: {
        content: { success: 'OK', message },
        type: 'error',
      },
    });
  };

  const onSubmit = (values) => {
    const formData = new FormData();
    formData.append('Name', values.exerciseName);
    formData.append('Description', values.exerciseDescription);
    selectedFiles.map((el) => {
      formData.append('Files', el.File);
    });
    exerciseService.addExercise(formData)
      .then(() => {
        console.log('success upload');
      })
      .catch(() => {
        fileUploadNotification(translate('CannotAddExercise'));
      });
  };

  const resetFileInput = () => {
    document.getElementById('choose-file-button').value = '';
  };

  const handleImageChange = (e) => {
    /* if (e.target.files) {
      const filesArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file));

      setSelectedFiles((prevImages) => prevImages.concat(filesArray));
      Array.from(e.target.files).map(
        (file) => URL.revokeObjectURL(file), // avoid memory leak
      );
    } */

    // 'video/mov', 'video/wmv', 'video/fly', 'video/avi', 'video/avchd', 'webm', 'mkv'
    const acceptedImageFileType = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    const acceptedVideoFileType = ['video/mp4'];

    // 30 mb
    const maxPhotoSize = 30000000;
    // 300 mb
    const maxVideoSize = 300000000;
    const maxAttachmentNumber = 5;

    if (e.target.files) {
      Array.from(e.target.files).map((File) => {
        // checking max number of attachment
        if (selectedFiles.length + e.target.files.length > maxAttachmentNumber) {
          fileUploadNotification(translate('AttachmentLimit') + maxAttachmentNumber);
          resetFileInput();
          return true;
        }

        const fileType = File.type;
        const fileSize = File.size;

        // checking if the photo file type is correct
        if (acceptedImageFileType.includes(fileType)) {
          // checking photo file size
          if (fileSize <= maxPhotoSize) {
            // creating file object with unique ID
            const ID = Random(1, 10000);
            const fileData = {
              ID,
              File: URL.createObjectURL(File),
              Type: TYPE.IMAGE,
              VideoType: null,
            };
            // append file object to state
            setSelectedFiles(((prevState) => prevState.concat(fileData)));
          } else {
            // file size if too big alert
            fileUploadNotification(translate('FileSizeIsTooBig') + File.name + translate('AttachmentPhotoIsTooBig'));
            resetFileInput();
          }
          // checking if the video file type is correct
        } else if (acceptedVideoFileType.includes(fileType)) {
          // checking video file size
          if (fileSize <= maxVideoSize) {
            // creating file object with unique ID
            const ID = Random(1, 10000);
            const fileData = {
              ID,
              File: URL.createObjectURL(File),
              Type: TYPE.VIDEO,
              VideoType: fileType,
            };
            // append file object to state
            setSelectedFiles(((prevState) => prevState.concat(fileData)));
          } else {
            // file size if too big alert
            fileUploadNotification(translate('FileSizeIsTooBig') + File.name + translate('AttachmentVideoIsTooBig'));
            resetFileInput();
          }
        } else {
          // invalid file type alert
          fileUploadNotification(translate('InvalidFileType'));
          resetFileInput();
        }
      });
    }
  };

  function removeFile(e) {
    e.stopPropagation();

    // get id of attachment preview
    const id = e.target.id.split('img-prev-')[1];

    // remove attachment
    for (let i = 0; i <= selectedFiles.length; ++i) {
      if (id == selectedFiles[i].ID) {
        const list = [...selectedFiles];
        const updatedList = list.filter((item) => item.ID !== selectedFiles[i].ID);
        setSelectedFiles(updatedList);

        resetFileInput();
        break;
      }
    }
  }

  const renderAttachmentsPreview = (source) => {
    if (source.length > 0) {
      return (
        <ImagePreviewContainer id="image-preview-container">
          {source.map((attachment) => (
            <AttachmentPreview
              attachmentSrc={attachment.File}
              type={attachment.Type}
              videoType={attachment.videoType}
              alt=""
              key={attachment.ID}
              setID={attachment.ID}
              remove={removeFile}
              complete
            />
          ))}
        </ImagePreviewContainer>
      );
    }
  };

  return (
    <ExerciseTemplate>
      {/* eslint-disable-next-line max-len */}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        validateOnChange={false}
      >
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
              <Icon name="image-plus" fill="white" height="1.5rem" width="1.5rem" cursorType="pointer" />
              <StyledParagraph>{translate('AddAttachments')}</StyledParagraph>
              <FileUploadButton id="choose-file-button" onChange={(e) => handleImageChange(e)} multiple />
            </WrapperAttachments>
            {renderAttachmentsPreview(selectedFiles)}
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
