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
import CIcon from "@coreui/icons-react";
import { cilLockLocked } from "@coreui/icons";
import Loading from "./Loading";

export default class Password extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPassword: "",
      confirmPassword: "",
      alert: false,
      error: null,
      pending: false,
      loading: true,
    };
  }

  clearFields = () => {
    this.setState({
      newPassword: "",
      confirmPassword: "",
      alert: false,
      error: null,
      pending: false,
      user: null,
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

  componentDidMount() {
    this.isLinkValid();
  }

  isLinkValid = () => {
    this.setState({ loading: true });
    const option = {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        link: this.props.match.params.token,
      }),
    };
    fetch(api(`users/firstPasswordLogin`), option).then((res) => {
      if (res.ok) {
        res.json().then((res) => {
          this.setState({ user: res.tempUser, loading: false });
        });
      } else {
        this.props.history.push(`/login`);
      }
    });
  };

  updatePassword = () => {
    this.setPending(true);
    const id = this.state.user.id;
    const option = {
      headers: { "Content-Type": "application/json" },
      method: "PUT",
      body: JSON.stringify({
        password: this.state.newPassword,
      }),
    };
    fetch(api(`users/${id}/firstPassword`), option).then((res) => {
      this.setPending(false);
      if (res.ok) {
        res.json().then((data) => {
          sessionStorage.setItem("jwtToken", data.token);
          sessionStorage.setItem("member", JSON.stringify(data.member));
          sessionStorage.setItem("user", JSON.stringify(data.user));
          sessionStorage.setItem(
            "memberActivity",
            JSON.stringify(data.memberActivity)
          );
          this.setState({
            loading: false,
          });
          this.props.history.push("/member");
        });
      } else {
        res.json().then((res) => {
          this.setError(this.getError(res.message));
        });
      }
    });
  };

  render() {
    const { loading, user } = this.state;
    if (loading) {
      return <Loading />;
    }
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
                      <h1>Choix de mot de passe</h1>
                      <p className="text-medium-emphasis">
                        Veuillez entrer un mot de passe pour <b>{user.name}{" "}
                        {user.username &&
                          user.username.length > 0 &&
                          `(${user.username})`}
                        </b>.
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
                                <>{"Chargement"}</>
                              </>
                            ) : (
                              <>{"Valider"}</>
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
  }
}
