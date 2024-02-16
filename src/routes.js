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
        path: '/main',
        icon: <Icon as={MdDashboardCustomize} width="20px" height="20px" color="inherit" />,
        element: <MainDashboard />,
        secondary: true,
    },
    {
        name: 'International',
        layout: '/',
        path: '/international',
        icon: <Icon as={BsGlobe2} width="20px" height="20px" color="inherit" />,
        element: <International />,
        secondary: true,
    },
    {
        name: 'Customer Cluster',
        layout: '/',
        path: '/customercluster',
        icon: <Icon as={BsPeopleFill} width="20px" height="20px" color="inherit" />,
        element: <Profile />,
        secondary: true,
    },
    {
        name: 'Card Cluster',
        layout: '/',
        path: '/cardcluster',
        icon: <Icon as={MdPayment} width="20px" height="20px" color="inherit" />,
        element: <CardCluster />,
        secondary: true,
    },
    {
        name: 'Benefit Cluster',
        layout: '/',
        path: '/benefitcluster',
        icon: <Icon as={MdAddCard} width="20px" height="20px" color="inherit" />,
        element: <Benefit />,
        secondary: true,
    },
];

export default routes;
