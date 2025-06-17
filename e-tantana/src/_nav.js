import React from "react";
import CIcon from "@coreui/icons-react";
import {
  cilCalendar,
  cilChart,
  cilCreditCard,
  cilGraph,
  cilMap,
  cilMoney,
  cilStar,
  cilTag,
  cilUser,
  cilVector,
} from "@coreui/icons";
import { CNavGroup, CNavItem, CNavTitle } from "@coreui/react";

const _menu = [
  [
    {
      component: CNavTitle,
      name: "Gestion de Base",
      access: 0,
      menu: [
        { component: CNavItem, 
          name: "Membre", 
          access: 0,
          icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
          to: "/member" 
        }
      ],
    },
  ],
  [
    {
      component: CNavTitle,
      name: "Vatom-panorenana",
      access: 0,
      menu: [
        {
          component: CNavItem,
          name: "Tarif",
          access: 0,
          to: "/membershipFee",
          icon: <CIcon icon={cilMoney} customClassName="nav-icon" />,
        },
        {
          component: CNavGroup,
          name: "Paiement",
          access: 0,
          to: "/",
          icon: <CIcon icon={cilCreditCard} customClassName="nav-icon" />,
          items: [
            {
              component: CNavItem,
              access: 0,
              name: "Paiement individuel",
              to: "/individualPayment",
            },
            {
              component: CNavItem,
              access: 0,
              name: "Paiement en groupe",
              to: "/groupPayment",
            },
            {
              component: CNavItem,
              access: 1,
              name: "Paiements à valider",
              to: "/invalidPayment",
            },
            {
              component: CNavItem,
              access: 0,
              name: "Liste des paiements",
              to: "/payment",
            },
            {
              component: CNavItem,
              access: 0,
              name: "Generation de tickets",
              to: "/publicPaymentList",
            },
            {
              component: CNavItem,
              access: 0,
              name: "Verification de paiement",
              to: "/checkPaymentTickets",
            },
          ],
        },
        {
          component: CNavGroup,
          name: "Statistiques",
          access: 0,
          show: ["Nasionaly"],
          icon: <CIcon icon={cilGraph} customClassName="nav-icon" />,
          to: "/",
          items: [
            {
              component: CNavItem,
              access: 0,
              name: "Statistiques globales ",
              to: "/statistic",
            },
            {
              component: CNavItem,
              access: 0,
              name: "Statistiques par catégorie",
              to: "/paymentStatisticHierarchy",
            },
          ],
        },
      ],
    },
  ],
  // [
  //   {
  //     component: CNavTitle,
  //     name: "Gestion des membres",
  //     menu: [
  //       {
  //         component: CNavItem,
  //         name: "Gestion des adultes",
  //         to: "/AdultInfo",
  //         icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  //       },
  //       {
  //         component: CNavGroup,
  //         name: "Transfert des membres",
  //         to: "/",
  //         icon: <CIcon icon={cilTransfer} customClassName="nav-icon" />,
  //         items: [
  //           {
  //             component: CNavItem,
  //             name: "Demande de transfert",
  //             to: "/memberTransferRequest",
  //           },
  //           {
  //             component: CNavItem,
  //             name: "Validation de transfert",
  //             to: "/memberTransferValidation",
  //           },
  //         ],
  //       },
  //     ],
  //   },
  // // ],
  // [
  //   {
  //     component: CNavTitle,
  //     name: "Gestion des projets",
  //     menu: [
  //       {
  //         component: CNavItem,
  //         name: "Validation des projets",
  //         to: "/project",
  //         icon: <CIcon icon={cilFolder} customClassName="nav-icon" />,
  //       },
  //     ],
  //   },
  // ],
  [
    {
      component: CNavTitle,
      name: "Configuration",
      access: 1,
      menu: [
        { 
          component: CNavItem, 
          name: "Lieu d'activité", 
          access: 1,
          show: ["Nasionaly", "Diosezy"],
          icon: <CIcon icon={cilMap} customClassName="nav-icon" />,
          to: "/activityField" 
        },
        { 
          component: CNavItem, 
          name: "Utilisateur", 
          access: 1,
          show: ["Nasionaly"],
          icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
          to: "/user" 
        },
        { 
          component: CNavItem, 
          name: "Année d'activité", 
          access: 1,
          show: ["Nasionaly"],
          icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
          to: "/activityYear" 
        },
        { 
          component: CNavItem, 
          name: "Hierarchies (Rafitra)", 
          access: 1,
          show: ["Nasionaly"],
          icon: <CIcon icon={cilChart} customClassName="nav-icon" />,
          to: "/hierarchy" 
        },
        { 
          component: CNavItem, 
          name: "Branches", 
          access: 1,
          show: ["Nasionaly"],
          icon: <CIcon icon={cilVector} customClassName="nav-icon" />,
          to: "/section" 
        },
        { 
          component: CNavItem, 
          name: "Roles des membres", 
          access: 1,
          show: ["Nasionaly"],
          icon: <CIcon icon={cilTag} customClassName="nav-icon" />,
          to: "/memberRole" 
        },
        { 
          component: CNavItem, 
          name: "Sacrement", 
          access: 1,
          show: ["Nasionaly"],
          icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
          to: "/sacrement" 
        },
      ],
    },
  ],
];

export default _menu;
