
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

export const Users = () => {
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

  const getRole = (role) => {
    userService
      .getUserByRole(role)
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
          <h2>{usersText}</h2>
          <div onClick={() => setOpenInviteUserModal(true)}><Icon name="plus" fill="#5e4ae3" /></div>
        </div>
        <div className="users">

          <div className="users__filters">
            <p onClick={() => getRole('Organization')}>{organization}</p>
            <p onClick={() => getRole('Trainer')}>{trainersText}</p>
            <p onClick={() => getRole('User')}>{clients}</p>
          </div>

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

        <Icon name="check" fill="#2E6D2C" />
        <p>
          {activeUsers.length}
          {' '}
          selected
        </p>

        <button onClick={() => deleteUser()} className="bottom-sheet-item">{deleteUserText}</button>
        <button onClick={() => openAssignPlansToUsers()} className="bottom-sheet-item">{assignPlanText}</button>
        <button onClick={() => setAssignTrainer(!assignTrainer)} className="bottom-sheet-item">{assignToTrainerText}</button>
      </ReactBottomsheet>

      <AssignUsersToPlans assignPlan={assignPlan} setAssignPlan={setAssignPlan} bottomSheet={bottomSheet} setBottomSheet={setBottomSheet} activeUsers={activeUsers} />

    </div>
  );
};

const AssignUsersToPlans = ({
  assignPlan, setAssignPlan, bottomSheet, activeUsers, setBottomSheet,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [plans, setPlans] = useState();
  const [activePlans, setActivePlans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    getAllPlans();
  }, []);

  const closeAssignPlansToUser = () => {
    setBottomSheet(true);
    setAssignPlan(false);
  };

  const filterPlans = (event) => {
    setSearchTerm(event.target.value);
  };

  const plansResults = !searchTerm
    ? plans
    : plans.filter((plan) => plan.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()));

  const getAllPlans = () => {
    planService
      .getAllPlans()
      .then((data) => {
        setPlans(data);
        setIsLoading(false);
      })
      .catch(() => {
      });
  };

  const getSelectedPlanIds = (selectedData) => {
    const selectedPlans = commonUtil.getCheckedData(selectedData, 'planId');
    setActivePlans(selectedPlans);
  };

  const assignUserToPlan = () => {
    const data = { userIds: activeUsers, planIds: activePlans };

    userService
      .assignPlanToUser(data)
      .then(() => {
        dispatch(alertActions.success(assignPlanToUserNotification));
      })
      .catch((error) => {
        dispatch(alertActions.error(error.title));
      });
  };

  return (
    <ReactBottomsheet
      showBlockLayer={false}
      className="bottomsheet-without-background"
      visible={assignPlan}
      onClose={() => assignPlan(false)}
      appendCancelBtn={false}
    >

      <Icon name="check" fill="#2E6D2C" />
      <p>
        {activeUsers.length}
        {' '}
        selected
      </p>
      <p onClick={() => closeAssignPlansToUser()}>
        <Icon name="arrow-left" fill="#5E4AE3" />
        {returnToSubMenu}
      </p>
      <div>
        <h2>{selectFromPlans}</h2>
        <Spacer h={40} />
        <Search callback={filterPlans} />
        <Spacer h={60} />

        <Loader isLoading={isLoading}>
          {plansResults ? <CheckboxGenericComponent className="micro-bottom" dataType="plans" displayedValue="title" dataList={plansResults} onSelect={getSelectedPlanIds} /> : <p>No Plans</p>}
        </Loader>

        <Button disabled={activePlans.length === 0} className="btn btn--primary btn--lg" onClick={assignUserToPlan} name="Assign Plans to Users" />
      </div>

    </ReactBottomsheet>
  );
};
