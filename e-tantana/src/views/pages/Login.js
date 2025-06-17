import { Redirect } from "react-router-dom";
import React, { Component } from "react";
import { Link } from "react-router-dom";
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
import { cilLockLocked, cilUser } from "@coreui/icons";
import api from "../../const/api";
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      mdp: "",
      error: "",
      loading: false,
    };
  }

  onChangeUsername = (e) => {
    this.setState({
      username: e.target.value,
    });
  };

  onChangeMdp = (e) => {
    this.setState({
      mdp: e.target.value,
    });
  };

  loginFunction = (event) => {
    this.setState({
      loading: true
    });
    const option = {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.mdp,
      }),
    };
    fetch(api("users/login"), option).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          sessionStorage.setItem("jwtToken", data.token);
          // sessionStorage.setItem("member", JSON.stringify(data.member));
          sessionStorage.setItem("user", JSON.stringify(data.user));
          // sessionStorage.setItem(
          //   "memberActivity",
          //   JSON.stringify(data.memberActivity)
          // );
          this.setState({
            loading: false
          });
          this.props.history.push("/member");
        });
      } else {
        res.json().then((res) => {
          if(res.message === 'Username or password incorrect.')
            this.setState({
              error: "Mot de passe ou nom d'utilisateur incorrect",
              loading: false,
            });
          else if(res.message === 'Password incorrect.')
            this.setState({
              error: `Mot de passe incorrect. ${3 - res.errorCount} tentatives restantes.`,
              loading: false,
            });
          else if(res.message === 'Account blocked.')
            this.setState({
              error: `Ce compte est bloqué, veuillez contacter l'administrateur.`,
              loading: false,
            });
          else 
            this.setState({
              error: `Un problème est survenu.`,
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
                      <CForm onSubmit={this.loginFunction}>
                        <h1>Login</h1>
                        <p className="text-medium-emphasis">
                          Se connecter à votre compte
                        </p>
                        <CInputGroup className="mb-3">
                          <CInputGroupText>
                            <CIcon icon={cilUser} />
                          </CInputGroupText>
                          <CFormInput
                            placeholder="Nom d'utilisateur"
                            autoComplete="username"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                          />
                        </CInputGroup>
                        <CInputGroup className="mb-4">
                          <CInputGroupText>
                            <CIcon icon={cilLockLocked} />
                          </CInputGroupText>
                          <CFormInput
                            type="password"
                            placeholder="Mot de passe"
                            autoComplete="current-password"
                            value={this.state.mdp}
                            onChange={this.onChangeMdp}
                          />
                        </CInputGroup>
                          <center>
                          <CLink href="passwordForgotten">
                            Mot de passe oublié?
                          </CLink>
                          </center>
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
                              onClick={this.loginFunction}
                              disabled={this.state.loading}
                            >{this.state.loading ? (
                              <>
                                <CSpinner className="me-2" color="light" size="sm" />
                                <>{"Connexion"}</>
                              </>
                            ) : (
                              <>{"Se connecter"}</>
                            )}
                            </CButton>
                          </center>
                        </CRow>
                      </CForm>
                    </CCardBody>
                  </CCard>
                  <CCard
                    id="aim-color-green"
                    className=" text-white py-5 "
                    style={{ width: "44%" }}
                  >
                    <CCardBody className="text-center">
                      <div>
                        <h2>
                          E-TANTANA
                        </h2>

                        <Link to="/publicPayment">
                          <CButton
                            color="success"
                            className="mt-3"
                            active
                            tabIndex={-1}
                          >
                            Liste de paiement
                          </CButton>
                        </Link>
                        <Link to="/checkPaymentTickets">
                          <CButton
                            color="success"
                            className="mt-3"
                            active
                            tabIndex={-1}
                          >
                            Verification de paiement
                          </CButton>
                        </Link>
                      </div>
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
