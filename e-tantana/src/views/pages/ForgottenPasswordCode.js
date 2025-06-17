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
  CRow,
  CSpinner,
} from "@coreui/react";
import api from "../../const/api";
export default class ForgottenPasswordCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: "",
      email: "",
      loading: false,
      error: null,
    };
  }

  componentDidMount() {
    this.isLinkValid();
  }

  onChangeCode = (e) => {
    this.setState({
      code: e.target.value,
    });
  };

  isLinkValid = () => {
    const option = {
      method: "GET",
    };
    fetch(
      api(`users/isValidLink?link=${this.props.match.params.token}`),
      option
    ).then((res) => {
      if (res.ok) {
        res.json().then((res) => {
          this.setState({ email: res.email });
        });
      } else {
        this.props.history.push(`/passwordForgotten`);
      }
    });
  };

  resetPassword = () => {
    this.setState({
      loading: true,
    });
    const option = {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        code: +this.state.code,
        link: this.props.match.params.token,
      }),
    };
    fetch(api(`users/forgottenPasswordLogin`), option).then((res) => {
      if (res.ok) {
        res.json().then((res) => {
          sessionStorage.setItem("tempUser", JSON.stringify(res.tempUser));
          this.props.history.push(`/resetPassword`);
        });
      } else {
        res.json().then(() => {
          this.setState({
            error: "Code incorrect.",
            loading: false,
          });
        });
      }
    });
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
                        <h1>Réinitialiser votre mot de passe</h1>
                        <p className="text-medium-emphasis">
                          Veuillez consulter votre <b>boite mail</b>. Un email
                          contenant le <b>code de réinitialisation</b> de votre
                          mot de passe vous a été envoyé à l'adresse{" "}
                          <b>{this.state.email}</b>. Veuillez saisir le code
                          reçu.
                        </p>
                        <CInputGroup className="mb-3">
                          <CFormInput
                            placeholder="Code de réinitialisation"
                            value={this.state.code}
                            onChange={this.onChangeCode}
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
                                  <>{"Chargement"}</>
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
