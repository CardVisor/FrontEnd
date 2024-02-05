import React from "react";

import { Icon } from "@chakra-ui/react";

import {
  MdPayment,
  MdDashboardCustomize,
  MdAddCard,
  MdHome,
} from "react-icons/md";
import { BsGlobe2, BsPeopleFill, BsCardChecklist } from "react-icons/bs";

// Admin Imports
import MainDashboard from "views/admin/default";
import International from "views/admin/international";
import Profile from "views/admin/profile";
import CardCluster from "views/admin/dataTables";
import Benefit from "views/admin/benefit";
import Payments from "views/admin/payments";

// Auth Imports
import SignInCentered from "views/auth/signIn";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "/dashboard",
    icon: (
      <Icon
        as={MdDashboardCustomize}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    component: MainDashboard,
  },
  {
    name: "International",
    layout: "/admin",
    path: "/international",
    icon: <Icon as={BsGlobe2} width="20px" height="20px" color="inherit" />,
    component: International,
    secondary: true,
  },
  {
    name: "Customer Cluster",
    layout: "/admin",
    path: "/profile",
    icon: <Icon as={BsPeopleFill} width="20px" height="20px" color="inherit" />,
    component: Profile,
  },
  {
    name: "Card Cluster",
    layout: "/admin",
    path: "/cardcluster",
    icon: <Icon as={MdPayment} width="20px" height="20px" color="inherit" />,
    component: CardCluster,
  },
  {
    name: "Benefit",
    layout: "/admin",
    path: "/benefit",
    icon: <Icon as={MdAddCard} width="20px" height="20px" color="inherit" />,
    component: Benefit,
  },
  {
    name: "Payments",
    layout: "/admin",
    path: "/payments",
    icon: (
      <Icon as={BsCardChecklist} width="20px" height="20px" color="inherit" />
    ),
    component: Payments,
  },
];

export default routes;
