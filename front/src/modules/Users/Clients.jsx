
import React, { useState, useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { userService } from 'services/userServices';
import { alertActions } from 'redux/actions/alert.actions';
import Return from 'common/Return';
import { commonUtil } from 'utils/common.util';
import { Loader } from 'common/Loader';
import Icon from 'common/Icon';
import { CheckboxGenericComponent } from 'common/CheckboxGenericComponent';
import { userContext } from 'App';
import { AssignUsersToPlans } from "./AllUsers"


import InviteUserModal from './InviteUsersModal';
import { isMobile } from "react-device-detect";

var ReactBottomsheet = require('react-bottomsheet');

const assignTrainerToUserNotification = "Trainer sucesfully assigned to users!"
const noUsers = "There are no Users";
const assignToTrainerText = "Assign to trainer"
const selected = "selected";
const userDeleted = "Users sucessfully deleted!"
const assignToMe = "Assign to me"
const assignPlanText = "Assign plan"

export const Clients = () => {
  const { user } = useContext(userContext);
  const [users, setUsers] = useState();

  const [activeUsers, setActiveUsers] = useState([]);
  const [assignPlan, setAssignPlan] = useState(false);


  const [isLoading, setIsLoading] = useState(true);
  const [openInviteUserModal, setOpenInviteUserModal] = useState(false);

  const [bottomSheet, setBottomSheet] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    getAllClients();
  }, []);

  const getAllClients = () => {
    userService
      .allClients()
      .then((data) => {
        setUsers(data);
        setIsLoading(false);
      })
      .catch((error) => {
        dispatch(alertActions.error(error.title));
      });
  };

  const submissionHandleElement = (selectedData) => {
    const selectedUsers = commonUtil.getCheckedData(selectedData, 'userId');
    setActiveUsers(selectedUsers);
    if (selectedUsers.length > 0) {
      setBottomSheet(true);
    } else {
      setBottomSheet(false);
      setAssignPlan(false);
    }
  };

  const deleteUser = () => {
    userService
      .deleteUsers(activeUsers)
      .then((data) => {
        dispatch(alertActions.success(userDeleted));
      })
      .catch((error) => {
        dispatch(alertActions.error(error.title));
      });
  };

  const assignUserToTrainer = (selectedData) => {
    console.log(selectedData);

    const data = { trainerIds: [user.userId], userIds: activeUsers };

    userService
      .assignUsersToTrainer(data)
      .then(() => {
        dispatch(alertActions.success(assignTrainerToUserNotification));
      })
      .catch((error) => {
        dispatch(alertActions.error(error.title));
      });
  };

  const openAssignPlansToUsers = () => {
    setAssignPlan(true);
    setBottomSheet(false);
  };


  return (
    <div>
      <div className="container">
        <div className="container__title">
          <Return />
          <h2>Clients (per organization? not yet)</h2>
          <div onClick={() => setOpenInviteUserModal(true)}><Icon name="plus" fill="#5e4ae3" /></div>
        </div>
        <div className="users">
          <p> You are {user.role}</p>
          <hr />
          <p>Clients, which You can assign to yourself</p>
          <hr />

          <InviteUserModal openModal={openInviteUserModal} onClose={() => setOpenInviteUserModal(false)} />

          <Loader isLoading={isLoading}>
            {users ? <CheckboxGenericComponent dataType="users" displayedValue="firstName" dataList={users} onSelect={submissionHandleElement} /> : <h1>{noUsers}</h1>}
          </Loader>
        </div>
      </div>

      <ReactBottomsheet
        showBlockLayer={false}
        className="bottomsheet-without-background"
        visible={bottomSheet}
        onClose={() => setBottomSheet(false)}
        appendCancelBtn={false}
      >

        {isMobile ?
          <>
            <button onClick={() => openAssignPlansToUsers()} className="bottom-sheet-item">{assignPlanText}</button>
            <button onClick={() => assignUserToTrainer()} className="bottom-sheet-item">{assignToMe}</button>
          </>
          :
          <>
            <div className="bottom-sheet-item__oneline">
              <Icon name="check" fill="#2E6D2C" />
              <p>{activeUsers.length} {selected}</p>
              <div onClick={() => openAssignPlansToUsers()} className="bottom-sheet-item__content"><Icon height={"18px"} name="clipboard-notes" fill="#C3C3CF" />{assignPlanText}</div>
              <div onClick={() => assignUserToTrainer()} className="bottom-sheet-item__content"><Icon height={"18px"} name="user-circle" fill="#C3C3CF" />{assignToMe}</div>
            </div>
          </>
        }

      </ReactBottomsheet>
      <AssignUsersToPlans assignPlan={assignPlan} setAssignPlan={setAssignPlan} bottomSheet={bottomSheet} setBottomSheet={setBottomSheet} activeUsers={activeUsers} />
    </div>
  );
};