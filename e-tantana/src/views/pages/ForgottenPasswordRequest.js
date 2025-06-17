import { Redirect } from "react-router-dom";
import React, { Component } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CLink,
  CRow,
  CSpinner,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilUser } from "@coreui/icons";
import api from "../../const/api";
export default class ForgottenPasswordRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      loading: false,
      error: null,
    };
  }

  onChangeUsername = (e) => {
    this.setState({
      username: e.target.value,
    });
  };

  resetPassword = () => {
    this.setState({
      loading: true,
    });
    const option = {
      method: "GET",
    };
    fetch(api(`users/password?email=${this.state.username}`), option).then(
      (res) => {
        if (res.ok) {
          res.json().then((res) => {
            this.setState({ loading: false }, () => {
              this.props.history.push(`/passwordForgottenCode/${res.generatedLink}?email=${res.email}`);
            });
          });
        } else {
          res.json().then(() => {
            this.setState({
              error: "Adresse email ou nom d'utilisateur incorrect.",
              loading: false,
            });
          });
        }
      }
    );
  };

  render() {
    if (
      // !sessionStorage.getItem("member") &&
      !sessionStorage.getItem("jwtToken")
      // !sessionStorage.getItem("memberActivity")
    ) {
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
                        <h1>Demande de réinitialisation de mot de passe</h1>
                        <p className="text-medium-emphasis">
                          Veuillez entrer l'adresse email ou le nom
                          d'utilisateur de votre compte. Nous enverrons un mail
                          de réinitialisation de mot de passe.
                        </p>
                        <CInputGroup className="mb-3">
                          <CInputGroupText>
                            <CIcon icon={cilUser} />
                          </CInputGroupText>
                          <CFormInput
                            placeholder="Adresse mail ou nom d'utilisateur"
                            autoComplete="username"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                          />
                        </CInputGroup>
                        <CRow>
                          <center>
                            <p className="text-danger"> {this.state.error} </p>{" "}
                          <p><CLink href="/login">
                            Se connecter
                          </CLink></p>
                            {" "}
                            <CButton
                              id="aim-color-green"
                              className="px-4"
                              type="submit"
                              onClick={this.resetPassword}
                              disabled={this.state.loading}
                            >
                              {this.state.loading ? (
                                <>
                                  <CSpinner
                                    className="me-2"
                                    color="light"
                                    size="sm"
                                  />
                                  <>{"Envoi du mail"}</>
                                </>
                              ) : (
                                <>{"Réinitialiser"}</>
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
    } else {
      return <Redirect to="/member" />;
    }
  }
}
