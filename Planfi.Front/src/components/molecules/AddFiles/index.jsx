import React from "react";
import { translate } from "utils/Translation";
import Icon from "components/atoms/Icon";
import styled from "styled-components";
import { withLazyComponent } from "utils/lazyComponent";
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
        <Icon name="image-plus" fill="white" height="1.5rem" width="1.5rem" />
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