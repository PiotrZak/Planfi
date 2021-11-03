import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Icon from "components/atoms/Icon";
import {
  acceptedImageFileType,
  acceptedVideoFileType,
} from "support/magicVariables";

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

function isObject(val) {
  if (val === null) { return false;}
  return ( (typeof val === 'function') || (typeof val === 'object') );
}

const AttachmentPreview = ({ attachmentSrc, remove, key}) => {

  return (
    <Container id={key}>
      <Circle onClick={remove} id={`img-prev-${key}`}>
        <Icon
          name="union"
          size=".7rem"
          onClick={remove}
          id={`img-prev-${key}`}
        />
      </Circle>
      {acceptedVideoFileType.includes(attachmentSrc.type) ? (
        <img
          width="18px"
          height="18px"
          src={require("../../../../public/icons/library/youtube.svg")}
        />
      ) : (
        <>
          {isObject(attachmentSrc) ? (
            <Image src={URL.createObjectURL(attachmentSrc)} />
          ) : (
            <Image src={`data:image/jpeg;base64,${attachmentSrc}`} />
          )}
        </>
      )}
    </Container>
  );
};

export default AttachmentPreview;
