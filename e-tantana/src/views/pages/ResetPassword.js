import React, { Component } from "react";
import api from "../../const/api";
import {
  CCard,
  CCardBody,
  CCol,
  CForm,
  CFormInput,
  CButton,
  CContainer,
  CRow,
  CCardGroup,
  CInputGroup,
  CInputGroupText,
  CSpinner,
} from "@coreui/react";
import { Redirect } from "react-router-dom/cjs/react-router-dom";
import CIcon from "@coreui/icons-react";
import { cilLockLocked } from "@coreui/icons";

export default class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPassword: "",
      confirmPassword: "",
      alert: false,
      error: null,
      pending: false,
    };
  }

  clearFields = () => {
    this.setState({
      newPassword: "",
      confirmPassword: "",
      alert: false,
      error: null,
      pending: false,
    });
  };

  onChangeNewPassword = (e) => {
    this.setState({
      newPassword: e.target.value,
    });
  };

  onChangeConfirmPassword = (e) => {
    this.setState(
      {
        confirmPassword: e.target.value,
      },
      () => {
        if (this.state.newPassword !== this.state.confirmPassword)
          this.setError("Les mots de passes ne correspondent pas.");
        else this.setError();
      }
    );
  };

  setError = (error) => {
    if (error)
      this.setState({
        alert: true,
        error,
      });
    else
      this.setState({
        alert: false,
        error: null,
      });
  };

  setPending = (state) => {
    this.setState({ pending: state });
  };

  getError(error) {
    if (error === "User does not exist.")
      return "Cet utilisateur n'éxiste pas.";
    else if (error === "Wrong old password.")
      return "Ancien mot de passe incorrect.";
    else return "Un problème est survenu.";
  }

  updatePassword = () => {
    this.setPending(true);
    const id = JSON.parse(sessionStorage.getItem("tempUser")).id;
    const option = {
      headers: { "Content-Type": "application/json" },
      method: "PUT",
      body: JSON.stringify({
        password: this.state.newPassword,
      }),
    };
    fetch(api(`users/${id}/forgottenPassword`), option).then((res) => {
      this.setPending(false);
      if (res.ok) {
        this.clearFields();
        this.props.history.push("/login");
      } else {
        res.json().then((res) => {
          this.setError(this.getError(res.message));
        });
      }
    });
  };

  render() {
    if (sessionStorage.getItem("tempUser")) {
      const user = JSON.parse(sessionStorage.getItem("tempUser"));
      return (
        <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
          <CContainer>
            <CRow className="justify-content-center">
              <CCol md={8}>
                <CCardGroup>
                  <CCard className="p-4">
                    <CCardBody>
                      <CForm
                        onSubmit={(e) => {
                          e.preventDefault();
                        }}
                      >
                        <h1>Réinitialisation du mot de passe</h1>
                        <p className="text-medium-emphasis">
                          Veuillez entrer le nouveau mot de passe pour{" "}
                          {user.name}{" "}
                          {user.username &&
                            user.username.length > 0 &&
                            `(${user.username})`}
                          .
                        </p>
                        <CInputGroup className="mb-3">
                          <CInputGroupText>
                            <CIcon icon={cilLockLocked} />
                          </CInputGroupText>
                          <CFormInput
                            placeholder="Mot de passe"
                            value={this.state.newPassword}
                            onChange={this.onChangeNewPassword}
                            type="password"
                          />
                        </CInputGroup>
                        <CInputGroup className="mb-3">
                          <CInputGroupText>
                            <CIcon icon={cilLockLocked} />
                          </CInputGroupText>
                          <CFormInput
                            placeholder="Confirmer mot de passe"
                            value={this.state.confirmPassword}
                            onChange={this.onChangeConfirmPassword}
                            type="password"
                          />
                        </CInputGroup>
                        <CRow>
                          <center>
                            <p className="text-danger"> {this.state.error} </p>{" "}
                          </center>
                          <center>
                            {" "}
                            <CButton
                              id="aim-color-green"
                              className="px-4"
                              type="submit"
                              onClick={this.updatePassword}
                              disabled={this.state.pending}
                            >
                              {this.state.pending ? (
                                <>
                                  <CSpinner
                                    className="me-2"
                                    color="light"
                                    size="sm"
                                  />
                                  <>{"Modification"}</>
                                </>
                              ) : (
                                <>{"Modifier"}</>
                              )}
                            </CButton>
                          </center>
                        </CRow>
                      </CForm>
                    </CCardBody>
                  </CCard>
                </CCardGroup>
              </CCol>
            </CRow>
          </CContainer>
        </div>
      );
    } else return <Redirect to={"/passwordForgotten"} />;
  }
}
