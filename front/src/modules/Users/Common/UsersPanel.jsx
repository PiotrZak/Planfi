import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { userService } from 'services/userServices';
import { alertActions } from 'redux/actions/alert.actions';
import Icon from 'common/Icon';
import { isMobile } from "react-device-detect";
import EditRoleModal from "./EditRoleModal";

import messages from 'lang/eng'
var ReactBottomsheet = require('react-bottomsheet');

export const UsersPanel = ({ bottomSheet, setBottomSheet, activeUsers, setAssignPlan, setAssignTrainer }) => {

  const [openEditRoleModal, setOpenEditRoleModal] = useState(false)
  const dispatch = useDispatch();

  useEffect(() => {
    if (activeUsers == 0) {
      setBottomSheet(false)
    }
  }, [activeUsers]);

  const deleteUser = () => {
    userService
      .deleteUsers(activeUsers)
      .then((data) => {
        dispatch(alertActions.success(messages.users.userDeleted));
      })
      .catch((error) => {
        dispatch(alertActions.error(error.title));
      });
  };

  const openAssignPlansToUsers = () => {
    setAssignPlan(true);
    setBottomSheet(false);
  };

  const openAssignTrainersToUsers = () => {
    setAssignTrainer(true);
    setBottomSheet(false);
  };

  const openEditModal = () => {
    setOpenEditRoleModal(true)
  }

  return (
    <ReactBottomsheet
      showBlockLayer={false}
      className={!isMobile && "bottomsheet-without-background"}
      visible={bottomSheet}
      onClose={() => setBottomSheet(false)}
      appendCancelBtn={false}
    >

      {isMobile ?
        <>
          <button onClick={() => deleteUser()} className="bottom-sheet-item">{messages.users.deleteUserText}</button>
          <button onClick={() => openAssignPlansToUsers()} className="bottom-sheet-item">{messages.users.assignPlanText}</button>
          <button onClick={() => openAssignTrainersToUsers()} className="bottom-sheet-item">{messages.users.assignToTrainerText}</button>
        </>
        :
        <>
          <div className="bottom-sheet-item__oneline">
            <Icon name="check" fill="#2E6D2C" />
            <p>{activeUsers.length} {messages.users.selected}</p>
            <div onClick={() => deleteUser()} className="bottom-sheet-item__content"><Icon height={"18px"} name="trash" fill="#C3C3CF" />{messages.users.deleteUserText}</div>
            <div onClick={() => openAssignPlansToUsers()} className="bottom-sheet-item__content"><Icon height={"18px"} name="clipboard-notes" fill="#C3C3CF" />{messages.users.assignPlanText}</div>
            <div onClick={() => openAssignTrainersToUsers()} className="bottom-sheet-item__content"><Icon height={"18px"} name="user-circle" fill="#C3C3CF" />{messages.users.assignToTrainerText}</div>
            {activeUsers.length < 2 &&
              <div onClick={() => openEditModal()} className='bottom-sheet-item__content'><Icon height={"18px"} name="edit" fill="#C3C3CF" />{messages.users.editUserRole}</div>
            }
          </div>
          <EditRoleModal id={activeUsers} openModal={openEditRoleModal} onClose={() => setOpenEditRoleModal(false)} />
        </>
      }
    </ReactBottomsheet>
  )
}

export default UsersPanel;