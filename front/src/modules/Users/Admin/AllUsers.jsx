
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { userService } from 'services/userServices';
import { alertActions } from 'redux/actions/alert.actions';
import Return from 'components/atoms/Return';
import { commonUtil } from 'utils/common.util';
import { Loader } from 'components/atoms/Loader';
import Icon from 'components/atoms/Icon';
import { NavLink } from 'react-router-dom';
import { CheckboxGenericComponent } from "components/organisms/CheckboxGenericComponent"
import InviteUserModal from '../InviteUsersModal';

//todo - care about lang
import messages from 'lang/eng'

import { UsersPanel } from "../Common/UsersPanel"
import { AssignUsersToPlans } from "../Common/AssignUsersToPlans"
import { AssignUsersToTrainers } from "../Common/AssignUsersToTrainers"

export const AllUsers = () => {

  const [users, setUsers] = useState();
  const [activeUsers, setActiveUsers] = useState([]);

  const [assignPlan, setAssignPlan] = useState(false);
  const [assignTrainer, setAssignTrainer] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [openInviteUserModal, setOpenInviteUserModal] = useState(false);

  const [bottomSheet, setBottomSheet] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = () => {
    userService
      .allUsers()
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

  return (
    <div>
      <div className="container">
        <div className="container__title">
          <Return />
          <h2>{messages.users.usersText}</h2>
          <div onClick={() => setOpenInviteUserModal(true)}><Icon name="plus" fill="#5e4ae3" /></div>
        </div>
        <div className="users">
          <div className="users__filters">
            <NavLink to={{
              pathname: `/trainers`,
            }}><p>Trainers page</p></NavLink>
            <NavLink to={{
              pathname: `/clients`,
            }}><p>Clients page</p></NavLink>
            <hr />
          </div>
          <InviteUserModal openModal={openInviteUserModal} onClose={() => setOpenInviteUserModal(false)} />
          <Loader isLoading={isLoading}>
            {users ? <CheckboxGenericComponent dataType="users" displayedValue="firstName" dataList={users} onSelect={submissionHandleElement} /> : <h1>{messages.users.noUsers}</h1>}
          </Loader>
        </div>
      </div>
      <UsersPanel bottomSheet={bottomSheet} setBottomSheet={setBottomSheet} activeUsers = {activeUsers} setAssignPlan ={setAssignPlan} setAssignTrainer ={setAssignTrainer} />
      <AssignUsersToPlans assignPlan={assignPlan} setAssignPlan={setAssignPlan} bottomSheet={bottomSheet} setBottomSheet={setBottomSheet} activeUsers={activeUsers} />
      <AssignUsersToTrainers assignTrainer={assignTrainer} setAssignTrainer={setAssignTrainer} bottomSheet={bottomSheet} setBottomSheet={setBottomSheet} activeUsers={activeUsers} />
    </div>
  );
};