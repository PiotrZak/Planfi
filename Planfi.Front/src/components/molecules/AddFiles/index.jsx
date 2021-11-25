import React from 'react'
import { translate } from 'utils/Translation'
import styled from 'styled-components'
import { withLazyComponent } from 'utils/lazyComponent'
import SmallButton from 'components/atoms/SmallButton'

const Paragraph = withLazyComponent(
  React.lazy(() => import('components/atoms/Paragraph'))
)

const FileUploadButton = styled.input.attrs({ type: 'file' })`
  display: none;
`

const WrapperAttachments = styled.div`
  display: flex;
  width:100%;
  margin-top: 2.2rem;
  margin-bottom: 2.2rem;
  width: 100%;
  height: 80px;
  border: 2px dotted blue;
  &:hover {
      background: ${({ theme }) => theme.colorPrimaryLightest} !important;
      cursor:pointer;
    }
`

const StyledParagraph = styled(Paragraph)`
  line-height: 0;
  margin: auto;
`

const AddFiles = ({ triggerFileUploadButton, handleImageChange }) => {
  return (
    <WrapperAttachments onClick={triggerFileUploadButton}>
      <StyledParagraph type="body-3-regular">
        {translate('AddAttachments')}
      </StyledParagraph>
      <FileUploadButton
        id="choose-file-button"
        onChange={handleImageChange}
        multiple
      />
    </WrapperAttachments>
  )
}

export default AddFiles
