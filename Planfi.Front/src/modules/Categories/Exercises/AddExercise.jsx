import React, { useState, useCallback, useEffect } from 'react'
import Switch from '@mui/material/Switch';
import styled from 'styled-components'
import BackTopNav from 'components/molecules/BackTopNav'
import { translate } from 'utils/Translation'
import ValidationHint from 'components/atoms/ValidateInvalidData'
import AddCategoryModal from 'modules/Categories/AddCategoryModal'
import Button from 'components/atoms/Button'
import Paragraph from 'components/atoms/Paragraph'
import Label from 'components/atoms/Label'
import Input from 'components/molecules/Input'
import { Formik, Field, Form } from 'formik'
import * as Yup from 'yup'
import { useQuery, gql } from '@apollo/client'
import { useThemeContext } from 'support/context/ThemeContext'
import { routes } from 'utils/routes'
import AttachmentPreview from 'components/molecules/AttachmentPreview'
import Nav from 'components/atoms/Nav'
import {
  useNotificationContext,
  ADD,
} from 'support/context/NotificationContext'
import GlobalTemplate from 'templates/GlobalTemplate'
import { useHistory } from 'react-router-dom'
import { withLazyComponent } from 'utils/lazyComponent'
import ProgressBar from 'components/molecules/ProgressBar';
import {
  acceptedFiles,
  acceptedImageFileType,
  maxPhotoSize,
  maxVideoSize,
  acceptedVideoFileType,
} from 'support/magicVariables'
import axios from 'axios'
import { EXERCISES_URL } from '../../../services/utils'
import { DropdownInput } from 'components/atoms/Dropdown'
import Cookies from 'js-cookie'
import { ErrorText } from 'components/atoms/ValidateInvalidData';


const AddFiles = withLazyComponent(
  React.lazy(() => import('components/molecules/AddFiles'))
)

const CheckboxContainer = styled.div`
  display: flex;
  margin-top: 2rem;
  margin-bottom:2rem;
  align-items: center;
`

const ImagePreviewContainer = styled.div`
  margin-top: 2rem;
  margin-bottom:2rem;
  display: grid;
  grid-template-columns: repeat(4, 5rem);
  grid-template-rows: 5rem;
  grid-gap: 0.8rem;
`

const triggerFileUploadButton = () => {
  document.getElementById('choose-file-button').click()
}

const validationSchema = Yup.object({
  exerciseName: Yup.string()
    .max(24, translate('Max24'))
    .required(translate('ThisFieldIsRequired')),
  exerciseDescription: Yup.string(),
})



const AddExercise = (props) => {
  const [selectedFiles, setSelectedFiles] = useState([])
  const [loading, setLoading] = useState(false)
  const { notificationDispatch } = useNotificationContext()
  const { theme } = useThemeContext()
  const [uploadPercentage, setUploadPercentage] = useState(0)
  const [selectedCategoryId, setSelectedCategoryId] = useState()
  const [openModal, setOpenModal] = useState(false)
  const [addExercise, setAddExercise] = useState(false)


  const user = JSON.parse(localStorage.getItem('user'))

  const CATEGORY = gql`{
    categories(where: {organizationId: "${user.organizationId}"})
    {
        title
        categoryId
        exercises
    }
  }
`

  const { loadingCategory, error, data, refetch: _refetch } = useQuery(CATEGORY)

  const refreshData = useCallback(() => {
    setTimeout(() => _refetch(), 200)
  }, [_refetch])

  const fileNotification = (message) => {
    notificationDispatch({
      type: ADD,
      payload: {
        content: { success: 'OK', message },
        type: 'error',
      },
    })
  }

  const history = useHistory()

  const resetFileInput = () => {
    document.getElementById('choose-file-button').value = ''
  }

  const onSubmit = (values) => {
    const formData = new FormData()
    formData.append('Name', values.exerciseName)
    formData.append('Description', values.exerciseDescription)
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append('Files', selectedFiles[i])
    }
    formData.append('CategoryId', selectedCategoryId)

    setLoading(true)

    const options = {
      headers: { Authorization: `Bearer ${Cookies.get('JWT')}` },

      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent
        let percent = Math.floor((loaded * 100) / total)
        console.log(`${loaded}kb of ${total}kb | ${percent}%`)

        if (percent < 100) {
          setUploadPercentage(percent)
        }
      },
    }

    //carefull todo - there is authorization outside of http layer - cause there is onUpload Progress - refator when applying to edit.

    axios
      .post(`${EXERCISES_URL}/create`, formData, options)
      .then((res) => {
        setUploadPercentage(100, () => {
          setTimeout(() => {
            setUploadPercentage(0)
          }, 1000)
        })
        notificationDispatch({
          type: ADD,
          payload: {
            content: { success: 'OK', message: translate('ExerciseAdded') },
            type: 'positive',
          },
        })

        setLoading(false)

        if (addExercise) {
          values.exerciseName = ''
          values.exerciseDescription = ''
          values.addNextExercise = ''
          setSelectedFiles([])
          history.push({
            pathname: routes.addExercise,
          })
        } else {
          history.push({
            pathname: routes.categories,
          })
        }
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

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).map((File) => {
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

      setSelectedFiles((x) => x.concat(File))
    })
  }

  function removeFile(currentPhoto) {
    const listWithRemovedElement = selectedFiles.filter(
      (file) => file !== currentPhoto
    )
    setSelectedFiles(listWithRemovedElement)
    resetFileInput()
  }

  const renderAttachmentsPreview = (selectedFiles) => {
    if (selectedFiles.length > 0) {
      return (
        <ImagePreviewContainer id="image-preview-container">
          {selectedFiles.map((photo, i) => (
            <React.Fragment key={i}>
              <AttachmentPreview
                key={i}
                attachmentSrc={photo}
                alt=""
                key={photo.ID}
                remove={() => removeFile(photo)}
              />
            </React.Fragment>
          ))}
        </ImagePreviewContainer>
      )
    }
  }

  const closeModal = () => {
    refreshData()
    setOpenModal(false)
  }

  let results
  if (data) {
    results = data.categories
  }

  const handleInputChange = (e) => {
    setSelectedCategoryId(e.target.value)
  }

  const validate = (values) => {
    const errors = {}

    if (!values.exerciseName) {
      errors.exerciseName = 'Exercise name is required'
    }

    if (results[0].categoryId && selectedCategoryId == undefined) {
      setSelectedCategoryId(results[0].categoryId)
    }

    if (selectedCategoryId === undefined) {
      errors.category = 'Category is required'
    }
    return errors
  }

  return (
    <GlobalTemplate>
      {loading ? (
        <ProgressBar
          bgcolor={theme.colorPrimaryDefault}
          progress={uploadPercentage}
          height={4}
        />
      ) : (
        <Formik
          validate={validate}
          initialValues={{
            exerciseName: '',
            exerciseDescription: '',
            addNextExercise: false,
          }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          validateOnChange={false}
        >
          {({ errors, touched, isValid }) => (
            <Form>
              <Nav>
                <BackTopNav text={translate('AddExercise')} />
              </Nav>
              <Field
                typeInput="no-border"
                type="text"
                placeholder="Exercise Name"
                name="exerciseName"
                as={Input}
                error={errors.exerciseName && touched.exerciseName}
                autofocus={true}
              />
              <ValidationHint
                errors={errors}
                touched={touched}
                text={errors.exerciseName}
                inputName="exerciseName"
              />
              {results && results.length > 0 ? (
                <>
                  <Label text={translate('Category')}></Label>
                  <DropdownInput
                    required={true}
                    id="category"
                    name="category"
                    list={results}
                    defaultValue={results[0].categoryId}
                    placeholder={results[0].title}
                    displayValue="title"
                    optionValue="categoryId"
                    label="Category"
                    isLoading={loadingCategory}
                    onChange={handleInputChange}
                    hasError={errors.category}
                  />
                </>
              ) : (
                <>
                  <p onClick={() => setOpenModal(true)}>{translate('AddCategory')}</p>
                  <AddCategoryModal
                    theme={theme}
                    openModal={openModal}
                    onClose={closeModal}
                  />
                </>
              )}
              {errors.category && <ErrorText>{errors.category}</ErrorText>}
              <AddFiles
                triggerFileUploadButton={triggerFileUploadButton}
                handleImageChange={handleImageChange}
              />
              {renderAttachmentsPreview(selectedFiles)}
              <Field
                typeInput="no-border-sm"
                placeholder="Description"
                type="text"
                as={Input}
                name="exerciseDescription"
              />
              <CheckboxContainer>
                <Switch
                  checked={addExercise}
                  onChange={() => setAddExercise(!addExercise)}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
                <Paragraph type="body-2-medium">
                  {translate('AddNextExercise')}
                </Paragraph>
              </CheckboxContainer>
              <Button
                type="submit"
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
  )
}

export default AddExercise
