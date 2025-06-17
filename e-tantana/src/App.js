import React, { Component, Suspense } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./scss/style.scss";
import PublicPayments from "./views/vato-fanorenana/PublicPayments";
import PaymentTickets from "./views/vato-fanorenana/PaymentTickets";
import CheckPaymentTicket from "./views/vato-fanorenana/CheckPaymentTicket";
import PaymentTicketDetails from "./views/vato-fanorenana/PaymentTicketDetails";

const Login = React.lazy(() => import("./views/pages/Login"));
const ForgottenPasswordRequest = React.lazy(() =>
  import("./views/pages/ForgottenPasswordRequest")
);
const ForgottenPasswordCode = React.lazy(() =>
  import("./views/pages/ForgottenPasswordCode")
);
const ResetPassword = React.lazy(() => import("./views/pages/ResetPassword"));
const DefaultLayout = React.lazy(() => import("./layout/DefaultLayout"));
const FirstPassword = React.lazy(() => import("./views/pages/FirstPassword"));
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

class App extends Component {
  render() {
    return (
      <Router>
        <Suspense fallback={loading}>
          <Switch>
            <Route exact path="/paymentTickets/details/:id" component={PaymentTicketDetails} />
            <Route exact path="/checkPaymentTickets" component={CheckPaymentTicket} />
            <Route exact path="/paymentTickets/:tickets" component={PaymentTickets} />
            <Route exact path="/publicPayment" component={PublicPayments} />
            <Route exact path="/login" component={Login} />
            <Route
              exact
              path="/passwordForgotten"
              component={ForgottenPasswordRequest}
            />
            <Route
              exact
              path="/passwordForgottenCode/:token"
              component={ForgottenPasswordCode}
            />
            <Route
              exact
              path="/firstPassword/:token"
              component={FirstPassword}
            />
            <Route exact path="/resetPassword" component={ResetPassword} />
            <Route exact path="/" component={Login} />
            <Route path="*" name="Home" component={DefaultLayout} />
          </Switch>
        </Suspense>
      </Router>
    );
  }
}

export default App;
