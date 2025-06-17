import React from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CSpinner,
  CAlert,
} from "@coreui/react";
import api from "../../../const/api";
import BackButton from "../../../components/BackButton";

export default class CreateHierarchy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formModalState: false,
      formText: "Ajouter",
      deleteModalState: false,
      loading: false,
      pending: false,
      hierarchies: null,
      error: "",
      hasError: false,
      id: 0,
      name: "",
      level: "",
      note: "",
      alert: false,
    };
  }

  getError(index) {
    const errors = {
      "name should not be empty": "Le champ nom est obligatoire.",
    };
    return errors[index];
  }

  addHierarchy() {
    // console.log(this);
    this.setLoading(true);
    fetch(api("hierarchies"), {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        name: this.state.name,
        level: this.state.level,
        note: this.state.note,
      }),
    }).then((res) => {
      this.setLoading(false);
      if (res.ok)
        res.json().then((data) => {
          this.props.history.push("/hierarchy");
          // this.state.hierarchies.push(data.hierarchy);
          // this.cancelFormModal();
        });
      else
        res.json().then((res) => {
          this.setError(this.getError(res.message));
        });
    });
  }

  render() {
    return (
      <>
      <BackButton to={"/hierarchy"} />
        <CRow>
          <CCol xs={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <strong>Ajouter une hierarchie</strong>
                <span className="d-grid gap-2 d-md-flex justify-content-md-end">
                </span>
              </CCardHeader>
              <CCardBody>
              <CForm>
                <div className="mb-3">
                  <CFormLabel htmlFor="name">Nom</CFormLabel>
                  <CFormInput
                    type="text"
                    id="name"
                    value={this.state.name}
                    onChange={this.setName}
                  />
                </div>
                <div className="mb-3">
                  <CFormLabel htmlFor="niveau">Niveau</CFormLabel>
                  <CFormInput
                    type="text"
                    id="niveau"
                    value={this.state.level}
                    onChange={this.setLevel}
                  />
                </div>
                <div className="mb-3">
                  <CFormLabel htmlFor="note">Remarques</CFormLabel>
                  <CFormTextarea
                    id="note"
                    rows="3"
                    value={this.state.note}
                    onChange={this.setNote}
                  ></CFormTextarea>
                </div>
                <br></br>
                <CAlert visible={this.state.alert} color="danger">
                  <center> {this.state.error}</center>
                </CAlert>
                <br></br>
                <CButton
                  color="primary"
                  onClick={() => this.addHierarchy()}
                  disabled={this.state.pending ? true : false}
                >
                  {this.state.pending ? (
                    <CSpinner className="me-2" color="light" size="sm" />
                  ) : (
                    <></>
                  )}
                  Ajouter
                </CButton>
              </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </>
    );
  }

  setError(message = null) {
    if (message)
      this.setState({
        error: message,
        hasError: true,
        alert: true,
      });
    else
      this.setState({
        error: "",
        hasError: false,
        alert: false,
      });
  }

  clearFields() {
    this.setState({
      name: "",
      level: "",
      note: "",
    });
  }

  setId(id) {
    this.setState({
      id,
    });
  }

  setName = (e) => {
    this.setState({
      name: e.target.value,
    });
  }

  setLevel = (e) => {
    this.setState({
      level: e.target.value,
    });
  }

  setNote = (e) => {
    this.setState({
      note: e.target.value,
    });
  }

  setLoading = (state) => {
    this.setState({
      loading: state,
    });
  }

  setPending = (state) => {
    this.setState({
      pending: state,
    });
  }
}
