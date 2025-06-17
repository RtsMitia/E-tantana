import React from "react";
import AddPaymentReference from "./views/vato-fanorenana/AddPaymentReference";
import PublicPaymentsLogged from "./views/vato-fanorenana/PublicPaymentsLogged";
import CreateActivityField from "./views/crud/ActivityField/CreateActivityField";
import CrudActivityField from "./views/crud/ActivityField/CrudActivityField";
const CrudActivityYear = React.lazy(() =>
  import("./views/crud/ActivityYear/CrudActivityYear")
);
const CreateActivityYear = React.lazy(() =>
  import("./views/crud/ActivityYear/CreateActivityYear")
);
const UpdateActivityYear = React.lazy(() =>
  import("./views/crud/ActivityYear/UpdateActivityYear")
);
const CrudMemberRole = React.lazy(() =>
  import("./views/crud/MemberRole/CrudMemberRole")
);
const CreateMemberRole = React.lazy(() =>
  import("./views/crud/MemberRole/CreateMemberRole")
);
const UpdateMemberRole = React.lazy(() =>
  import("./views/crud/MemberRole/UpdateMemberRole")
);
const CrudSacrement = React.lazy(() =>
  import("./views/crud/Sacrement/CrudSacrement")
);
const CreateSacrement = React.lazy(() =>
  import("./views/crud/Sacrement/CreateSacrement")
);
const UpdateSacrement = React.lazy(() =>
  import("./views/crud/Sacrement/UpdateSacrement")
);
const CrudSection = React.lazy(() =>
  import("./views/crud/Section/CrudSection")
);
const CreateSection = React.lazy(() =>
  import("./views/crud/Section/CreateSection")
);
const UpdateSection = React.lazy(() =>
  import("./views/crud/Section/UpdateSection")
);
const CrudMemberActivity = React.lazy(() =>
  import("./views/crud/MemberActivity/CrudMemberActivity")
);
const CreateMemberActivity = React.lazy(() =>
  import("./views/crud/MemberActivity/CreateMemberActivity")
);
const UpdateMemberActivity = React.lazy(() =>
  import("./views/crud/MemberActivity/UpdateMemberActivity")
);
const CrudUser = React.lazy(() => import("./views/crud/User/CrudUser"));
const CreateUser = React.lazy(() => import("./views/crud/User/CreateUser"));
const UpdateUser = React.lazy(() => import("./views/crud/User/UpdateUser"));
const CrudHierarchy = React.lazy(() =>
  import("./views/crud/Hierarchy/CrudHierarchy")
);
const CreateHierarchy = React.lazy(() =>
  import("./views/crud/Hierarchy/CreateHierarchy")
);
const UpdateHierarchy = React.lazy(() =>
  import("./views/crud/Hierarchy/UpdateHierarchy")
);
const CrudMemberSacrement = React.lazy(() =>
  import("./views/crud/CrudMemberSacrement")
);
const CrudMember = React.lazy(() => import("./views/crud/Member/CrudMember"));
const CreateMember = React.lazy(() =>
  import("./views/crud/Member/CreateMember")
);
const UpdateMember = React.lazy(() =>
  import("./views/crud/Member/UpdateMember")
);
const IndividualPayment = React.lazy(() =>
  import("./views/vato-fanorenana/IndividualPayment")
);
const GroupPayment = React.lazy(() =>
  import("./views/vato-fanorenana/GroupPayment")
);
const MembershipFee = React.lazy(() =>
  import("./views/vato-fanorenana/MembershipFee")
);
const InvalidPayment = React.lazy(() =>
  import("./views/vato-fanorenana/InvalidPayment")
);
const Payment = React.lazy(() => import("./views/vato-fanorenana/Payment"));
const PaymentDraftDetail = React.lazy(() =>
  import("./views/vato-fanorenana/PaymentDraftDetail")
);
const PaymentDetail = React.lazy(() =>
  import("./views/vato-fanorenana/PaymentDetail")
);
const StatisticGlobal = React.lazy(() =>
  import("./views/vato-fanorenana/StatisticGlobal")
);
const AdultInfo = React.lazy(() =>
  import("./views/member-management/AdultInfo")
);
const MemberTransferRequest = React.lazy(() =>
  import("./views/member-management/MemberTransferRequest")
);
const MemberInfo = React.lazy(() =>
  import("./views/member-management/MemberInfo")
);
const QrCodeScann = React.lazy(() =>
  import("./views/member-management/QrCodeScann")
);
const MemberCard = React.lazy(() =>
  import("./views/member-management/MemberCard")
);
const MemberTransferValidation = React.lazy(() =>
  import("./views/member-management/MemberTransferValidation")
);
const StatisticByCategory = React.lazy(() =>
  import("./views/vato-fanorenana/StatisticByCategory")
);
const ProjectList = React.lazy(() => import("./views/vadibainga/ProjectList"));
const UpdatePassword = React.lazy(() => import("./views/pages/UpdatePassword"));
// const PublicPayment = React.lazy(() =>
//   import("./views/vato-fanorenana/PublicPayments")
// );
// const PaymentTickets = React.lazy(() =>
//   import("./views/vato-fanorenana/PaymentTickets")
// );
// const CheckPaymentTicket = React.lazy(() =>
//   import("./views/vato-fanorenana/CheckPaymentTicket")
// );
// const PaymentTicketDetails = React.lazy(() =>
//   import("./views/vato-fanorenana/PaymentTicketDetails")
// );
const routes = [
  // {
  //   path: "/paymentTickets/details/:id",
  //   name: "Details de tickets de paiements",
  //   component: PaymentTicketDetails,
  // },
  // {
  //   path: "/checkPaymentTickets",
  //   name: "Verification de tickets de paiements",
  //   component: CheckPaymentTicket,
  // },
  // {
  //   path: "/paymentTickets/:tickets",
  //   name: "Tickets de paiements",
  //   component: PaymentTickets,
  // },
  {
    path: "/publicPaymentList",
    name: "Liste des paiments",
    component: PublicPaymentsLogged,
  },
  {
    path: "/updatePassword",
    name: "Modifier mon mot de passe",
    component: UpdatePassword,
  },
  {
    path: "/activityField/add",
    name: "Ajout lieu d'activité",
    component: CreateActivityField,
  },
  {
    path: "/activityField",
    name: "Liste des lieux d'activité",
    component: CrudActivityField,
  },
  {
    path: "/activityField/add",
    name: "Ajout lieu d'activité",
    component: CreateActivityField,
  },
  {
    path: "/activityField/add",
    name: "Ajout lieu d'activité",
    component: CreateActivityField,
  },
  {
    path: "/activityField/add",
    name: "Ajout lieu d'activité",
    component: CreateActivityField,
  },
  {
    path: "/activityField/add",
    name: "Ajout lieu d'activité",
    component: CreateActivityField,
  },
  {
    path: "/activityField/add",
    name: "Ajout lieu d'activité",
    component: CreateActivityField,
  },
  {
    path: "/activityField/add",
    name: "Ajout lieu d'activité",
    component: CreateActivityField,
  },
  {
    path: "/activityField/add",
    name: "Ajout lieu d'activité",
    component: CreateActivityField,
  },
  {
    path: "/invalidPayment",
    name: "Payment non validé",
    component: InvalidPayment,
  },
  {
    path: "/memberInfo/:id",
    name: "Information sur un membre",
    component: MemberInfo,
  },
  {
    path: "/project",
    name: "Projet non validé",
    component: ProjectList,
  },
  {
    path: "/paymentStatisticHierarchy",
    name: "Statistiques sur les paiements par hierarchie",
    component: StatisticByCategory,
  },
  {
    path: "/statistic",
    name: "Statistique globale sur les paiements",
    component: StatisticGlobal,
  },
  {
    path: "/memberCard/:id",
    name: "Carte des membres",
    component: MemberCard,
  },
  {
    path: "/memberCard",
    name: "Carte des membres",
    component: MemberCard,
  },
  {
    path: "/adultInfo",
    name: "Informations sur les membres adultes",
    component: AdultInfo,
  },
  {
    path: "/memberTransferRequest",
    name: "Demande de transfert d'un membre",
    component: MemberTransferRequest,
  },
  {
    path: "/memberTransferValidation",
    name: "Validation de transfert d'un membre",
    component: MemberTransferValidation,
  },
  {
    path: "/scan",
    name: "",
    component: QrCodeScann,
  },
  {
    path: "/payment",
    name: "Payment",
    component: Payment,
  },
  {
    path: "/paymentDraftDetail/:id/ref",
    name: "Ajout de référence de paiement",
    component: AddPaymentReference,
  },
  {
    path: "/paymentDraftDetail/:id",
    name: "Détails d'un paiement",
    component: PaymentDraftDetail,
  },
  {
    path: "/paymentDetail/:id",
    name: "Détails d'un paiement",
    component: PaymentDetail,
  },
  {
    path: "/activityYear/add",
    name: "Ajout d'année d'activité",
    component: CreateActivityYear,
  },
  {
    path: "/activityYear/:id",
    name: "Modification d'année d'activité",
    component: UpdateActivityYear,
  },
  {
    path: "/activityYear",
    name: "Année d'activité",
    component: CrudActivityYear,
  },
  {
    path: "/hierarchy/add",
    name: "Ajout de hierarchie",
    component: CreateHierarchy,
  },
  {
    path: "/hierarchy/:id",
    name: "Modifier une hierarchie",
    component: UpdateHierarchy,
  },
  {
    path: "/hierarchy",
    name: "Hierarchie",
    component: CrudHierarchy,
  },
  {
    path: "/user/add",
    name: "Ajouter un tilisateur",
    component: CreateUser,
  },
  {
    path: "/user/:id",
    name: "Modifier un tilisateur",
    component: UpdateUser,
  },
  {
    path: "/user",
    name: "Utilisateur",
    component: CrudUser,
  },
  {
    path: "/memberActivity/add",
    name: "Ajout d'activité de membre",
    component: CreateMemberActivity,
  },
  {
    path: "/memberActivity/edit/:id",
    name: "Modification d'activité de membre",
    component: UpdateMemberActivity,
  },
  {
    path: "/memberActivity/:id",
    name: "Activité des membres",
    component: CrudMemberActivity,
  },
  {
    path: "/section/add",
    name: "Ajouter une section",
    component: CreateSection,
  },
  {
    path: "/section/:id",
    name: "Modifier une section",
    component: UpdateSection,
  },
  { path: "/section", name: "Section", component: CrudSection },
  {
    path: "/sacrement/add",
    name: "Ajout de sacrement",
    component: CreateSacrement,
  },
  {
    path: "/sacrement/:id",
    name: "Modification de sacrement",
    component: UpdateSacrement,
  },
  { path: "/sacrement", name: "Sacrement", component: CrudSacrement },
  {
    path: "/memberRole/add",
    name: "Ajouter un role de membre",
    component: CreateMemberRole,
  },
  {
    path: "/memberRole/:id",
    name: "Modifier un role de membre",
    component: UpdateMemberRole,
  },
  { path: "/memberRole", name: "Role des membres", component: CrudMemberRole },
  {
    path: "/memberSacrement/:id",
    name: "Sacrement d'un membre",
    component: CrudMemberSacrement,
  },
  {
    path: "/member/add",
    name: "Ajout de membre",
    component: CreateMember,
    access: true,
  },
  {
    path: "/member/:id",
    name: "Modification de membre",
    component: UpdateMember,
  },
  { path: "/member", name: "Membre", component: CrudMember },
  {
    path: "/individualPayment",
    name: "Paiement individuel",
    component: IndividualPayment,
  },
  {
    path: "/groupPayment",
    name: "Paiement en groupe",
    component: GroupPayment,
  },
  {
    path: "/membershipFee",
    name: "Tarif",
    component: MembershipFee,
  },
];
export default routes;
