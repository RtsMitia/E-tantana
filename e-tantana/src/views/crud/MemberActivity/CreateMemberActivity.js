import React from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
  CForm,
  CFormLabel,
  CSpinner,
  CFormSelect,
  CFormTextarea,
  CAlert,
} from "@coreui/react";
import AsyncSelect from "react-select/async";
import api from "../../../const/api";
import Loading from "../../pages/Loading";
import BackButton from "../../../components/BackButton";
import RoleSelection from "../../../components/RoleSelection";

export default class CreateMemberActivity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formModalState: false,
      formText: "Ajouter",
      deleteModalState: false,
      loading: false,
      pending: false,
      memberActivities: [],
      activityYears: null,
      memberRoles: null,
      sections: null,
      error: "",
      hasError: false,
      id: undefined,
      member: undefined,
      activityField: undefined,
      activityYear: undefined,
      memberRole: undefined,
      section: undefined,
      level: "",
      note: "",
      totalPage: 0,
      page: 1,
      pageNumber: 10,
      pagination: [],
      alert: false,
    };
  }

  componentDidMount() {
    this.getActivityYears();
    this.getMemberRoles();
    this.getSections();
    // this.getMemberActivities();
  }

  getError(index) {
    const errors = {
      "member_id should not be empty": "Vous devez selectionner un membre.",
      "activity_field_id should not be empty":
        "Vous devez selectionner un lieu d'activité",
      "activity_year_id should not be empty":
        "Vous devez selectionner une année d'activité",
      "member_role_id should not be empty": "Vous devez selectionner un rôle",
    };
    return errors[index];
  }

  cancelFormModal = () => {
    this.setFormModalState(false);
    this.clearFields();
    this.setError();
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

  memberActivityToDelete(index) {
    this.setId(index);
    this.setDeleteModalState(true);
  }

  getMemberActivity(index) {
    this.setState({
      id: this.state.memberActivities[index].id,
      member: this.state.memberActivities[index].member.id,
      activityField: this.state.memberActivities[index].activityField.id,
      activityYear: this.state.memberActivities[index].activityYear.id,
      memberRole: this.state.memberActivities[index].memberRole.id,
      level: this.state.memberActivities[index].level || "",
      note: this.state.memberActivities[index].note_role || "",
    });
    if (this.state.memberActivities[index].section) {
      this.setState({
        section: this.state.memberActivities[index].section.id,
      });
    }
    this.setFormModalState(true, "Modifier");
  }

  addMemberActivity() {
    this.setPending(true);
    fetch(api("memberActivities"), {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        member_id: this.state.member,
        activity_field_id: this.state.activityField,
        activity_year_id: this.state.activityYear,
        member_role_id: this.state.memberRole,
        section_id: this.state.section,
        level: this.state.level,
        note_role: this.state.note,
      }),
    }).then((res) => {
      this.setPending(false);
      if (res.ok)
        this.props.history.push(`/member`);
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
  }

  pagination = (totalPages) => {
    let page = [];
    for (let i = 1; i <= totalPages; i++) {
      page.push(i);
    }
    this.setState({ pagination: page });
  };

  getActivityYears() {
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
  }

  getMemberRoles() {
    // this.setLoading(true);
    fetch(api(`memberRoles`)).then((res) => {
      if (res.ok)
        res.json().then((data) => {
          if (data && data.memberRoles.data)
            this.setState({
              memberRoles: data.memberRoles.data,
            });
        });
      // this.setLoading(false);
    });
  }

  getSections() {
    // this.setLoading(true);
    fetch(api(`sections`)).then((res) => {
      if (res.ok)
        res.json().then((data) => {
          if (data && data.sections)
            this.setState({
              sections: data.sections,
            });
        });
      // this.setLoading(false);
    });
  }

  render() {
    if (this.state.loading) {
      return <Loading />;
    }
    return (
      <>
      <BackButton to={"/member"} />
        <CRow>
          <CCol xs={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <strong>Ajout d'activité de membre</strong>
                <span className="d-grid gap-2 d-md-flex justify-content-md-end">
                </span>
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
              {/* <div className="mb-3">
                <CFormLabel htmlFor="activityField">Lieu d'activité</CFormLabel>
                <AsyncSelect
                  name="activityField"
                  placeholder="Selectionner un lieu"
                  loadOptions={this.getPlaces}
                  onChange={this.setActivityField}
                />
              </div> */}
              <div className="mb-3">
                <CFormLabel htmlFor="activityYear">Année d'activité</CFormLabel>
                <CFormSelect
                  id="activityYear"
                  value={this.state.activityYear}
                  onChange={this.setActivityYear}
                >
                  <option>Selectionner une année</option>
                  {this.state.activityYears &&
                    this.state.activityYears.map((a) => (
                      <option
                        key={a.id}
                        value={a.id}
                      >{`${a.start_year} - ${a.end_year}`}</option>
                    ))}
                </CFormSelect>
              </div>
              <div className="mb-3">
                <CRow>
                  <RoleSelection onChangeRole={this.setMemberRole} setActivityFields={this.setActivityField} />
                </CRow>
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
                    this.state.sections.map((a) => (
                      <option key={a.id} value={a.id}>{`${a.name}`}</option>
                    ))}
                </CFormSelect>
              </div>
              {/* <div className="mb-3">
                <CFormLabel htmlFor="name">Niveau</CFormLabel>
                <CFormInput
                  type="text"
                  id="username"
                  value={this.state.level}
                  onChange={this.setLevel}
                />
              </div> */}
              <div className="mb-3">
                <CFormLabel htmlFor="note">Remarques *</CFormLabel>
                <CFormTextarea
                  id="note"
                  rows="3"
                  value={this.state.note}
                  onChange={this.setNote}
                ></CFormTextarea>
              </div>
              <br></br>
              <p className="text-muted">* champs non-obligatoires</p>
              <CAlert visible={this.state.alert} color="danger">
                <center> {this.state.error}</center>
              </CAlert>
              <br></br>
              <CButton
              color="primary"
              onClick={()=> this.addMemberActivity()}
              disabled={this.state.pending}
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
    if (message) {
      this.setState({
        error: message,
        hasError: true,
        alert: true,
      });
    } else {
      this.setState({
        error: "",
        hasError: false,
        alert: false,
      });
    }
  }

  clearFields() {
    this.setState({
      member: undefined,
      activityField: undefined,
      activityYear: undefined,
      memberRole: undefined,
      section: undefined,
      level: "",
      note: "",
    });
  }

  setId(id) {
    this.setState({
      id,
    });
  }

  setMember = (value) => {
    this.setState({
      member: value.value,
    });
  };

  // setActivityField = (value) => {
  //   this.setState({
  //     activityField: value.value,
  //   });
  // };

  setActivityField = (e, i) => {
    this.setState({
      activityField: e,
    });
  };

  setActivityYear = (e) => {
    this.setState({
      activityYear: e.target.value,
    });
  };

  setMemberRole = (e) => {
    this.setState({
      memberRole: e.target.value,
    });
  };

  setSection = (e) => {
    this.setState({
      section: e.target.value,
    });
  };

  setLevel = (e) => {
    this.setState({
      level: e.target.value,
    });
  };

  setNote = (e) => {
    this.setState({
      note: e.target.value,
    });
  };

  setFormModalState(state, text = this.state.formText) {
    this.setState({
      formModalState: state,
      formText: text,
    });
  }

  setDeleteModalState(state) {
    this.setState({
      deleteModalState: state,
    });
  }

  setLoading(state) {
    this.setState({
      loading: state,
    });
  }

  setPending(state) {
    this.setState({
      pending: state,
    });
  }
}
