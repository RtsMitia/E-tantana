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
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CButton,
  CAlert,
  CFormSelect,
} from "@coreui/react";
import AdminLayout from "../../../layout/AdminLayout";
import BackButton from "../../../components/BackButton";

export default class UpdateMemberRole extends AdminLayout {
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
      hierarchy: 0,
    };
    //  ()=>this.setInsertVisible=
  }

  setReady = (pending) => {
    this.setState({ ready: pending });
  };

  setPending = (pending) => {
    this.setState({ pending: pending });
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

  pageUpdate = (index) => {
    this.setState({
      updateVisible: true,
      index: index,
      name: this.state.list[index].name,
      level: this.state.list[index].level,
      note: this.state.list[index].note,
    });
  };

  pageDelete = (index) => {
    this.setState({
      deleteVisible: true,
      index: index,
      name: this.state.list[index].name,
      level: this.state.list[index].level,
      note: this.state.list[index].note,
    });
  };

  setInsertVisible = (visible) => {
    this.clearFields();
    this.setState({ insertVisible: visible });
  };

  viewPageUpdate = (visible, index) => {
    this.clearFields();
    this.setState({ updateVisible: visible, index: index });
  };

  viewPageDelete = (visible, index) => {
    this.clearFields();
    this.setState({ deleteVisible: visible, index: index });
  };

  update = (event) => {
    this.setPending(true);
    const option = {
      headers: { "Content-Type": "application/json" },
      method: "PUT",
      body: JSON.stringify({
        name: this.state.name,
        level: this.state.level,
        note: this.state.note,
      }),
    };
    fetch(api("memberRoles/" + this.props.match.params.id), option).then(
      (res) => {
        this.setPending(false);
        // console.log(res);
        if (res.ok) this.props.history.push(`/memberRole`);
        else
          res.json().then((res) => {
            if (typeof res.message === typeof []) {
              this.setError(this.getError(res.message[0]));
              this.setState({ alert: true });
            } else {
              this.setError(this.getError(res.message));
              this.setState({ alert: true });
            }
          });
      }
    );
  };

  getError = (index) => {
    const errors = {
      "level should not be empty": "Le champ niveau est obligatoire.",
      "name should not be empty": "Le champ role est obligatoire.",
    };
    return errors[index];
  };

  onChangeHierarchy = (e) => {
    this.setState({
      hierarchy: +e,
    });
  };

  getHierarchies() {
    fetch(api(`hierarchies`)).then((res) => {
      if (res.ok)
        res.json().then((data) => {
          if (data && data.hierarchies);
          this.setState({
            hierarchies: data.hierarchies,
          });
        });
    });
  }

  getmemberRole = () => {
    fetch(api(`memberRoles/${this.props.match.params.id}`))
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then((data) => {
        this.setState({
          name: data.memberRole.name,
          level: data.memberRole.level,
          note: data.memberRole.note,
          hierarchy: data.memberRole.hierarchy_id,
        });
        this.setReady(true);
      });
  };

  componentDidMount() {
    this.setReady(false);
    this.getHierarchies();
    this.getmemberRole();
  }

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
              <strong> Modification de role de membre</strong>
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
                onClick={this.update}
                disabled={this.state.pending}
              >
                Modifier
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
                <CModalTitle>Modification d'un role</CModalTitle>
              </CModalHeader>
              <CModalBody>
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
