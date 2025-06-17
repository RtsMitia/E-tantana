import React from "react";
import api from "../../../const/api";
import Loading from "../../pages/Loading";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormTextarea,
  CFormInput,
  CFormLabel,
  CButton,
  CAlert,
  CFormSelect,
} from "@coreui/react";
import BackButton from "../../../components/BackButton";
import AdminLayout from "../../../layout/AdminLayout";

export default class CreateMemberRole extends AdminLayout {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      ready: false,
      insertVisible: false,
      updateVisible: false,
      deletetVisible: false,
      name: "",
      level: "",
      note: "",
      index: 0,
      pending: false,
      body: undefined,
      error: "",
      alert: false,
      hierarchies: [],
      hierarchy: 0,
    };
    //  ()=>this.setInsertVisible=
  }

  setPending = (pending) => {
    this.setState({ pending: pending });
  };

  setReady = (e) => {
    this.setState({
      ready: e,
    });
  };

  onChangeName = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  onChangeLevel = (e) => {
    this.setState({
      level: e.target.value,
    });
  };

  onChangeNote = (e) => {
    this.setState({
      note: e.target.value,
    });
  };

  setError = (error) => {
    this.setState({ error: error });
  };

  setBody = (body) => {
    this.setState({ body: body });
  };

  clearFields = () => {
    this.setState({ name: "", level: "", note: "", error: "", alert: false });
  };

  getError = (index) => {
    const errors = {
      "level should not be empty": "Le champ niveau est obligatoire.",
      "name should not be empty": "Le champ role est obligatoire.",
    };
    return errors[index];
  };

  componentDidMount() {
    this.getHierarchies();
  }

  onChangeHierarchy = (e) => {
    this.setState({
      hierarchy: +e,
    });
  };

  getHierarchies() {
    this.setReady(false);
    fetch(api(`hierarchies`)).then((res) => {
      if (res.ok)
        res.json().then((data) => {
          if (data && data.hierarchies);
          this.setState({
            hierarchies: data.hierarchies,
            ready: true,
          });
        });
    });
    this.setReady(true);
  }

  insert = (event) => {
    this.setPending(true);
    const option = {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        name: this.state.name,
        level: this.state.level,
        note: this.state.note,
        hierarchy_id: this.state.hierarchy,
      }),
    };
    fetch(api("memberRoles"), option).then((res) => {
      this.setPending(false);
      if (res.ok) this.props.history.push(`/memberRole`);
      else
        res.json().then((res) => {
          if (typeof res.message === typeof []) {
            this.setError(res.message[0]);
            this.setState({ alert: true });
          } else {
            this.setError(res.message);
            this.setState({ alert: true });
          }
        });
    });
  };

  render() {
    const { ready } = this.state;
    if (!ready) {
      return <Loading />;
    }

    return (
      <>
        <BackButton to={"/memberRole"} />
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader color="green">
              <strong> Ajout de role de membre</strong>
              <span className="d-grid gap-2 d-md-flex justify-content-md-end"></span>
            </CCardHeader>
            <CCardBody>
              <CForm className="row g-3">
                <CCol md={6}>
                  <CFormLabel htmlFor="inputEmail4">Role</CFormLabel>
                  <CFormInput
                    type="text"
                    value={this.state.name}
                    onChange={this.onChangeName}
                  />
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="inputPassword4">Niveau</CFormLabel>
                  <CFormInput
                    type="text"
                    value={this.state.level}
                    onChange={this.onChangeLevel}
                  />
                </CCol>
                <CCol md={12}>
                  <CFormLabel htmlFor="inputPassword4">
                    Hierarchie (Sampana)
                  </CFormLabel>
                  <CFormSelect
                    onChange={(e) => this.onChangeHierarchy(e.target.value)}
                    value={this.state.hierarchy}
                  >
                    <option value="">
                      Selectionner le sampana correspondant
                    </option>
                    {this.state.hierarchies.map((hierarchy, index) => (
                      <option value={hierarchy.id} key={index}>
                        {hierarchy.name}
                      </option>
                    ))}
                  </CFormSelect>
                </CCol>
                <CCol md={12}>
                  <CFormLabel htmlFor="inputPassword4">Remarque *</CFormLabel>
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
              <CButton
                color="primary"
                onClick={this.insert}
                disabled={this.state.pending ? true : false}
              >
                Ajouter
              </CButton>
            </CCardBody>
          </CCard>
        </CCol>
      </>
    );
  }
}
