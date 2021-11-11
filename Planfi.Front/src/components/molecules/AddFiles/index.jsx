import React from "react";
import { translate } from "utils/Translation";
import styled from "styled-components";
import { withLazyComponent } from "utils/lazyComponent";
import SmallButton from 'components/atoms/SmallButton';

const Paragraph = withLazyComponent(
  React.lazy(() => import("components/atoms/Paragraph"))
);

const FileUploadButton = styled.input.attrs({ type: "file" })`
  display: none;
`;

const WrapperAttachments = styled.div`
  display: flex;
  margin-top: 2.2rem;
`;

const StyledParagraph = styled(Paragraph)`
  line-height: 0;
  margin: 0.8rem 0 0 0.5rem;
`;

const AddFiles = ({triggerFileUploadButton, handleImageChange}) => {
    return (
      <WrapperAttachments onClick={triggerFileUploadButton}>
         <SmallButton iconName="plus"/>
        <StyledParagraph>{translate("AddAttachments")}</StyledParagraph>
        <FileUploadButton
          id="choose-file-button"
          onChange={handleImageChange}
          multiple
        />
      </WrapperAttachments>
    );
  };
  
  export default AddFiles;