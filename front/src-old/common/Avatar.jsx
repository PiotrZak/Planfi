import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import Icon from 'common/Icon';
import 'react-multi-carousel/lib/styles.css';
import { alertActions } from 'redux/actions/alert.actions';
import { accountService } from 'services/accountServices';

const addedAvatar = 'Avatar succesfully added!';

export const Avatar = ({ avatar, id }) => {
  const dispatch = useDispatch();

  const [hover, setHover] = useState(false);

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [unsupportedFiles, setUnsupportedFiles] = useState([]);

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
        dispatch(alertActions.success(addedAvatar));
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
          <div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={fileInputClicked}
          >
            <img
              className={`avatar ${
                hover
                            && ' avatar__imghover'
              }`}
              src={`data:image/jpeg;base64,${avatar}`}
            />
            <input
              ref={fileInputRef}
              className="file-input"
              type="file"
              multiple
              onChange={filesSelected}
            />
            {hover && <p>Change Avatar</p>}
          </div>
        )
        : (
          <div
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
          </div>
        )}
    </>
  );
};
