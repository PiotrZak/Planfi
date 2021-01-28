import React, { useState, useEffect, useCallback } from 'react';
import { planService } from 'services/planService';
import { commonUtil } from 'utils/common.util';
import Nav from 'components/atoms/Nav';
import 'react-multi-carousel/lib/styles.css';
import Search from 'components/molecules/Search';
import { translate } from 'utils/Translation';
import { CheckboxGenericComponent } from 'components/organisms/CheckboxGeneric';
import GlobalTemplate from 'templates/GlobalTemplate';
import { useThemeContext } from 'support/context/ThemeContext';
import SmallButton from 'components/atoms/SmallButton';
import { useNotificationContext, ADD } from 'support/context/NotificationContext';
import { useUserContext } from 'support/context/UserContext';
import Heading from 'components/atoms/Heading';
import AddPlanModal from './AddPlanModal';
import PlansPanel from './PlansPanel';
import Loader from 'components/atoms/Loader';


const Plan = (props) => {
  const { notificationDispatch } = useNotificationContext();
  const { theme } = useThemeContext();
  const { user } = useUserContext();

  const [plans, setPlans] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [bottomSheet, setBottomSheet] = useState('none');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPlans, setSelectedPlans] = useState([]);

  const { match } = props;
  const { id } = match.params;

  const deletePlans = useCallback(() => {
    planService
      .deletePlans(selectedPlans)
      .then(() => {
        setBottomSheet('none');
        notificationDispatch({
          type: ADD,
          payload: {
            content: { success: 'OK', message: translate('PlansDeleted') },
            type: 'positive',
          },
        });
      })
      .catch((error) => {
        notificationDispatch({
          type: ADD,
          payload: {
            content: { error, message: translate('ErrorAlert') },
            type: 'error',
          },
        });
      });
    }, [selectedPlans]);

  const getPlans = (id) => {
    planService
      .getOrganizationPlans(id)
      .then((data) => {
        setPlans(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getPlans(user.organizationId);
    console.log('rerender')
  }, [id, openModal, openEditModal, setOpenEditModal,deletePlans]);

  const closeModal = () => {
    setOpenModal(false);
  };

  const submissionHandleElement = (selectedData) => {
    const selectedPlans = commonUtil.getCheckedData(selectedData, 'planId');
    setSelectedPlans(selectedPlans);
    selectedPlans.length > 0 ? setBottomSheet('flex') : setBottomSheet('none');
  };

  const filterPlans = (event) => {
    setSearchTerm(event.target.value);
  };

  const results = !searchTerm
    ? plans
    : plans.filter((plan) => plan.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()));

  return (
    <>
      <GlobalTemplate>
        <Nav>
          <Heading>{translate('PlansTitle')}</Heading>
          <SmallButton iconName="plus" onClick={() => setOpenModal(true)} />
        </Nav>
        <Loader isLoading={isLoading} >
          <Search callBack={filterPlans} placeholder={translate('PlanSearch')} />
          {plans.length >= 1 ? (
            <CheckboxGenericComponent
              dataType="plans"
              displayedValue="title"
              dataList={results}
              onSelect={submissionHandleElement}
            />
          )
            : <h3>{translate('NoPlans')}</h3>}
        </Loader>
      </GlobalTemplate>
      <AddPlanModal theme={theme} openModal={openModal} onClose={closeModal} />
      <PlansPanel
        deletePlans={deletePlans}
        theme={theme}
        bottomSheet={bottomSheet}
        setBottomSheet={setBottomSheet}
        selectedPlans={selectedPlans}
        setOpenEditModal={setOpenEditModal}
        openEditModal={openEditModal}
      />
    </>
  );
};

export default Plan;
