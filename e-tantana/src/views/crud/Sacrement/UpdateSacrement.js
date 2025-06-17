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
  CAlert,
  CButton,
} from "@coreui/react";
import BackButton from "../../../components/BackButton";
import AdminLayout from "../../../layout/AdminLayout";

export default class updateSacrement extends AdminLayout {
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
        this.props.history.push(`/sacrement`);
      });
    this.setPending(false);
  };

  clearField = () => {
    this.setState({ error: "", note: "", name: "", alert: false });
  };

  setPending = (pending) => {
    this.setState({ pending: pending });
  };

  getSacrement = () => {
    fetch(api(`sacrements/${this.props.match.params.id}`))
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then((data) => {
        this.setState({ name: data.sacrement.name, note: data.sacrement.note });
        this.setState({ ready: true });
      });
  };

  componentDidMount() {
    this.getSacrement();
  }

  render() {
    return (
      <>
        <BackButton to={"/sacrement"} />
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader color="green">
              <strong>Modifier de sacrement</strong>
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
                  <CFormLabel htmlFor="inputPassword4">Note</CFormLabel>
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
                onClick={this.update}
                disabled={this.state.pending ? true : false}
              >
                Modifier
              </CButton>
            </CCardBody>
          </CCard>
        </CCol>
      </>
    );
  }
}
