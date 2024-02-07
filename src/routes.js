import React from 'react';

import { Icon } from '@chakra-ui/react';

import { MdPayment, MdDashboardCustomize, MdAddCard, MdHome } from 'react-icons/md';
import { BsGlobe2, BsPeopleFill, BsCardChecklist } from 'react-icons/bs';

// Admin Imports
import MainDashboard from 'views/admin/default';
import International from 'views/admin/international';
import Profile from 'views/admin/profile';
import CardCluster from 'views/admin/dataTables';
import Benefit from 'views/admin/benefit';
import Payments from 'views/admin/payments';

// Auth Imports
import SignInCentered from 'views/auth/signIn';

const routes = [
    {
        name: 'Main Dashboard',
        layout: '/',
        path: '/dashboard',
        icon: <Icon as={MdDashboardCustomize} width="20px" height="20px" color="inherit" />,
        component: MainDashboard,
        secondary: 'Main Dashboard',
    },
    {
        name: 'International',
        layout: '/',
        path: '/international',
        icon: <Icon as={BsGlobe2} width="20px" height="20px" color="inherit" />,
        component: International,
        secondary: 'International',
    },
    {
        name: 'Customer Cluster',
        layout: '/',
        path: '/customerclusterfile',
        icon: <Icon as={BsPeopleFill} width="20px" height="20px" color="inherit" />,
        component: Profile,
        secondary: 'Customer Cluster',
    },
    {
        name: 'Card Cluster',
        layout: '/',
        path: '/cardcluster',
        icon: <Icon as={MdPayment} width="20px" height="20px" color="inherit" />,
        component: CardCluster,
        secondary: 'Card Cluster',
    },
    {
        name: 'Benefit',
        layout: '/',
        path: '/benefit',
        icon: <Icon as={MdAddCard} width="20px" height="20px" color="inherit" />,
        component: Benefit,
        secondary: 'Benefit',
    },
    {
        name: 'Payments',
        layout: '/',
        path: '/payments',
        icon: <Icon as={BsCardChecklist} width="20px" height="20px" color="inherit" />,
        component: Payments,
        secondary: 'Payments',
    },
];

export default routes;
