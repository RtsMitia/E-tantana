import React from "react";
import api from "../../../const/api";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormTextarea,
  CFormInput,
  CFormLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CAlert,
  CModalHeader,
  CModalTitle,
  CButton,
} from "@coreui/react";
import BackButton from "../../../components/BackButton";
import AdminLayout from "../../../layout/AdminLayout";

export default class CreateSacrement extends AdminLayout {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      ready: false,
      insertVisible: false,
      updateVisible: false,
      deletetVisible: false,
      name: "",
      note: "",
      index: 0,
      pending: false,
      error: "",
      alert: false,
    };
  }

  onChangeName = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  onChangeNote = (e) => {
    this.setState({
      note: e.target.value,
    });
  };

  pageUpdate = (index) => {
    this.setState({
      updateVisible: true,
      index: index,
      name: this.state.list[index].name,
      note: this.state.list[index].note,
    });
  };

  pageDelete = (index) => {
    this.setState({
      deleteVisible: true,
      index: index,
      name: this.state.list[index].name,
      note: this.state.list[index].note,
    });
  };

  setError = (error) => {
    this.setState({ error: error });
    if (error === "" || error === undefined) {
      this.setState({ alert: false });
    } else this.setState({ alert: true });
  };

  getError = (index) => {
    const errors = {
      "name should not be empty": "Le champ sacrement est obligatoire.",
    };
    return errors[index];
  };

  update = (event) => {
    this.setPending(true);
    const option = {
      headers: { "Content-Type": "application/json" },
      method: "PUT",
      body: JSON.stringify({
        note: this.state.note,
        name: this.state.name,
      }),
    };
    fetch(api("sacrements/" + this.props.match.params.id), option)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then((data) => {
        this.setState({ updateVisible: false });
        this.clearField();
        this.getSacrements();
      });
    this.setPending(false);
  };

  clearField = () => {
    this.setState({ error: "", note: "", name: "", alert: false });
  };

  insert = (event) => {
    this.setPending(true);
    const option = {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        note: this.state.note,
        name: this.state.name,
      }),
    };
    fetch(api("sacrements"), option).then((res) => {
      if (res.ok) {
        return res.json().then((data) => {
          this.props.history.push(`/sacrement`);
        });
      } else {
        res.json().then((res) => {
          if (typeof res.message === typeof []) {
            this.setError(this.getError(res.message[0]));
          } else {
            this.setError(this.getError(res.message));
          }
        });
      }
    });
    this.setPending(false);
  };

  setPending = (pending) => {
    this.setState({ pending: pending });
  };

  getSacrement = () => {
    fetch(api("sacrements"))
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then((data) => {
        this.setState({ list: data });
        this.setState({ ready: true });
      });
  };

  render() {
    return (
      <>
        <BackButton to={"/sacrement"} />
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader color="green">
              <strong>Ajout de sacrement</strong>
              <span className="d-grid gap-2 d-md-flex justify-content-md-end"></span>
            </CCardHeader>
            <CCardBody>
              <CForm className="row g-3">
                <CCol md={12}>
                  <CFormLabel htmlFor="inputEmail4">Sacrement</CFormLabel>
                  <CFormInput
                    type="text"
                    value={this.state.name}
                    onChange={this.onChangeName}
                  />
                </CCol>
                <CCol md={12}>
                  <CFormLabel htmlFor="inputPassword4">Remarques</CFormLabel>
                  <CFormTextarea
                    aria-label="With textarea"
                    value={this.state.note}
                    onChange={this.onChangeNote}
                  ></CFormTextarea>
                </CCol>
              </CForm>
              <br></br>
              <CAlert visible={this.state.alert} color="danger">
                <center> {this.state.error}</center>
              </CAlert>
              <br></br>
              <CButton
                color="primary"
                onClick={this.insert}
                disabled={this.state.pending ? true : false}
              >
                Ajouter
              </CButton>
            </CCardBody>
          </CCard>

          {/* update modal */}

          <>
            <CModal
              alignment="center"
              size="xl"
              visible={this.state.updateVisible}
              onClose={() => this.viewPageUpdate(false, this.state.index)}
            >
              <CModalHeader>
                <CModalTitle>Modification d'un sacrement</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <CForm className="row g-3">
                  <CCol md={12}>
                    <CFormLabel htmlFor="inputEmail4">Sacrement</CFormLabel>
                    <CFormInput
                      type="text"
                      value={this.state.name}
                      onChange={this.onChangeName}
                    />
                  </CCol>
                  <CCol md={12}>
                    <CFormLabel htmlFor="inputPassword4">Remarques</CFormLabel>
                    <CFormTextarea
                      aria-label="With textarea"
                      value={this.state.note}
                      onChange={this.onChangeNote}
                    ></CFormTextarea>
                  </CCol>
                </CForm>
              </CModalBody>
              <CModalFooter>
                <CButton
                  color="danger"
                  onClick={() => this.viewPageUpdate(false, this.state.index)}
                >
                  Fermer
                </CButton>
                <CButton
                  color="secondary"
                  onClick={this.update}
                  disabled={this.state.pending ? true : false}
                >
                  Modifier
                </CButton>
              </CModalFooter>
            </CModal>
          </>
        </CCol>
      </>
    );
  }
}
