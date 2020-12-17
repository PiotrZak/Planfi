import React, { useState, useEffect, useContext } from 'react';
import { organizationService } from 'services/organizationServices';
import { commonUtil } from 'utils/common.util';
import Loader from 'components/atoms/Loader';
import Icon from 'components/atoms/Icon';
import { CheckboxGenericComponent } from "components/organisms/CheckboxGeneric"
import { useUserContext } from "../../support/context/UserContext"
import BackTopNav from 'components/molecules/BackTopNav';
import InviteUserModal from './InviteUsersModal';
import GlobalTemplate, { Nav } from "templates/GlobalTemplate"

import { UsersPanel } from "./micromodules/UsersPanel"
import { AssignUsersToPlans } from "./micromodules/AssignUsersToPlan"
// import { AssignUsersToTrainers } from "../Common/AssignUsersToTrainers"

const noUsers = "No Users";

const OrganizationUsers = () => {
  const { user } = useUserContext();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [activeUsers, setActiveUsers] = useState([]);

  const [bottomSheet, setBottomSheet] = useState('none');
  const [assignPlan, setAssignPlan] = useState('none');
  const [assignTrainer, setAssignTrainer] = useState('none');


  const [isLoading, setIsLoading] = useState(false);
  const [openInviteUserModal, setOpenInviteUserModal] = useState(false);


  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = () => {
    organizationService
      .getOrganizationUsers(user.organizationId)
      .then((data) => {
        setUsers(data);
        setFilteredUsers(data)
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error)
      });
  };

  const submissionHandleElement = (selectedData) => {
    const selectedUsers = commonUtil.getCheckedData(selectedData, 'userId');
    setActiveUsers(selectedUsers);
    if (selectedUsers.length > 0) {
      setBottomSheet('flex');
    } else {
      setBottomSheet('none');
      setAssignPlan(false);
    }
  };


  const filterUsers = (role) => {
    if (role == "All") {
      setFilteredUsers(users)
    }
    else {
      const filteredUsers = users.filter(x => x.role == role)
      setFilteredUsers(filteredUsers)
    }
  }

  return (
    <>
      <GlobalTemplate>
        <BackTopNav />
        <h2>
          {user.firstName} of - {user.organizationId}</h2>
        <div onClick={() => setOpenInviteUserModal(true)}><Icon name="plus" fill="#5e4ae3" /></div>
        <div className="users">
          <h3> You are {user.role}</h3>
          <div className="users__filters">
            <p onClick={() => filterUsers("User")}>Clients</p>
            <p onClick={() => filterUsers("Trainer")}>Trainers</p>
            <p onClick={() => filterUsers("All")}> All </p>
          </div>
        </div>
        <InviteUserModal openModal={openInviteUserModal} onClose={() => setOpenInviteUserModal(false)} />
        {/* <Loader isLoading={isLoading}> */}
        {filteredUsers ?
          <CheckboxGenericComponent
            dataType="users"
            displayedValue="firstName"
            dataList={filteredUsers}
            onSelect={submissionHandleElement}
            /> :
          <h1>{noUsers}</h1>
        }
      </GlobalTemplate>
      <UsersPanel
        bottomSheet={bottomSheet}
        setBottomSheet={setBottomSheet}
        activeUsers={activeUsers}
        setAssignPlan={setAssignPlan}
        setAssignTrainer={setAssignTrainer} />
      <AssignUsersToPlans
        organizationId={user.organizationId}
        assignPlan={assignPlan}
        setAssignPlan={setAssignPlan}
        bottomSheet={bottomSheet}
        setBottomSheet={setBottomSheet}
        activeUsers={activeUsers} />
    </>
  );
};


// <AssignUsersToTrainers 
// organizationId={user.organizationId}
//  assignTrainer={assignTrainer}
//   setAssignTrainer={setAssignTrainer} 
//   bottomSheet={bottomSheet} 
//   setBottomSheet={setBottomSheet}
//    activeUsers={activeUsers} /> 

export default OrganizationUsers;