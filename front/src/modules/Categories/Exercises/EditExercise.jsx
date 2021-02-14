import { withLazyComponent } from "utils/lazyComponent";
import React, { useState, useEffect } from "react";
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
import { weightToChange, timesToChange, seriesToChange, repeatsToChange } from 'support/magicVariables';

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
  const { notificationDispatch } = useNotificationContext();
  const [ifPlanEdited, setIfPlanEdited] = useState(false)

  let id;
  props.location.state.exercise !== undefined 
  ? id = props.location.state.exercise.exerciseId 
  : id = props.location.state.selectedExercise;

  const fileNotification = (message) => {
    notificationDispatch({
      type: ADD,
      payload: {
        content: { success: "OK", message },
        type: "error",
      },
    });
  };

  useEffect(() => {
    if(props.location.state.ifPlanEdited){
      setIfPlanEdited(true)
    }
    getExercise(id);
  }, []);

  const getExercise = (id) => {
    exerciseService
      .getExerciseById(id)
      .then((data) => {
        setExerciseData(data);
        setSelectedFiles(data.files)
        setPreviewFiles(data.files)
      })
      .catch((error) => { });
  };

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
      values.repeats === undefined
        ? exerciseData.repeats
        : values.repeats
    );
    formData.append(
      "Times",
      values.times === undefined
        ? exerciseData.times
        : values.times
    );
    formData.append(
      "Series",
      values.series === undefined
        ? exerciseData.series
        : values.series
    );
    formData.append(
      "Weight",
      values.weight === undefined
        ? exerciseData.weight
        : values.weight
    );

    if (values.files !== undefined) {
      for (let i = 0; i < exerciseData.files.length; i++) {
        formData.append("Files", exerciseData.files[i].File);
      }
    }
    else {
      if(selectedFiles)
      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append("Files", selectedFiles[i].File);
      }
    }

    formData.append("CategoryId", props.location.state.id);

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
      })
  };

  const handleSeries = (data) => {
    setExerciseData({ ...exerciseData, series: data });
  };

  const handleTime = (data) => {
    setExerciseData({ ...exerciseData, times: data  });
  };

  const handleWeight = (data) => {
    setExerciseData({ ...exerciseData, weight: data  });
  };

  const handleRepeat = (data) => {
    setExerciseData({ ...exerciseData, repeats: data });
  };


  const triggerFileUploadButton = () => {
    document.getElementById("choose-file-button").click();
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
    if (source) {
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
              {ifPlanEdited &&
              <>
              <ExerciseEditItem>
                <Headline>{translate("Repeat")}</Headline>
                <Counter
                  fill={"#FFFFFF"}
                  defaultValue={exerciseData.repeats}
                  valueToChange={repeatsToChange}
                  handleData={handleRepeat}
                  unit={""}
                />
              </ExerciseEditItem>

              <ExerciseEditItem>
                <Headline>{translate("ExerciseTime")}</Headline>
                <Counter
                  fill={"#FFFFFF"}
                  defaultValue={exerciseData.times}
                  valueToChange={timesToChange}
                  handleData={handleTime}
                  unit={"s"}
                />
              </ExerciseEditItem>

              <ExerciseEditItem>
                <Headline>{translate("Series")}</Headline>
                <Counter
                  fill={"#FFFFFF"}
                  defaultValue={exerciseData.series}
                  valueToChange={seriesToChange}
                  handleData={handleSeries}
                  unit={""}
                />
              </ExerciseEditItem>

              <ExerciseEditItem>
                <Headline>{translate("Weight")}</Headline>
                <Counter
                  fill={"#FFFFFF"}
                  defaultValue={exerciseData.weight}
                  valueToChange={weightToChange}
                  handleData={handleWeight}
                  unit={"kg"}
                />
              </ExerciseEditItem>
              </>
              }
            </Form>
          )}
        </Formik>
      </GlobalTemplate>
    </>
  );
};

export default EditExercise;
