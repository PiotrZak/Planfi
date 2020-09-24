
import React, { useState, useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { userService } from 'services/userServices';
import { planService } from 'services/planService';
import { alertActions } from 'redux/actions/alert.actions';
import Return from 'common/Return';
import { commonUtil } from 'utils/common.util';
import { Loader } from 'common/Loader';
import Icon from 'common/Icon';
import { Link } from 'react-router-dom';
import { CheckboxGenericComponent } from 'common/CheckboxGenericComponent';
import { userContext } from 'App';
import { Button } from 'common/buttons/Button';
import InviteUserModal from './InviteUsersModal';
import { isMobile} from "react-device-detect";

var ReactBottomsheet = require('react-bottomsheet');

const usersText = "All Users";
const returnToSubMenu = "return"
const assignPlanToUserNotification = "Plan sucesfully assigned to users!";
const noUsers = "There are no Users";
const deleteUserText = "Delete user"
const assignToTrainerText = "Assign to trainer"
const assignPlanText = "Assign plan"
const selectFromPlans = "Select from plans"
const selected = "selected";
const userDeleted = "Users sucessfully deleted!"

export const AllUsers = () => {

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
    console.log(selectedData)
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
          <h2>{usersText}</h2>
          <div onClick={() => setOpenInviteUserModal(true)}><Icon name="plus" fill="#5e4ae3" /></div>
        </div>
        <div className="users">
          <div className="users__filters">
            <Link to={{
              pathname: `/trainers`,
            }}><p>Trainers page</p></Link>
            <Link to={{
              pathname: `/clients`,
            }}><p>Clients page</p></Link>
            <hr />
          </div>
          <InviteUserModal openModal={openInviteUserModal} onClose={() => setOpenInviteUserModal(false)} />
          <Loader isLoading={isLoading}>
            {users ? <CheckboxGenericComponent dataType="users" displayedValue="firstName" dataList={users} onSelect={submissionHandleElement} /> : <h1>{noUsers}</h1>}
          </Loader>
        </div>
      </div>
      <UsersPanel bottomSheet={bottomSheet} setBottomSheet={setBottomSheet} activeUsers = {activeUsers} setAssignPlan ={setAssignPlan} setAssignTrainer ={setAssignTrainer}/>
      <AssignUsersToPlans assignPlan={assignPlan} setAssignPlan={setAssignPlan} bottomSheet={bottomSheet} setBottomSheet={setBottomSheet} activeUsers={activeUsers} />
      <AssignUsersToTrainers assignTrainer={assignTrainer} setAssignTrainer={setAssignTrainer} bottomSheet={bottomSheet} setBottomSheet={setBottomSheet} activeUsers={activeUsers} />
    </div>
  );
};





export const UsersPanel = ({bottomSheet, setBottomSheet, activeUsers, setAssignPlan, setAssignTrainer}) => {

  const dispatch = useDispatch();

  useEffect(() => {
    if(activeUsers == 0){
      setBottomSheet(false)
    }
  }, [activeUsers]);

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

  const openAssignPlansToUsers = () => {
    setAssignPlan(true);
    setBottomSheet(false);
  };

  const openAssignTrainersToUsers = () => {
    setAssignTrainer(true);
    setBottomSheet(false);
  };

  return(
    <ReactBottomsheet
    showBlockLayer={false}
    className={!isMobile && "bottomsheet-without-background"}
    visible={bottomSheet}
    onClose={() => setBottomSheet(false)}
    appendCancelBtn={false}
  >

    {isMobile ?
      <>
        <button onClick={() => deleteUser()} className="bottom-sheet-item">{deleteUserText}</button>
        <button onClick={() => openAssignPlansToUsers()} className="bottom-sheet-item">{assignPlanText}</button>
        <button onClick={() => openAssignTrainersToUsers()} className="bottom-sheet-item">{assignToTrainerText}</button>
      </>
      :
      <>
        <div className="bottom-sheet-item__oneline">
          <Icon name="check" fill="#2E6D2C" />
          <p>{activeUsers.length} {selected}</p>
          <div onClick={() => deleteUser()} className="bottom-sheet-item__content"><Icon height={"18px"} name="trash" fill="#C3C3CF" />{deleteUserText}</div>
          <div onClick={() => openAssignPlansToUsers()} className="bottom-sheet-item__content"><Icon height={"18px"} name="clipboard-notes" fill="#C3C3CF" />{assignPlanText}</div>
          <div onClick={() => openAssignTrainersToUsers()} className="bottom-sheet-item__content"><Icon height={"18px"} name="user-circle" fill="#C3C3CF" />{assignToTrainerText}</div>
        </div>
      </>
    }
  </ReactBottomsheet>
  )
}


export const AssignUsersToPlans = ({
  assignPlan, setAssignPlan, activeUsers, setBottomSheet,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [plans, setPlans] = useState();
  const [activePlans, setActivePlans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    getAllPlans();
      if(activeUsers == 0){
        setAssignPlan(false)
      }
    }, [activeUsers]);

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
    const data = { clientIds: activeUsers, planIds: activePlans };

    userService
      .assignPlanToUser(data)
      .then(() => {
        dispatch(alertActions.success(assignPlanToUserNotification));
        setAssignPlan(false);
        setBottomSheet(false);
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

      <div className="bottom-nav">
        <div className="bottom-nav__item">
          <Icon name="check" fill="#2E6D2C" />
          <p>
            {activeUsers.length}
            {' '}
            selected
      </p>
        </div>

        <div className="bottom-nav__item">
        <Icon name="arrow-left" fill="#5E4AE3" />
          <p onClick={() => closeAssignPlansToUser()}>
            {returnToSubMenu}
          </p>
        </div>
      </div>

      <div>
        <h4>{selectFromPlans}</h4>
        <Loader isLoading={isLoading}>
          {plansResults ? <CheckboxGenericComponent dataType="plans" displayedValue="title" dataList={plansResults} onSelect={getSelectedPlanIds} /> : <p>No Plans</p>}
        </Loader>
        <Button disabled={activePlans.length === 0} className="btn btn--primary btn--lg" onClick={assignUserToPlan} name={activePlans.length === 0 ? "Select Plan" : "Assign Plans to Users"} />
      </div>

    </ReactBottomsheet>
  );
};




export const AssignUsersToTrainers = ({
  assignTrainer, setAssignTrainer, activeUsers, setBottomSheet,
}) => {

  const [trainers, setTrainers] = useState();
  const [activeTrainers, setActiveTrainers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  
useEffect(() => {
  getAllTrainers();
    if(activeUsers == 0){
      setAssignTrainer(false)
    }
  }, [activeUsers]);

  const closeAssignPlansToUser = () => {
    setBottomSheet(true);
    setAssignTrainer(false);
  };

  const getAllTrainers = () => {
    userService
      .allTrainers()
      .then((data) => {
        setTrainers(data);
        setIsLoading(false);
      })
      .catch(() => {
      });
  };

  const getSelectedTrainerIds = (selectedData) => {
    const selectedTrainers = commonUtil.getCheckedData(selectedData, 'userId');
    setActiveTrainers(selectedTrainers);
  };

  const assignUserToPlan = () => {
    const data = { userIds: activeUsers, trainerIds: activeTrainers };
    userService
      .assignUsersToTrainer(data)
      .then(() => {
        dispatch(alertActions.success(assignPlanToUserNotification));
        setAssignTrainer(false)
        setBottomSheet(false);
      })
      .catch((error) => {
        dispatch(alertActions.error(error.title));
      });
  };

  return (
    <ReactBottomsheet
      showBlockLayer={false}
      className="bottomsheet-without-background"
      visible={assignTrainer}
      onClose={() => setAssignTrainer(false)}
      appendCancelBtn={false}
    >

      <div className="bottom-nav">
        <div className="bottom-nav__item">
          <Icon name="check" fill="#2E6D2C" />
          <p>{activeUsers.length}selected</p>
        </div>

        <div className="bottom-nav__item">
        <Icon name="arrow-left" fill="#5E4AE3" />
          <p onClick={() => closeAssignPlansToUser()}>
            {returnToSubMenu}
          </p>
        </div>
      </div>

      <div>
        <h4>{selectFromPlans}</h4>
        <Loader isLoading={isLoading}>
            {trainers ? <CheckboxGenericComponent dataType="users" displayedValue="firstName" dataList={trainers} onSelect={getSelectedTrainerIds} /> : <h1>{noUsers}</h1>}
          </Loader>
        <Button disabled={activeTrainers.length === 0} className="btn btn--primary btn--lg" onClick={assignUserToPlan} name={activeTrainers.length === 0 ? "Select Plan" : "Assign Trainers to Users"} />
      </div>

    </ReactBottomsheet>
  );
};
