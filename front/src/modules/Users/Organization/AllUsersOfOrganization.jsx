import React, { useState, useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { organizationService } from 'services/organizationServices';
import { alertActions } from 'redux/actions/alert.actions';
import Return from 'common/Return';
import { commonUtil } from 'utils/common.util';
import { Loader } from 'common/Loader';
import Icon from 'common/Icon';
import { CheckboxGenericComponent } from 'common/CheckboxGenericComponent';
import { userContext } from 'App';
import InviteUserModal from '../InviteUsersModal';
import messages from 'lang/eng'

import { UsersPanel } from "../Common/UsersPanel"
import { AssignUsersToPlans } from "../Common/AssignUsersToPlans"
import { AssignUsersToTrainers } from "../Common/AssignUsersToTrainers"

var ReactBottomsheet = require('react-bottomsheet');

export const AllUsersOfOrganization = () => {

  const { user } = useContext(userContext);
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

    organizationService
      .getOrganizationUsers(user.organizationId)
      .then((data) => {
        console.log(data)
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
    console.log(selectedUsers)
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
          <h2>{messages.users.usersText} of - {user.organizationId}</h2>
          <div onClick={() => setOpenInviteUserModal(true)}><Icon name="plus" fill="#5e4ae3" /></div>
        </div>
        <div className="users">
          <h3> You are {user.role}</h3>
          <InviteUserModal openModal={openInviteUserModal} onClose={() => setOpenInviteUserModal(false)} />
          <Loader isLoading={isLoading}>
            {users ? <CheckboxGenericComponent dataType="users" displayedValue="firstName" dataList={users} onSelect={submissionHandleElement} /> : <h1>{messages.users.noUsers}</h1>}
          </Loader>
        </div>
      </div>
      <UsersPanel bottomSheet={bottomSheet} setBottomSheet={setBottomSheet} activeUsers={activeUsers} setAssignPlan={setAssignPlan} setAssignTrainer={setAssignTrainer} />
      <AssignUsersToPlans assignPlan={assignPlan} setAssignPlan={setAssignPlan} bottomSheet={bottomSheet} setBottomSheet={setBottomSheet} activeUsers={activeUsers} />
      <AssignUsersToTrainers assignTrainer={assignTrainer} setAssignTrainer={setAssignTrainer} bottomSheet={bottomSheet} setBottomSheet={setBottomSheet} activeUsers={activeUsers} />
    </div>
  );
};