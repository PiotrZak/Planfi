import React, { useState, useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { userService } from 'services/userServices';
import { alertActions } from 'redux/actions/alert.actions';
import Return from 'components/atoms/Return';
import { commonUtil } from 'utils/common.util';
import { Loader } from 'components/atoms/Loader';
import Icon from 'components/atoms/Icon';
import { CheckboxGenericComponent } from 'components/organisms/CheckboxGenericComponent';
import { userContext } from 'App';
import { isMobile } from 'react-device-detect';
import InviteUserModal from '../InviteUsersModal';

const assignTrainerToUserNotification = 'Trainer sucesfully assigned to users!';
const noUsers = 'There are no Users';
const userDeleted = 'Users sucessfully deleted!';

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
    </div>
  );
};
