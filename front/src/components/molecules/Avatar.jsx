import React, { useState, useEffect, useRef } from 'react';
import Icon from 'components/atoms/Icon';
import 'react-multi-carousel/lib/styles.css';
import { accountService } from 'services/accountServices';
import styled from 'styled-components';
import { useThemeContext } from 'support/context/ThemeContext';
import Image from 'components/atoms/Image';

const addedAvatar = 'Avatar succesfully added!';

const AvatarContainer = styled.div`
    display:inline-flex;
    background: ${({ theme }) => theme.colorGray80};
    width: 150px;
    height: 150px;
    border-radius: 50%;
    .file-input{
      display:none;
    }
    &:hover {
      background-color: ${({ theme }) => theme.colorGray70} !important;
      transition:0.5s;
      cursor:pointer;
    }
    p{
      display: flex;
      align-items: center;
      text-align:center;
    }
`;

export const Avatar = ({ avatar, id }) => {

  const [hover, setHover] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [unsupportedFiles, setUnsupportedFiles] = useState([]);
  const { theme } = useThemeContext();

  const fileInputRef = useRef();

  const fileInputClicked = () => {
    fileInputRef.current.click();
  };

  const handleFileData = (data) => {
    const formData = new FormData();
    formData.append('userId', id);
    formData.append('avatar', data[0]);

    accountService
      .uploadAvatar(formData)
      .then((data) => {
        
      })
      .catch((error) => {
      });
  };

  const fileDrop = (e) => {
    e.preventDefault();
    const { files } = e.dataTransfer;
    if (files.length) {
      handleFiles(files);
    }
  };

  const filesSelected = () => {
    if (fileInputRef.current.files.length) {
      handleFiles(fileInputRef.current.files);
    }
  };

  const handleFiles = (files) => {
    for (let i = 0; i < files.length; i++) {
      if (validateFile(files[i])) {
        setSelectedFiles((prevArray) => [...prevArray, files[i]]);
      } else {
        files[i].invalid = true;
        setSelectedFiles((prevArray) => [...prevArray, files[i]]);
        setErrorMessage('File type not permitted');
        setUnsupportedFiles((prevArray) => [...prevArray, files[i]]);
      }
    }
    handleFileData(files);
  };

  const validateFile = (file) => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/x-icon'];
    if (validTypes.indexOf(file.type) === -1) {
      return false;
    }
    return true;
  };

  return (
    <>
      {avatar
        ? (
          <AvatarContainer
            theme = {theme}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={fileInputClicked}
          >
          <Image url={avatar} />
            <input
              ref={fileInputRef}
              className="file-input"
              type="file"
              multiple
              onChange={filesSelected}
            />
            {hover && <p>Change Avatar</p>}
          </AvatarContainer>
        )
        : (
          <AvatarContainer
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onDrop={fileDrop}
            onClick={fileInputClicked}
            className={`avatar ${
              hover
              && ' avatar__hover'
              }`}
          >
            <input
              ref={fileInputRef}
              className="file-input"
              type="file"
              multiple
              onChange={filesSelected}
            />
            {hover && (
              <p>
                <Icon name="plus" fill="white" />
                Add Avatar
            </p>
            )}
          </AvatarContainer>
        )}
    </>
  );
};
