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
import { routes } from 'utils/routes';
import TextArea from "components/molecules/TextArea";
import AttachmentPreview, {
  TYPE,
} from "components/molecules/AttachmentPreview";
import Random from "utils/Random";
import {
  useNotificationContext,
  ADD,
} from "support/context/NotificationContext";
import GlobalTemplate, { Nav } from "templates/GlobalTemplate";
import { useHistory } from "react-router-dom";
import { withLazyComponent } from "utils/lazyComponent";

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
  const { notificationDispatch } = useNotificationContext();

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
      formData.append("Files", selectedFiles[i].File);
    }
    const { id } = props.history.location.state;
    formData.append("CategoryId", id);

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
        if (values.addNextExercise) {
          values.exerciseName = "";
          values.exerciseDescription = "";
          values.addNextExercise = "";
          setSelectedFiles([]);
          setPreviewFiles([]);
          history.push({
            pathname: routes.addExercise,
            state: { id },
          });
        }
        else{
          history.push(`/category/${id}`);
        }
      })
      .catch((error) => {
        notificationDispatch({
          type: ADD,
          payload: {
            content: { error, message: translate("ErrorAlert") },
            type: "error",
          },
        });
      });
  };

  const handleImageChange = (e) => {
    // 'video/mov', 'video/wmv', 'video/fly', 'video/avi', 'video/avchd', 'webm', 'mkv'
    const acceptedImageFileType = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
    ];
    const acceptedVideoFileType = ["video/mp4"];

    // 10 mb
    const maxPhotoSize = 10000000;
    // 30 mb
    const maxVideoSize = 30000000;

    if (e.target.files) {
      Array.from(e.target.files).map((File) => {
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
              File: File,
              Type: TYPE.IMAGE,
              VideoType: null,
            };

            const previewFileData = {
              ID,
              File: URL.createObjectURL(File),
              Type: TYPE.IMAGE,
              VideoType: null,
            };
            // append file object to state
            setSelectedFiles((prevState) => prevState.concat(fileData));
            setPreviewFiles((prevState) => prevState.concat(previewFileData));
          } else {
            // file size if too big alert
            fileNotification(
              `File size is too big ${File.name}. Photo size limit is 10 MB`
            );
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
              File: File,
              Type: TYPE.VIDEO,
              VideoType: fileType,
            };

            const previewFileData = {
              ID,
              File: URL.createObjectURL(File),
              Type: TYPE.IMAGE,
              VideoType: null,
            };
            // append file object to state
            setSelectedFiles((prevState) => prevState.concat(fileData));
            setPreviewFiles((prevState) => prevState.concat(previewFileData));
          } else {
            // file size if too big alert
            fileNotification(
              `File size is too big ${File.name}. Video size limit is 30 MB`
            );
            resetFileInput();
          }
        } else {
          // invalid file type alert
          fileNotification(
            "Invalid file type. allowed files mp4, jpeg, jpg, png, gif"
          );
          resetFileInput();
        }
        return null;
      });
    }
  };

  function removeFile(currentPhoto) {

    for (let i = 0; i <= selectedFiles.length; ++i) {
      if (currentPhoto === selectedFiles[i].ID) {

        const selectedList = [...selectedFiles];
        const previewList = [...previewFiles];

        const updatedSelectedList = selectedList.filter(
          (item) => item.ID !== selectedFiles[i].ID
        );
        const updatedPreviewList = previewList.filter(
          (item) => item.ID !== previewFiles[i].ID
        );
        setSelectedFiles(updatedSelectedList);
        setPreviewFiles(updatedPreviewList);
        resetFileInput();
        break;
      }
    }
  }

  const renderAttachmentsPreview = (source) => {
    if (source.length > 0) {
      return (
        <ImagePreviewContainer id="image-preview-container">
          {source.map((photo) => (
            <AttachmentPreview
              attachmentSrc={photo.File}
              type={photo.Type}
              videoType={photo.videoType}
              alt=""
              key={photo.ID}
              setID={photo.ID}
              remove={() => removeFile(photo.ID)}
              complete
            />
          ))}
        </ImagePreviewContainer>
      );
    }
  };

  return (
    <GlobalTemplate>
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
                checkboxType ="formik"
                type="checkbox"
                name="addNextExercise"
              />
              <Paragraph type="body-3-regular">
              {translate("AddNextExercise")}
              </Paragraph>
              </CheckboxContainer>
            </Form>
          )}
        </Formik>
      </ExerciseTemplate>
    </GlobalTemplate>
  );
};

export default AddExerciseRefactor;
