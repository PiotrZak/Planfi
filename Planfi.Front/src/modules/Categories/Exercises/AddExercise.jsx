import React, { useState } from "react";
import styled from "styled-components";
import BackTopNav from "components/molecules/BackTopNav";
import { translate } from "utils/Translation";
import ExerciseTemplate from "templates/ExerciseTemplate";
import Button from "components/atoms/Button";
import Paragraph from "components/atoms/Paragraph";
import Label from "components/atoms/Label";
import Input from "components/molecules/Input";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { exerciseService } from "services/exerciseService";
import { routes } from "utils/routes";
import Nav from "components/atoms/Nav";
import TextArea from "components/molecules/TextArea";
import AttachmentPreview, {
  TYPE,
} from "components/molecules/AttachmentPreview";
import Random from "utils/Random";
import {
  useNotificationContext,
  ADD,
} from "support/context/NotificationContext";
import GlobalTemplate from "templates/GlobalTemplate";
import { useHistory } from "react-router-dom";
import { withLazyComponent } from "utils/lazyComponent";
import Loader from 'components/atoms/Loader';
import {
  acceptedFiles,
  acceptedImageFileType,
  maxPhotoSize,
  maxVideoSize,
  acceptedVideoFileType,
} from "support/magicVariables";

const Checkbox = withLazyComponent(
  React.lazy(() => import("components/atoms/Checkbox"))
);
const AddFiles = withLazyComponent(
  React.lazy(() => import("components/molecules/AddFiles"))
);

const StyledTextArea = styled(TextArea)`
  height: 28.3rem;
`;

const ContainerDescription = styled.div`
  margin-top: 2rem;
`;

const CheckboxContainer = styled.div`
  display: flex;
  margin-top: 2rem;
  align-items: center;
`;

const ImagePreviewContainer = styled.div`
  margin-top: 2rem;
  display: grid;
  grid-template-columns: repeat(4, 5rem);
  grid-template-rows: 5rem;
  grid-gap: 0.8rem;
`;

const triggerFileUploadButton = () => {
  document.getElementById("choose-file-button").click();
};

const initialValues = {
  exerciseName: "",
  exerciseDescription: "",
  addNextExercise: false,
};

const validationSchema = Yup.object({
  exerciseName: Yup.string().required(translate("ThisFieldIsRequired")),
  exerciseDescription: Yup.string(),
});

const AddExerciseRefactor = (props) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewFiles, setPreviewFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const { notificationDispatch } = useNotificationContext();

  console.log(props);
  const categoryTitle = props.location.state.categoryTitle;

  const fileNotification = (message) => {
    notificationDispatch({
      type: ADD,
      payload: {
        content: { success: "OK", message },
        type: "error",
      },
    });
  };

  const history = useHistory();

  const resetFileInput = () => {
    document.getElementById("choose-file-button").value = "";
  };

  const onSubmit = (values) => {
    const formData = new FormData();
    formData.append("Name", values.exerciseName);
    formData.append("Description", values.exerciseDescription);
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("Files", selectedFiles[i]);
    }
    const { id } = props.history.location.state;
    formData.append("CategoryId", id);

    setLoading(true)

    exerciseService
      .addExercise(formData)
      .then(() => {
        notificationDispatch({
          type: ADD,
          payload: {
            content: { success: "OK", message: translate("ExerciseAdded") },
            type: "positive",
          },
        });

        setLoading(false)

        if (values.addNextExercise) {
          values.exerciseName = "";
          values.exerciseDescription = "";
          values.addNextExercise = "";
          setSelectedFiles([]);
          setPreviewFiles([]);
          history.push({
            pathname: routes.addExercise,
            state: { id: id, title: categoryTitle },
          });
        } else {
          history.push({
            pathname: `/category/${id}`,
            state: { id: id, title: categoryTitle },
          });
        }
      })
      .catch((error) => {
        console.log(error);
        notificationDispatch({
          type: ADD,
          payload: {
            content: { error, message: error.data.message },
            type: "error",
          },
        });
      });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).map((File) => {

      if (File.size > maxPhotoSize) {
        if (acceptedImageFileType.includes(File.type)) {
          fileNotification(
            `File size is too big ${File.name}. Photo size limit is 10 MB`
          );
          resetFileInput();
          return;
        }
      }

      if (File.size > maxVideoSize) {
        if (acceptedVideoFileType.includes(File.type)) {
          fileNotification(
            `File size is too big ${File.name}. Video size limit is 30 MB`
          );
          resetFileInput();
          return;
        }
      }


      if(!acceptedFiles.includes(File.type)){
        fileNotification(
          "Invalid file type. allowed files mp4, jpeg, jpg, png, gif"
        );
        resetFileInput();
        return;
      }

      setSelectedFiles((prevState) => prevState.concat(File));
      setPreviewFiles((prevState) => prevState.concat(File));
  });
}

  function removeFile(currentPhoto) {
    const listWithRemovedElement = selectedFiles.filter(
      (file) => file !== currentPhoto
    );
    setSelectedFiles(listWithRemovedElement);
    setPreviewFiles(listWithRemovedElement);
    resetFileInput();
  }

  const renderAttachmentsPreview = (previewFiles) => {
    if (previewFiles.length > 0) {
      return (
        <ImagePreviewContainer id="image-preview-container">
          {previewFiles.map((photo) => (
            <AttachmentPreview
              attachmentSrc={photo}
              alt=""
              key={photo.ID}
              remove={() => removeFile(photo)}
            />
          ))}
        </ImagePreviewContainer>
      );
    }
  };

  return (
    <GlobalTemplate>
      {loading ? (
        <Loader isLoading={loading} />
      ) : (
        <ExerciseTemplate>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            validateOnChange={false}
          >
            {({ errors, touched, isValid }) => (
              <Form>
                <Nav>
                  <BackTopNav text={translate("AddExercise")} />
                  <Button
                    size="sm"
                    buttonType="primary"
                    type="submit"
                    disabled={!isValid}
                  >
                    {translate("Save")}
                  </Button>
                </Nav>
                <Paragraph type="body-3-regular">
                  {translate("AddExerciseInfo")}
                </Paragraph>
                <Label text={translate("ExerciseName")}>
                  <Field
                    type="text"
                    name="exerciseName"
                    as={Input}
                    error={errors.exerciseName && touched.exerciseName}
                  />
                </Label>
                <AddFiles
                  triggerFileUploadButton={triggerFileUploadButton}
                  handleImageChange={handleImageChange}
                />
                {renderAttachmentsPreview(previewFiles)}
                <ContainerDescription>
                  <Label text={translate("AddExerciseDescription")}>
                    <Field
                      type="text"
                      name="exerciseDescription"
                      as={StyledTextArea}
                    />
                  </Label>
                </ContainerDescription>
                <CheckboxContainer>
                  <Checkbox
                    checkboxType="formik"
                    type="checkbox"
                    name="addNextExercise"
                  />
                  <Paragraph type="body-2-medium">
                    {translate("AddNextExercise")}
                  </Paragraph>
                </CheckboxContainer>
              </Form>
            )}
          </Formik>
        </ExerciseTemplate>
      )}
    </GlobalTemplate>
  );
};

export default AddExerciseRefactor;
