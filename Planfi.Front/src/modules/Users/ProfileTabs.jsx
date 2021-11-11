import React, {
  useState, useEffect,
} from 'react';
import { ClientTrainers } from 'modules/Users/UserProfile/ClientTrainers';
import { TrainerPlans } from 'modules/Users/UserProfile/TrainerPlans';
import { TrainerClients } from 'modules/Users/UserProfile/TrainerClients';
import { UserPlans } from 'modules/Users/UserProfile/UserPlans';
import { translate } from 'utils/Translation';

export const trainerTabs = [{
    id: 1,
    title: translate('MyPlans'),
    icon: 'tabitem__icon fas fa-child',
    content: <TrainerPlans />,
  },
  {
    id: 2,
    title: translate('MyClients'),
    icon: 'tabitem__icon fas fa-child',
    content: <TrainerClients />,
  },
  ];
  
  export const clientTabs = [{
    id: 1,
    title: translate('MyPlans'),
    icon: 'tabitem__icon fas fa-child',
    content: <UserPlans />,
  },
  {
    id: 2,
    title: translate('MyTrainers'),
    icon: 'tabitem__icon fas fa-child',
    content: <ClientTrainers />,
  },
  ];