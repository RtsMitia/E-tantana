import React from "react";
import { Redirect } from "react-router";
import {
  AppContent,
  AppSidebar,
  AppFooter,
  AppHeader,
} from "../components/index";

class DefaultLayout extends React.Component {

  render() {
    if (
      // sessionStorage.getItem("member") &&
      sessionStorage.getItem("jwtToken")
      // sessionStorage.getItem("memberActivity")
    ) {
      return (
        <div>
          <AppSidebar />
          <div className="wrapper d-flex flex-column min-vh-100 bg-light">
            <AppHeader />
            <div className="body flex-grow-1 px-3">
              <AppContent />
            </div>
            <AppFooter />
          </div>
        </div>
      );
    } else {
      return <Redirect to="/" />;
    }
  }
}

export default DefaultLayout;
