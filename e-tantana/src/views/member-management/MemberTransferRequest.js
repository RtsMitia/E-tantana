import React, { Component } from "react";
import api from "../../const/api";
import {
  CCard,
  CCardBody,
  CModal,
  CModalBody,
  CModalTitle,
  CModalFooter,
  CModalHeader,
  CCardHeader,
  CCol,
  CRow,
  CButton,
  CForm,
  CFormInput,
  CFormLabel,
  CSpinner,
  CFormSelect,
  CAlert,
} from "@coreui/react";
import AsyncSelect from "react-select/async";
import Loading from "../pages/Loading";
export default class MemberTransferRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      loading: true,
      pending: false,
      activityYears: null,
      memberRoles: null,
      sections: null,
      error: "",
      id: undefined,
      member: undefined,
      activityField: undefined,
      activityField_id: undefined,
      activityYear_id: undefined,
      member_id: undefined,
      member_role_id: undefined,
      section_id: undefined,
      activityYear: undefined,
      memberRole: undefined,
      section: undefined,
      level: undefined,
      alert: false,
      confirmModal: false,
    };
  }

  cancelRequest = async () => {
    this.clearFields();
    this.setConfirmModal(false);
    this.props.history.push("/memberTransferRequest");
  };

  setConfirmModal = async (visible) => {
    if (visible === true) {
      await fetch(api("members/" + this.state.member)).then((res) => {
        if (res.ok) {
          return res.json().then((data) => {
            if (data.member) {
              this.setState({ member: data.member });
            }
          });
        }
      });
      await fetch(api("activityFields/" + this.state.activityField)).then(
        (res) => {
          if (res.ok) {
            return res.json().then((data) => {
              if (data.activityField) {
                this.setState({ activityField: data.activityField });
              }
              this.setState({ confirmModal: true });
            });
          }
        }
      );
    } else {
      this.setState({ confirmModal: visible, error: "", alert: false });
    }
  };

  getError = (index) => {
    const errors = {
      "member_id should not be empty": "Vous devez selectionner un membre.",
      "activity_field_id should not be empty":
        "Vous devez selectionner un lieu d'activité",
      "activity_year_id should not be empty":
        "Vous devez selectionner une année d'activité",
      "member_role_id should not be empty": "Vous devez selectionner un rôle",
    };
    return errors[index];
  };

  getMember = async (name, callback) => {
    let query = "";
    if (name && name.length > 0) {
      query = `?last_name=${name}`;
    }
    return fetch(api(`members` + query), {
      method: "GET",
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((json) => {
        const res = [];
        json.data.entities.forEach((d) => {
          res.push({
            value: `${d.id}`,
            label: `${d.last_name} ${d.first_name}`,
          });
        });
        callback(res);
      });
  };

  clearFields = () => {
    this.setState({
      member: undefined,
      activityField: undefined,
      activityYear: undefined,
      memberRole: undefined,
      section: undefined,
      level: undefined,
      error: "",
      alert: false,
    });
  };

  addMemberTransferrequest = () => {
    // console.log({
    //   member_id: this.state.member_id,
    //   activity_field_id: this.state.activityField_id,
    //   activity_year_id: this.state.activityYear_id,
    //   member_role_id: this.state.memberRole_id,
    //   section_id: this.state.section_id,
    //   level: this.state.level,
    // });
    this.setPending(true);
    fetch(api("memberTransferRequests"), {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        member_id: this.state.member_id,
        activity_field_id: this.state.activityField_id,
        activity_year_id: this.state.activityYear_id,
        member_role_id: this.state.memberRole_id,
        section_id: this.state.section_id,
        level: this.state.level,
      }),
    }).then((res) => {
      this.setPending(false);
      if (res.ok)
        res.json().then((data) => {
          this.setState({ error: "", alert: false });
          this.props.history.push("/memberTransferRequest");
        });
      else {
        res.json().then((res) => {
          if (typeof res.message === typeof []) {
            // console.log(res.message);
            this.setError(this.getError(res.message[0]));
          } else {
            this.setError(this.getError(res.message));
          }
        });
      }
    });
  };

  getPlaces = async (name, callback) => {
    let query = "";
    if (name && name.length > 0) query = `?name=${name}`;
    return fetch(api(`activityFields` + query), {
      method: "GET",
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((json) => {
        const res = [];
        json.activityFields.data.forEach((d) => {
          res.push({
            value: `${d.id}`,
            label: `${d.name}`,
          });
        });
        callback(res);
      });
  };

  setMember = (value) => {
    this.setState({
      member: value.value,
      member_id: value.value,
    });
  };

  setActivityField = (value) => {
    this.setState({
      activityField: value.value,
      activityField_id: value.value,
    });
  };

  setActivityYear = (e) => {
    this.setState({
      activityYear: e.target.value,
      activityYear_id: this.state.activityYears[e.target.value].id,
    });
  };

  setMemberRole = (e) => {
    this.setState({
      memberRole: e.target.value,
      memberRole_id: this.state.memberRoles[e.target.value].id,
    });
  };

  setSection = (e) => {
    // console.log(e.target.value);
    this.setState({
      section: e.target.value,
      section_id: this.state.sections[e.target.value].id,
    });
  };

  setLoading = (state) => {
    this.setState({
      loading: state,
    });
  };

  setPending = (state) => {
    this.setState({
      pending: state,
    });
  };

  setError = (message = null) => {
    if (message) {
      this.setState({
        error: message,
        alert: true,
      });
    } else {
      this.setState({
        error: "",
        alert: false,
      });
    }
  };

  setLevel = (e) => {
    this.setState({
      level: e.target.value,
    });
  };

  getActivityYears = () => {
    // this.setLoading(true);
    fetch(api(`activityYears`)).then((res) => {
      if (res.ok)
        res.json().then((data) => {
          if (data && data.data)
            this.setState({
              activityYears: data.data,
            });
        });
      // this.setLoading(false);
    });
  };

  getMemberRoles = () => {
    fetch(api(`memberRoles`)).then((res) => {
      if (res.ok)
        res.json().then((data) => {
          if (data && data.memberRoles.data)
            this.setState({
              memberRoles: data.memberRoles.data,
            });
        });
    });
  };

  getSections = () => {
    fetch(api(`sections`)).then((res) => {
      if (res.ok)
        res.json().then((data) => {
          if (data && data.sections)
            this.setState({
              sections: data.sections,
              ready: true,
            });
        });
    });
  };

  componentDidMount() {
    this.getActivityYears();
    // this.getMember();
    // this.getPlaces();
    this.getMemberRoles();
    this.getSections();
  }

  render() {
    if (!this.state.ready) {
      return <Loading />;
    }

    return (
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong className="text-success">
                Demande de transfert d'un membre
              </strong>
            </CCardHeader>
            <CCardBody>
              <CForm>
                <div className="mb-3">
                  <CFormLabel htmlFor="membre">Membre</CFormLabel>
                  <AsyncSelect
                    name="membre"
                    placeholder="Selectionner un membre"
                    loadOptions={this.getMember}
                    onChange={this.setMember}
                  />
                </div>
                <div className="mb-3">
                  <CFormLabel htmlFor="activityField">
                    Lieu d'activité
                  </CFormLabel>
                  <AsyncSelect
                    name="activityField"
                    placeholder="Selectionner un lieu"
                    loadOptions={this.getPlaces}
                    onChange={this.setActivityField}
                  />
                </div>
                <div className="mb-3">
                  <CFormLabel htmlFor="activityYear">
                    Année d'activité
                  </CFormLabel>
                  <CFormSelect
                    id="activityYear"
                    value={this.state.activityYear}
                    onChange={this.setActivityYear}
                  >
                    <option>Selectionner une année</option>
                    {this.state.activityYears &&
                      this.state.activityYears.map((a, index) => (
                        <option
                          key={a.id}
                          value={index}
                        >{`${a.start_year} - ${a.end_year}`}</option>
                      ))}
                  </CFormSelect>
                </div>
                <div className="mb-3">
                  <CFormLabel htmlFor="memberRole">Rôle</CFormLabel>
                  <CFormSelect
                    id="memberRole"
                    value={this.state.memberRole}
                    onChange={this.setMemberRole}
                  >

                    <option>Selectionner un rôle</option>
                    {this.state.memberRoles &&
                      this.state.memberRoles.map((a, index) => (
                        <option key={a.id} value={index}>{`${a.name}`}</option>
                      ))}
                  </CFormSelect>
                </div>
                <div className="mb-3">
                  <CFormLabel htmlFor="section">Section</CFormLabel>
                  <CFormSelect
                    id="section"
                    value={this.state.section}
                    onChange={this.setSection}
                  >
                    <option>Selectionner une section</option>
                    {this.state.sections &&
                      this.state.sections.map((a, index) => (
                        <option key={a.id} value={index}>{`${a.name}`}</option>
                      ))}
                  </CFormSelect>
                </div>
                <div className="mb-3">
                  <CFormLabel htmlFor="name">Niveau</CFormLabel>
                  <CFormInput
                    type="text"
                    id="username"
                    value={this.state.level}
                    onChange={this.setLevel}
                  />
                </div>
                <center>
                  {" "}
                  <CButton
                    color="primary"
                    onClick={() => this.setConfirmModal(true)}
                    disabled={this.state.pending}
                  >
                    Demander un transfert
                  </CButton>
                </center>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>

        {/* confirm modal */}
        <>
          <CModal
            alignment="center"
            visible={this.state.confirmModal}
            onClose={() => this.setConfirmModal(false)}
          >
            <CModalHeader>
              <CModalTitle>Confirmation de la demande de transfert</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <center>
                {" "}
                <h2>Votre demande de transfert </h2>{" "}
              </center>
              <hr></hr>
              <ul>
                <li>
                  <u>
                    {" "}
                    <strong> Le nom du membre : </strong>
                  </u>{" "}
                  {this.state.member &&
                    this.state.member.last_name +
                      " " +
                      this.state.member.first_name}
                </li>
                <li>
                  <u>
                    {" "}
                    <strong> Le lieu d'activité : </strong>
                  </u>{" "}
                  {this.state.activityField && this.state.activityField.name}
                </li>
                <li>
                  <u>
                    {" "}
                    <strong> L'année d'activité : </strong>
                  </u>{" "}
                  {this.state.activityYear &&
                    this.state.activityYears[this.state.activityYear]
                      .start_year +
                      "-" +
                      this.state.activityYears[this.state.activityYear]
                        .end_year}
                </li>
                <li>
                  <u>
                    {" "}
                    <strong> Le rôle du membre : </strong>
                  </u>{" "}
                  {this.state.memberRole &&
                    this.state.memberRoles[this.state.memberRole].name}
                </li>
                <li>
                  <u>
                    {" "}
                    <strong> La catégorie du membre : </strong>
                  </u>{" "}
                  {this.state.section &&
                    this.state.sections[this.state.section].name}
                </li>
                <li>
                  <u>
                    {" "}
                    <strong> Le niveau : </strong>
                  </u>{" "}
                  {this.state.level && this.state.level}
                </li>
              </ul>
              <br></br>
              <CAlert visible={this.state.alert} color="danger">
                <center> {this.state.error}</center>
              </CAlert>
              <br></br>
            </CModalBody>
            <CModalFooter>
              <CButton color="danger" onClick={() => this.cancelRequest()}>
                Annuler la demande
              </CButton>
              <CButton
                color="secondary"
                onClick={() => this.setConfirmModal(false)}
              >
                Modifier
              </CButton>
              <CButton
                color="success"
                onClick={() => this.addMemberTransferrequest()}
                disabled={this.state.pending ? true : false}
              >
                {this.state.pending ? (
                  <CSpinner className="me-2" color="light" size="sm" />
                ) : (
                  <></>
                )}
                Confirmer ma demande
              </CButton>
            </CModalFooter>
          </CModal>
        </>
      </CRow>
    );
  }
}
