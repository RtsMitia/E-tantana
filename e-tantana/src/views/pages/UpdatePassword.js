import React, { Component } from "react";
import api from "../../const/api";
import {
  CCard,
  CCardBody,
  CAlert,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CButton,
} from "@coreui/react";

export default class UpdatePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      alert: false,
      error: null,
      pending: false,
    };
  }

  clearFields = () => {
    this.setState({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      alert: false,
      error: null,
      pending: false,
    });
  };

  onChangeCurrentPassword = (e) => {
    this.setState({
      currentPassword: e.target.value,
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
  }

  getError(error) {
    if (error === "User does not exist.")
      return "Cet utilisateur n'éxiste pas.";
    else if (error === "Wrong old password.")
      return "Ancien mot de passe incorrect.";
    else return "Un problème est survenu.";
  }

  updatePassword = () => {
    this.setPending(true);
    const id = JSON.parse(sessionStorage.getItem('user')).id;
    const option = {
      headers: { "Content-Type": "application/json" },
      method: "PUT",
      body: JSON.stringify({
        old: this.state.currentPassword,
        new: this.state.newPassword,
      }),
    };
    fetch(api(`users/${id}/password`), option).then((res) => {
      this.setPending(false);
      if(res.ok) {
        this.clearFields();
      } else {
        res.json().then((res) => {
          this.setError(this.getError(res.message));
        });
      }
    });
  }

  render() {
    return (
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader color="green">
            <strong>Modification de mot de passe</strong>
            <span className="d-grid gap-2 d-md-flex justify-content-md-end"></span>
          </CCardHeader>
          <CCardBody>
            <CForm className="row g-3">
              <CCol md={12}>
                <CFormLabel htmlFor="inputPassword1">
                  Ancien mot de passe
                </CFormLabel>
                <CFormInput
                  id="inputPassword1"
                  type="text"
                  value={this.state.currentPassword}
                  onChange={this.onChangeCurrentPassword}
                  required
                />
              </CCol>
              <CCol md={12}>
                <CFormLabel htmlFor="inputPassword2">
                  Nouveau mot de passe
                </CFormLabel>
                <CFormInput
                  id="inputPassword2"
                  type="password"
                  value={this.state.newPassword}
                  onChange={this.onChangeNewPassword}
                  required
                />
              </CCol>
              <CCol md={12}>
                <CFormLabel htmlFor="inputPassword3">
                  Confirmer le mot de passe
                </CFormLabel>
                <CFormInput
                  id="inputPassword3"
                  type="password"
                  value={this.state.confirmPassword}
                  onChange={this.onChangeConfirmPassword}
                  required
                />
              </CCol>
            </CForm>
            <br></br>
            <CAlert visible={this.state.alert} color="danger">
              <center>{this.state.error}</center>
            </CAlert>
            <br></br>
            <CButton
              color="primary"
              onClick={this.updatePassword}
              disabled={(this.state.newPassword === this.state.confirmPassword) ? (this.state.pending ? true : false) : true}
            >
              Modifier
            </CButton>
          </CCardBody>
        </CCard>
      </CCol>
    );
  }
}
