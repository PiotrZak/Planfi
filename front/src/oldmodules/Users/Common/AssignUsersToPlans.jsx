import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { userService } from 'services/userServices';
import { planService } from 'services/planService';
import { alertActions } from 'redux/actions/alert.actions';
import { commonUtil } from 'utils/common.util';
import { Loader } from 'components/atoms/Loader';
import Icon from 'components/atoms/Icon';
import { CheckboxGenericComponent } from 'components/organisms/CheckboxGenericComponent';
import Button from 'components/atoms/Button';
import messages from 'lang/eng';

const ReactBottomsheet = require('react-bottomsheet');

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
    if (activeUsers == 0) {
      setAssignPlan(false);
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
        dispatch(alertActions.success(messages.users.assignPlanToUserNotification));
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
            {messages.users.returnToSubMenu}
          </p>
        </div>
      </div>

      <div>
        <h4>{messages.users.selectFromPlans}</h4>
        <Loader isLoading={isLoading}>
          {plansResults ? <CheckboxGenericComponent dataType="plans" displayedValue="title" dataList={plansResults} onSelect={getSelectedPlanIds} /> : <p>No Plans</p>}
        </Loader>
        <Button disabled={activePlans.length === 0} className="btn btn--primary btn--lg" onClick={assignUserToPlan} name={activePlans.length === 0 ? 'Select Plan' : 'Assign Plans to Users'} />
      </div>

    </ReactBottomsheet>
  );
};
