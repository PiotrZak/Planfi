import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Icon from "components/atoms/Icon";

const Container = styled.div`
  height: 4.8rem;
  width: 4.8rem;
  border-radius: 2px;
  background: ${({ theme }) => theme.colorGray70};
  position: relative;
`;

const Circle = styled.div`
  height: 1.6rem;
  width: 1.6rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background: ${({ theme }) => theme.colorErrorDefault};
  border-radius: 50%;

  position: absolute;
  top: -0.5rem;
  right: -0.5rem;
`;

const Image = styled.img`
  height: 4.8rem;
  width: 4.8rem;
  border-radius: 2px;
`;

export const TYPE = {
  IMAGE: "image",
  VIDEO: "video",
};

const AttachmentPreview = ({ attachmentSrc, setID, remove, type }) => {
  // render image preview
  if (
    type === TYPE.IMAGE ||
    attachmentSrc.length > 100 ||
    attachmentSrc.type == TYPE.IMAGE
  ) {
    return (
      <Container id={setID}>
        <Circle onClick={remove} id={`img-prev-${setID}`}>
          <Icon
            name="union"
            size=".7rem"
            onClick={remove}
            id={`img-prev-${setID}`}
          />
        </Circle>
        {attachmentSrc.length > 100 ? (
          <Image src={`data:image/jpeg;base64,${attachmentSrc}`} />
        ) : (
          <Image src={attachmentSrc} />
        )}
      </Container>
    );
  }
  // render video player preview
  return (
    <Container id={setID}>
      <Circle onClick={remove} id={`img-prev-${setID}`}>
        <Icon
          name="union"
          size=".7rem"
          onClick={remove}
          id={`img-prev-${setID}`}
        />
      </Circle>
      <img
        width="18px"
        height="18px"
        src={require("../../../../public/icons/library/youtube.svg")}
      />
    </Container>
  );
};

AttachmentPreview.propTypes = {
  attachmentSrc: PropTypes.string.isRequired,
  complete: PropTypes.bool.isRequired,
  type: PropTypes.oneOf([TYPE.VIDEO, TYPE.IMAGE]).isRequired,
  videoType: PropTypes.string,
  // setID: PropTypes.string.isRequired,
};

AttachmentPreview.defaultProps = {
  videoType: "null",
};

export default AttachmentPreview;
