
import React, { useState, useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { userService } from 'services/userServices';
import { planService } from 'services/planService';
import { alertActions } from 'redux/actions/alert.actions';
import Return from 'common/Return';
import { commonUtil } from 'utils/common.util';
import { Loader } from 'common/Loader';
import Icon from 'common/Icon';
import { CheckboxGenericComponent } from 'common/CheckboxGenericComponent';
import { userContext } from 'App';
import { Button } from 'common/buttons/Button';
import { Search } from 'common/Search';
import Spacer from 'common/Spacer';
import InviteUserModal from './InviteUsersModal';
import {
  isMobile
} from "react-device-detect";

var ReactBottomsheet = require('react-bottomsheet');

const usersText = "Users";
const trainersText = "Trainers";
const clients = "Clients";
const organization = "Organization"
const returnToSubMenu = "return"
const assignPlanToUserNotification = "Plan sucesfully assigned to users!";
const assignTrainerToUserNotification = "Trainer sucesfully assigned to users!"
const noUsers = "There are no Users";
const deleteUserText = "Delete user"
const assignToTrainerText = "Assign to trainer"
const assignPlanText = "Assign plan"
const selectFromPlans = "Select from plans"
const selectFromTrainers = "Select from trainers";
const selected = "selected";
const userDeleted = "Users sucessfully deleted!"

export const Trainers = () => {
  const { user } = useContext(userContext);
  const [users, setUsers] = useState();
  const [trainers, setTrainers] = useState([]);

  const [activeUsers, setActiveUsers] = useState([]);

  const [assignPlan, setAssignPlan] = useState(false);
  const [assignTrainer, setAssignTrainer] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [openInviteUserModal, setOpenInviteUserModal] = useState(false);

  const [bottomSheet, setBottomSheet] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    getAllTrainers();
  }, []);

  const getAllTrainers = () => {
    userService
      .allTrainers()
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
    // {
    //     "trainerId": "string",
    //     "usersId": [
    //       "string"
    //     ]
    //   }

    const data = { trainerId: 'lol', usersId: activeUsers };

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
          <h2>Trainers</h2>
          <div onClick={() => setOpenInviteUserModal(true)}><Icon name="plus" fill="#5e4ae3" /></div>
        </div>
        <div className="users">


          <InviteUserModal openModal={openInviteUserModal} onClose={() => setOpenInviteUserModal(false)} />

          <Loader isLoading={isLoading}>
            {users ? <CheckboxGenericComponent dataType="users" displayedValue="firstName" dataList={users} onSelect={submissionHandleElement} /> : <h1>{noUsers}</h1>}
          </Loader>
        </div>
      </div>

      {/* <ReactBottomsheet
        showBlockLayer={false}
        className="bottomsheet-without-background"
        visible={bottomSheet}
        onClose={() => setBottomSheet(false)}
        appendCancelBtn={false}
      >

        {isMobile ?
          <>
            <button onClick={() => deleteUser()} className="bottom-sheet-item">{deleteUserText}</button>
            <button onClick={() => openAssignPlansToUsers()} className="bottom-sheet-item">{assignPlanText}</button>
            <button onClick={() => setAssignTrainer(!assignTrainer)} className="bottom-sheet-item">{assignToTrainerText}</button>
          </>
          :
          <>
          <div className="bottom-sheet-item__oneline">
            <Icon name="check" fill="#2E6D2C" />
            <p>{activeUsers.length} {selected}</p>
            <div onClick={() => deleteUser()} className="bottom-sheet-item__content"><Icon height={"18px"} name="trash" fill="#C3C3CF" />{deleteUserText}</div>
              <div onClick={() => openAssignPlansToUsers()} className="bottom-sheet-item__content"><Icon height={"18px"} name="clipboard-notes" fill="#C3C3CF" />{assignPlanText}</div>
              <div onClick={() => setAssignTrainer(!assignTrainer)} className="bottom-sheet-item__content"><Icon height={"18px"} name="user-circle" fill="#C3C3CF" />{assignToTrainerText}</div>
              </div>
          </>
        }

      </ReactBottomsheet>
      <AssignUsersToPlans assignPlan={assignPlan} setAssignPlan={setAssignPlan} bottomSheet={bottomSheet} setBottomSheet={setBottomSheet} activeUsers={activeUsers} /> */}
    </div>
  );
};