import { withLazyComponent } from 'utils/lazyComponent'
import React, { useState, useEffect, useCallback, SetStateAction } from 'react'
import Button from 'components/atoms/Button'
import styled from 'styled-components'
import { exerciseService } from 'services/exerciseService'
import { useHistory } from 'react-router-dom'
import { Formik, Field, Form } from 'formik'
import * as Yup from 'yup'
import { translate } from 'utils/Translation'
import { EXERCISES_URL, imageUrl } from 'services/utils'
import AttachmentPreview from 'components/molecules/AttachmentPreview'
import {
  useNotificationContext,
  ADD,
} from 'support/context/NotificationContext'
import {
  acceptedImageFileType,
  acceptedFiles,
  maxPhotoSize,
  maxVideoSize,
  acceptedVideoFileType,
} from 'support/magicVariables'

import { useThemeContext } from 'support/context/ThemeContext'
import { ExerciseViewModel } from "../../../Types/PlanfiApi/Models/ViewModels/ExerciseViewModel";
import axios from 'axios'
import Cookies from 'js-cookie'
import ProgressBar from 'components/molecules/ProgressBar';

const Nav = withLazyComponent(React.lazy(() => import('components/atoms/Nav')))
const GlobalTemplate = withLazyComponent(
  React.lazy(() => import('templates/GlobalTemplate'))
)
const BackTopNav = withLazyComponent(
  React.lazy(() => import('components/molecules/BackTopNav'))
)
const Paragraph = withLazyComponent(
  React.lazy(() => import('components/atoms/Paragraph'))
)
const Label = withLazyComponent(
  React.lazy(() => import('components/atoms/Label'))
)
const Input = withLazyComponent(
  React.lazy(() => import('components/molecules/Input'))
)
const TextArea = withLazyComponent(
  React.lazy(() => import('components/molecules/TextArea'))
)
const ErrorMessageForm = withLazyComponent(
  React.lazy(() => import('components/atoms/ErrorMessageForm'))
)
const AddFiles = withLazyComponent(
  React.lazy(() => import('components/molecules/AddFiles'))
)

const initialValues = {
  name: undefined,
  description: undefined,
  repeats: undefined,
  times: undefined,
  series: undefined,
  weight: undefined,
  files: undefined,
}

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
`

const validationSchema = Yup.object({
  exerciseName: Yup.string(),
  exerciseDescription: Yup.string(),
})

const EditExercise = (props: { location: { state: { exercise: { exerciseId: any } | undefined; selectedExercise: any; id: string | Blob } } }) => {

  const { theme } = useThemeContext()
  const [selectedFiles, setSelectedFiles] = useState<string[] | any>([])
  const [previewFiles, setPreviewFiles] = useState<any>([])
  const [uploadPercentage, setUploadPercentage] = useState<any>(0)
  const [filesToDelete, setFilesToDelete] = useState<string[]>([])
  const { notificationDispatch } = useNotificationContext()
  const [exerciseData, setExerciseData] = useState<ExerciseViewModel | any>([])
  const [loading, setLoading] = useState<boolean>(false)
  const history = useHistory();

  const currentUrl = window.location.href
  let id: string = currentUrl.substring(currentUrl.lastIndexOf('/') + 1)


  const fileNotification = (message: string) => {
    notificationDispatch({
      type: ADD,
      payload: {
        content: { success: 'OK', message },
        type: 'error',
      },
    })
  }

  const getExercise = useCallback((id: string) => {
    exerciseService
      .getExerciseById(id)
      .then((data: ExerciseViewModel) => {
        setExerciseData(data)
        if (data.filesUrl.length == 0) {
          setSelectedFiles([])
        } else {
          setSelectedFiles(data.filesUrl)
        }
        setPreviewFiles(data.filesUrl)
      })
      .catch((error) => { })
  }, [])

  useEffect(() => {
    getExercise(id)
  }, [])

  const resetFileInput = () => {
    (document.getElementById('choose-file-button') as HTMLInputElement).value = "";
  }

  const onSubmit = (values: any) => {
    console.log(values)
    const formData = new FormData()
    formData.append(
      'Name',
      values.name === undefined ? exerciseData.name : values.name
    )
    formData.append(
      'Description',
      values.description === undefined
        ? exerciseData.description
        : values.description
    )

    for (let i = 0; i < selectedFiles.length; i++) {

      if (typeof selectedFiles[i] === 'string') {
        formData.append('Files', selectedFiles[i])
      }
      else {
        formData.append('FilesToAdd', selectedFiles[i])
      }
    }

    for (let i = 0; i < filesToDelete.length; i++) {
      formData.append('FilesToDelete', filesToDelete[i].slice(0, -1))
    }

    formData.append('CategoryId', props.location.state.id)

    setLoading(true)

    const options = {
      headers: { Authorization: `Bearer ${Cookies.get('JWT')}` },

      onUploadProgress: (progressEvent: { loaded: any; total: any }) => {
        const { loaded, total } = progressEvent
        let percent = Math.floor((loaded * 100) / total)
        if (percent < 100) {
          setUploadPercentage(percent)
        }
      },
    }

    axios
      .put(`${EXERCISES_URL}/${exerciseData.exerciseId}`, formData, options)
      .then((res: any) => {
        //@ts-ignore
        setUploadPercentage(100, () => { setTimeout(() => { setUploadPercentage(0) }, 1000) })
        notificationDispatch({
          type: ADD,
          payload: {
            content: { success: 'OK', message: translate('ExerciseEdited') },
            type: 'positive',
          },
        })
        setLoading(false)
        history.push({
          pathname: `/exercises/${id}`,
          //@ts-ignore
          state: { id: id },
        })
      })
      .catch((error) => {
        console.log(error)
        notificationDispatch({
          type: ADD,
          payload: {
            content: { error, message: error.data.message },
            type: 'error',
          },
        })
      })
  }


  const triggerFileUploadButton = () => {
    (document.getElementById('choose-file-button') as HTMLInputElement).click();
  }

  const handleImageChange = (e: { target: { files: Iterable<unknown> | ArrayLike<unknown> } }) => {

    Array.from(e.target.files).map((File: any, i: number) => {
      if (File.size > maxPhotoSize) {
        if (acceptedImageFileType.includes(File.type)) {
          fileNotification(
            `File size is too big ${File.name}. Photo size limit is 10 MB`
          )
          resetFileInput()
          return
        }
      }

      if (File.size > maxVideoSize) {
        if (acceptedVideoFileType.includes(File.type)) {
          fileNotification(
            `File size is too big ${File.name}. Video size limit is 30 MB`
          )
          resetFileInput()
          return
        }
      }

      if (!acceptedFiles.includes(File.type)) {
        fileNotification(
          'Invalid file type. allowed files mp4, jpeg, jpg, png, gif'
        )
        resetFileInput()
        return
      }

      setSelectedFiles((x: string | any[]) => x.concat(File))
    })
  }

  const removeFile = (currentPhoto: string) => {
    const listWithRemovedElement = selectedFiles.filter(
      (file: string) => file !== currentPhoto
    )
    setFilesToDelete([...filesToDelete, currentPhoto])
    setSelectedFiles(listWithRemovedElement)
    resetFileInput()
  }

  const renderAttachmentsPreview = (source: any[]) => {
    if (source) {
      if (source.length > 0) {
        return (
          <ImagePreviewContainer id="image-preview-container">
            {source.map((photo: any, i: number) => (
              <AttachmentPreview
                attachmentSrc={photo}
                type={photo.Type}
                key={photo}
                remove={() => removeFile(photo)}
              />
            ))}
          </ImagePreviewContainer>
        )
      }
    }
  }

  return (
    <>
      <GlobalTemplate>
        {loading ? (
          <ProgressBar
            bgcolor={theme.colorPrimaryDefault}
            progress={uploadPercentage}
            height={4}
          />
        ) : (
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
                </Nav>
                <Field
                  typeInput="no-border"
                  placeholder={exerciseData ? exerciseData.name : "Exercise Name"}
                  type="text"
                  name="name"
                  as={Input}
                  error={errors.name && touched.name}
                  autoFocus={true}
                />
                <ErrorMessageForm name="exerciseName" />
                <AddFiles
                  triggerFileUploadButton={triggerFileUploadButton}
                  handleImageChange={handleImageChange}
                />
                {renderAttachmentsPreview(selectedFiles)}
                <Field
                  typeInput="no-border-sm"
                  placeholder={exerciseData ? exerciseData.description : 'Description'}
                  type="text"
                  name="description"
                  as={Input}
                />
                <Button
                  type="submit"
                  //@ts-ignore
                  buttonType="primary"
                  size="lg"
                  buttonPlace="bottom"
                >
                  {translate('Save')}
                </Button>
              </Form>
            )}
          </Formik>
        )}
      </GlobalTemplate>
    </>
  )
}


export default EditExercise
