import React, { useState } from 'react';
import Button from 'components/atoms/Button';
import { ReactMultiEmail, isEmail } from 'react-multi-email';
import 'react-multi-email/style.css';
import { ModalHeading } from 'components/atoms/Heading';
import { translate } from 'utils/Translation';
import { useNotificationContext, ADD } from 'support/context/NotificationContext';
import { StyledModal, ButtonContainer } from 'components/molecules/Modal';
import { useUserContext } from 'support/context/UserContext';
import { accountService } from 'services/accountServices';
import { Role } from 'utils/role';

const InviteUserModal = ({ openModal, onClose, role }) => {
  const { user } = useUserContext();
  const { notificationDispatch } = useNotificationContext();
  const [emails, setEmails] = useState([]);

  const submitForm = () => {

    const inviteModel = {
      organizationId: user.organizationId,
      emails,
      role,
    };

    accountService
      .sendInvitation(inviteModel)
      .then((data) => {
        notificationDispatch({
          type: ADD,
          payload: {
            content: { success: 'OK', message: translate('EmailSent') },
            type: 'positive',
          },
        });
      })
      .catch((error) => {
        notificationDispatch({
          type: ADD,
          payload: {
            content: { success: error, message: error.data.data.message },
            type: 'error',
          },
        });
      });
  };


  return (
    <StyledModal
      isOpen={openModal}
      onBackgroundClick={onClose}
      onEscapeKeydown={onClose}
    >
      {role.name == Role.Trainer
        ? <ModalHeading>{translate('InviteTrainers')}</ModalHeading>
        : <ModalHeading>{translate('InviteUsers')}</ModalHeading>
      }
      <MultiInviteForm emails={emails} setEmails={setEmails} />
      <br/>
      <ButtonContainer>
        <Button disabled = {emails.length == 0} onClick={submitForm} type="submit" buttonType="primary" size="md">{translate('InviteUsersButton')}</Button>
      </ButtonContainer>
    </StyledModal>
  );
};

const MultiInviteForm = ({ emails, setEmails }) => (

  <ReactMultiEmail
    placeholder={translate('SeparateMails')}
    emails={emails}
    onChange={(_emails) => {
      setEmails([..._emails]);
    }}
    validateEmail={(email) => isEmail(email) // return boolean
    }
    getLabel={(
      email,
      index,
      removeEmail,
    ) => (
        <div data-tag key={index}>
          {email}
          <span data-tag-handle onClick={() => removeEmail(index)}>
            ×
        </span>
        </div>
      )}
  />
);

export default InviteUserModal;
