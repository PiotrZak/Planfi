import React, { useState, useEffect, useContext } from 'react';
import { userService } from 'services/userServices';
import Icon from 'components/atoms/Icon';
import { useDispatch } from 'react-redux';
import Return from 'components/atoms/Return';
import {
  TabContent, TabPane, Nav, NavItem, NavLink,
} from 'reactstrap';
import classnames from 'classnames';
import 'react-multi-carousel/lib/styles.css';
import { UserInfo } from 'components/molecules/UserInfo';
import { isMobile } from 'react-device-detect';
import messages from 'lang/eng';
import { alertActions } from 'redux/actions/alert.actions';

import { AssignUsersToPlans } from './Common/AssignUsersToPlans';
import { AssignUsersToTrainers } from './Common/AssignUsersToTrainers';

import { ClientsOfTrainer } from './UserProfile/ClientOfTrainer';
import { PlansOfTrainer } from './UserProfile/PlansOfTrainer';
import { PlansOfUser } from './UserProfile/PlansOfUser';
import { TrainersOfClient } from './UserProfile/TrainersOfClient';

const ReactBottomsheet = require('react-bottomsheet');

export const User = (props) => {
  const currentUser = JSON.parse((localStorage.getItem('user')));

  const [bottomSheet, setBottomSheet] = useState(false);
  const [assignTrainer, setAssignTrainer] = useState(false);
  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const [assignPlan, setAssignPlan] = useState(false);

  useEffect(() => {
    getUserById();
  }, []);

  const { match } = props;
  const id = match.params;

  const getUserById = () => {
    userService
      .getUserById(id.id)
      .then((data) => {
        setUser(data);
        setIsLoading(false);
      })
      .catch((error) => {
        dispatch(alertActions.error(error.title));
      });
  };

  const assignUserToTrainer = () => {
    const data = { trainerIds: [currentUser.userId], userIds: [id.id] };
    userService
      .assignUsersToTrainer(data)
      .then(() => {
        dispatch(alertActions.success(messages.users.assignTrainerToUserNotification));
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

  return (
    <div>
      <div className="user-container">
        <div className="container">
          <div className="user-container__container__title">
            <Return fill="white" />
            <div onClick={() => setBottomSheet(true)}><Icon name="plus" fill="white" /></div>
          </div>
          {user && <UserInfo user={user} />}
          <Navs user={user} />
        </div>
      </div>

      <ReactBottomsheet
        showBlockLayer={false}
        className="bottomsheet-without-background"
        visible={bottomSheet}
        onClose={() => setBottomSheet(false)}
        appendCancelBtn={false}
      >
        {isMobile
          ? (
            <>
              <button onClick={() => openAssignPlansToUsers()} className="bottom-sheet-item">{messages.users.assignPlanText}</button>
              {currentUser && currentUser.role == 'Owner'
                ? <div onClick={() => openAssignTrainersToUsers()} className="bottom-sheet-item">{messages.users.assignToTrainerText}</div>
                : <button onClick={() => assignUserToTrainer()} className="bottom-sheet-item">{messages.users.assignToMe}</button>}
            </>
          )
          : (
            <>
              <div className="bottom-sheet-item__oneline">
                <div onClick={() => openAssignPlansToUsers()} className="bottom-sheet-item__content">
                  <Icon height="18px" name="clipboard-notes" fill="#C3C3CF" />
                  {messages.users.assignPlanText}
                </div>
                {currentUser && currentUser.role == 'Owner'
                  ? (
                    <div onClick={() => openAssignTrainersToUsers()} className="bottom-sheet-item__content">
                      <Icon height="18px" name="user-circle" fill="#C3C3CF" />
                      {messages.users.assignToTrainerText}
                    </div>
                  )
                  : <button onClick={() => assignUserToTrainer()} className="bottom-sheet-item">{messages.users.assignToMe}</button>}
              </div>
            </>
          )}
      </ReactBottomsheet>
      <AssignUsersToPlans assignPlan={assignPlan} setAssignPlan={setAssignPlan} bottomSheet={bottomSheet} setBottomSheet={setBottomSheet} activeUsers={[id.id]} />
      <AssignUsersToTrainers organizationId={user.organizationId} assignTrainer={assignTrainer} setAssignTrainer={setAssignTrainer} bottomSheet={bottomSheet} setBottomSheet={setBottomSheet} activeUsers={[id.id]} />
    </div>
  );
};

const Navs = ({ user }) => {
  const [activeTab, setActiveTab] = useState('1');
  const myPlans = 'Plans';

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <div className="user-container__tabs">
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => { toggle('1'); }}
          >
            <h2>{myPlans}</h2>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => { toggle('2'); }}
          >
            {user.role === 'Trainer'
              ? <h2>Clients</h2>
              : <h2>Trainers</h2>}
          </NavLink>
        </NavItem>
      </Nav>

      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          {user.role === 'Trainer'
            ? <h1><PlansOfTrainer id={user.userId} /></h1>
            : <h1><PlansOfUser id={user.userId} /></h1>}
        </TabPane>
        <TabPane tabId="2">
          {user.role === 'Trainer'
            ? <h1><ClientsOfTrainer id={user.userId} /></h1>
            : <h1><TrainersOfClient id={user.userId} /></h1>}
        </TabPane>
      </TabContent>
    </div>
  );
};

export default User;
