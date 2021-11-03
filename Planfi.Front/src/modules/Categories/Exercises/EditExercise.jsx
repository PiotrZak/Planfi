import { withLazyComponent } from "utils/lazyComponent";
import React, { useState, useEffect, useCallback } from "react";
import Button from "components/atoms/Button";
import styled from "styled-components";
import { exerciseService } from "services/exerciseService";
import Counter from "components/atoms/Counter";
import { useHistory } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { Headline } from "components/typography";
import { translate } from "utils/Translation";
import Random from "utils/Random";
import AttachmentPreview, {
  TYPE,
} from "components/molecules/AttachmentPreview";
import {
  useNotificationContext,
  ADD,
} from "support/context/NotificationContext";
import {
  weightToChange,
  timesToChange,
  seriesToChange,
  repeatsToChange,
  acceptedImageFileType,
  maxPhotoSize,
  maxVideoSize,
  acceptedVideoFileType,
} from "support/magicVariables";

const Nav = withLazyComponent(React.lazy(() => import("components/atoms/Nav")));
const GlobalTemplate = withLazyComponent(
  React.lazy(() => import("templates/GlobalTemplate"))
);
const BackTopNav = withLazyComponent(
  React.lazy(() => import("components/molecules/BackTopNav"))
);
const Paragraph = withLazyComponent(
  React.lazy(() => import("components/atoms/Paragraph"))
);
const Label = withLazyComponent(
  React.lazy(() => import("components/atoms/Label"))
);
const Input = withLazyComponent(
  React.lazy(() => import("components/molecules/Input"))
);
const TextArea = withLazyComponent(
  React.lazy(() => import("components/molecules/TextArea"))
);
const ErrorMessageForm = withLazyComponent(
  React.lazy(() => import("components/atoms/ErrorMessageForm"))
);
const AddFiles = withLazyComponent(
  React.lazy(() => import("components/molecules/AddFiles"))
);

const initialValues = {
  name: undefined,
  description: undefined,
  repeats: undefined,
  times: undefined,
  series: undefined,
  weight: undefined,
  files: undefined,
};

const ImagePreviewContainer = styled.div`
  margin-top: 2rem;
  display: grid;
  grid-template-columns: repeat(4, 5rem);
  grid-template-rows: 5rem;
  grid-gap: 0.8rem;
  img {
    height: 4.2rem;
    width: 4.2rem;
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
  margin: 1.8rem 1.8rem;
`;

const validationSchema = Yup.object({
  exerciseName: Yup.string(),
  exerciseDescription: Yup.string(),
});

const EditExercise = (props) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewFiles, setPreviewFiles] = useState([]);
  const [filesToDelete, setFilesToDelete] = useState([]);
  const { notificationDispatch } = useNotificationContext();
  const [ifPlanEdited, setIfPlanEdited] = useState(false);

  let id;

  props.location.state.exercise !== undefined
    ? (id = props.location.state.exercise.exerciseId)
    : (id = props.location.state.selectedExercise);

  const fileNotification = (message) => {
    notificationDispatch({
      type: ADD,
      payload: {
        content: { success: "OK", message },
        type: "error",
      },
    });
  };

  const getExercise = useCallback((id) => {
    exerciseService
      .getExerciseById(id)
      .then((data) => {
        setExerciseData(data);
        setSelectedFiles(data.files);
        setPreviewFiles(data.files);
      })
      .catch((error) => {});
  }, []);

  useEffect(() => {
    if (props.location.state.ifPlanEdited) {
      setIfPlanEdited(true);
    }
    getExercise(id);
  }, []);

  const resetFileInput = () => {
    document.getElementById("choose-file-button").value = "";
  };

  const [exerciseData, setExerciseData] = useState([]);
  const history = useHistory();

  const onSubmit = (values) => {
    const formData = new FormData();
    formData.append(
      "Name",
      values.name === undefined ? exerciseData.name : values.name
    );
    formData.append(
      "Description",
      values.description === undefined
        ? exerciseData.description
        : values.description
    );
    formData.append(
      "Repeats",
      values.repeats === undefined ? exerciseData.repeats : values.repeats
    );
    formData.append(
      "Times",
      values.times === undefined ? exerciseData.times : values.times
    );
    formData.append(
      "Series",
      values.series === undefined ? exerciseData.series : values.series
    );
    formData.append(
      "Weight",
      values.weight === undefined ? exerciseData.weight : values.weight
    );

    for (let i = 0; i < selectedFiles.length; i++) {
        formData.append("Files", selectedFiles[i].File)
    }

    for (let i = 0; i < filesToDelete.length; i++) {
      formData.append("FilesToDelete", filesToDelete[i]);
    }

    formData.append("CategoryId", props.location.state.id);
    console.log(formData);

    exerciseService
      .editExercise(id, formData)
      .then(() => {
        notificationDispatch({
          type: ADD,
          payload: {
            content: { success: "OK", message: translate("ExercisesEdited") },
            type: "positive",
          },
        });
        history.push({
          pathname: `/exercises/${id}`,
          state: { id: id },
        });
      })
      .catch((error) => {
        notificationDispatch({
          type: ADD,
          payload: {
            content: { error: error, message: translate("AlertError") },
            type: "error",
          },
        });
      });
  };

  const handleSeries = (data) => {
    setExerciseData({ ...exerciseData, series: data });
  };

  const handleTime = (data) => {
    setExerciseData({ ...exerciseData, times: data });
  };

  const handleWeight = (data) => {
    setExerciseData({ ...exerciseData, weight: data });
  };

  const handleRepeat = (data) => {
    setExerciseData({ ...exerciseData, repeats: data });
  };

  const triggerFileUploadButton = () => {
    document.getElementById("choose-file-button").click();
  };

  const handleImageChange = (e) => {
    if (e.target.files) {
      Array.from(e.target.files).map((File) => {
        if (acceptedImageFileType.includes(File.type)) {
          if (File.size <= maxPhotoSize) {
            setSelectedFiles((prevState) => prevState.concat(File));
            setPreviewFiles((prevState) => prevState.concat(File));
          } else {
            fileNotification(
              `File size is too big ${File.name}. Photo size limit is 10 MB`
            );
            resetFileInput();
          }
        } else if (acceptedVideoFileType.includes(File.type)) {
          if (File.size <= maxVideoSize) {
            setSelectedFiles((prevState) => prevState.concat(File));
            setPreviewFiles((prevState) => prevState.concat(File));
          } else {
            fileNotification(
              `File size is too big ${File.name}. Video size limit is 30 MB`
            );
            resetFileInput();
          }
        } else {
          fileNotification(
            "Invalid file type. allowed files mp4, jpeg, jpg, png, gif"
          );
          resetFileInput();
        }
      });
    }
  };

  function removeFile(currentPhoto) {
    const listWithRemovedElement = selectedFiles.filter(
      (file) => file !== currentPhoto
    );
    setFilesToDelete([...filesToDelete, currentPhoto])
    setSelectedFiles(listWithRemovedElement);
    setPreviewFiles(listWithRemovedElement);
    resetFileInput();
  }

  const renderAttachmentsPreview = (source) => {
    if (source) {
      if (source.length > 0) {
        return (
          <ImagePreviewContainer id="image-preview-container">
            {source.map((photo, i) => (
              <AttachmentPreview
                attachmentSrc={photo}
                type={photo.Type}
                videoType={photo.videoType}
                alt=""
                key={photo}
                remove={() => removeFile(photo)}
                complete
              />
            ))}
          </ImagePreviewContainer>
        );
      }
    }
  };

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
                <BackTopNav text={translate("EditExercise")} />
                <Button
                  size="sm"
                  buttonType="primary"
                  type="submit"
                  onClick={onSubmit}
                  disabled={!isValid}
                >
                  {translate("Save")}
                </Button>
              </Nav>
              <Paragraph type="body-3-regular">
                {translate("EditExerciseDescription")}
              </Paragraph>
              <Label text={translate("ExerciseName")}>
                <Field
                  placeholder={exerciseData.name}
                  type="text"
                  name="name"
                  as={Input}
                  error={errors.name && touched.name}
                />
              </Label>
              <ErrorMessageForm name="exerciseName" />
              <AddFiles
                triggerFileUploadButton={triggerFileUploadButton}
                handleImageChange={handleImageChange}
              />
              {renderAttachmentsPreview(previewFiles)}
              <ContainerDescription>
                <Label text={translate("AddExerciseDescription")}>
                  <Field
                    placeholder={exerciseData.description}
                    type="text"
                    name="description"
                    as={StyledTextArea}
                  />
                </Label>
              </ContainerDescription>
              {ifPlanEdited && (
                <>
                  <ExerciseEditItem>
                    <Headline>{translate("Repeat")}</Headline>
                    <Counter
                      fill={"#FFFFFF"}
                      defaultValue={exerciseData.repeats}
                      initialValueToChange={repeatsToChange}
                      handleData={handleRepeat}
                      initialUnit={""}
                    />
                  </ExerciseEditItem>

                  <ExerciseEditItem>
                    <Headline>{translate("ExerciseTime")}</Headline>
                    <Counter
                      fill={"#FFFFFF"}
                      defaultValue={exerciseData.times}
                      initialValueToChange={timesToChange}
                      handleData={handleTime}
                      initialUnit={"s"}
                    />
                  </ExerciseEditItem>

                  <ExerciseEditItem>
                    <Headline>{translate("Series")}</Headline>
                    <Counter
                      fill={"#FFFFFF"}
                      defaultValue={exerciseData.series}
                      initialValueToChange={seriesToChange}
                      handleData={handleSeries}
                      initialUnit={""}
                    />
                  </ExerciseEditItem>

                  <ExerciseEditItem>
                    <Headline>{translate("Weight")}</Headline>
                    <Counter
                      fill={"#FFFFFF"}
                      defaultValue={exerciseData.weight}
                      initialValueToChange={weightToChange}
                      handleData={handleWeight}
                      initialUnit={"kg"}
                    />
                  </ExerciseEditItem>
                </>
              )}
            </Form>
          )}
        </Formik>
      </GlobalTemplate>
    </>
  );
};

export default EditExercise;
