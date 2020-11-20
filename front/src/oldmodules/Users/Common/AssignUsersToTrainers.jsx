import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { userService } from 'services/userServices';
import { organizationService } from 'services/organizationServices';
import { alertActions } from 'redux/actions/alert.actions';
import { commonUtil } from 'utils/common.util';
import { Loader } from 'components/atoms/Loader';
import Icon from 'components/atoms/Icon';
import { CheckboxGenericComponent } from 'components/organisms/CheckboxGenericComponent';
import Button from 'components/atoms/Button';
import messages from 'lang/eng';

const ReactBottomsheet = require('react-bottomsheet');

export const AssignUsersToTrainers = ({
  organizationId, assignTrainer, setAssignTrainer, activeUsers, setBottomSheet,
}) => {
  const [trainers, setTrainers] = useState();
  const [activeTrainers, setActiveTrainers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    getAllTrainers();
    if (activeUsers == 0) {
      setAssignTrainer(false);
    }
  }, [activeUsers]);

  const closeAssignPlansToUser = () => {
    setBottomSheet(true);
    setAssignTrainer(false);
  };

  const getAllTrainers = () => {
    organizationService
      .getOrganizationTrainers(organizationId)
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
        dispatch(alertActions.success(messages.users.assignPlanToUserNotification));
        setAssignTrainer(false);
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
          <p>
            {activeUsers.length}
            selected
          </p>
        </div>

        <div className="bottom-nav__item">
          <Icon name="arrow-left" fill="#5E4AE3" />
          <p onClick={() => closeAssignPlansToUser()}>
            {messages.users.returnToSubMenu}
          </p>
        </div>
      </div>

      <div>
        <h4>{messages.users.selectFromPlans}</h4>
        <Loader isLoading={isLoading}>
          {trainers ? <CheckboxGenericComponent dataType="users" displayedValue="firstName" dataList={trainers} onSelect={getSelectedTrainerIds} /> : <h1>{messages.users.noUsers}</h1>}
        </Loader>
        <Button disabled={activeTrainers.length === 0} className="btn btn--primary btn--lg" onClick={assignUserToPlan} name={activeTrainers.length === 0 ? 'Select Plan' : 'Assign Trainers to Users'} />
      </div>

    </ReactBottomsheet>
  );
};
