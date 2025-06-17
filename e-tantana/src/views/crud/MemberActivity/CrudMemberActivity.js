import React from "react";
import {
  CPagination,
  CPaginationItem,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CButton,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CFormInput,
  CFormLabel,
  CSpinner,
  CFormSelect,
  CFormTextarea,
  CAlert,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilTrash, cilPlus, cilPencil } from "@coreui/icons";
import AsyncSelect from "react-select/async";
import api from "../../../const/api";
import Loading from "../../pages/Loading";
import BackButton from "../../../components/BackButton";

export default class CrudMemberActivity extends React.Component {
  user = JSON.parse(sessionStorage.getItem("user"));

  constructor(props) {
    super(props);
    this.state = {
      formModalState: false,
      formText: "Ajouter",
      deleteModalState: false,
      loading: true,
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
    this.getMemberActivities();
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

  modalSubmit = () => {
    if (this.state.formText === "Ajouter") this.addMemberActivity();
    else this.updateMemberActivity();
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
        json.data.forEach((d) => {
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

  deleteMemberActivity() {
    fetch(
      api(`memberActivities/${this.state.memberActivities[this.state.id].id}`),
      {
        method: "DELETE",
      }
    ).then((res) => {
      if (res.ok) {
        const tmp = [...this.state.memberActivities];
        tmp.splice(this.state.id, 1);
        this.setState({
          memberActivities: tmp,
        });
        this.setDeleteModalState(false);
      }
    });
  }

  updateMemberActivity() {
    this.setPending(true);
    fetch(api(`memberActivities/${this.state.id}`), {
      headers: { "Content-Type": "application/json" },
      method: "PUT",
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
      if (res.ok) {
        res.json().then((data) => {
          let tmp = [...this.state.memberActivities];
          tmp = tmp.map((elm) => {
            if (elm.id === this.state.id) return data.memberActivity;
            return elm;
          });
          this.setState({
            memberActivities: tmp,
          });
          this.cancelFormModal();
        });
      } else
        res.json().then((res) => {
          this.setError(this.getError(res.message));
        });
    });
  }

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
        res.json().then((data) => {
          this.state.memberActivities.push(data.memberActivity);
          this.cancelFormModal();
          this.setState({ error: "", alert: false });
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
  }

  pagination = (totalPages) => {
    let page = [];
    for (let i = 1; i <= totalPages; i++) {
      page.push(i);
    }
    this.setState({ pagination: page });
  };

  getMemberActivities(
    page = this.state.page,
    pageNumber = this.state.pageNumber
  ) {
    this.setLoading(true);
    fetch(
      api(
        `memberActivities?page=${Number(page)}&pageNumber=${Number(
          pageNumber
        )}&member_id=${this.props.match.params.id}`
      )
    ).then((res) => {
      if (res.ok)
        res.json().then((data) => {
          if (data && data.data)
            this.setState({
              memberActivities: data.data,
              totalPage: data.pagination.totalPages,
              page,
            });
          this.pagination(data.pagination.totalPages);
        });
      this.setLoading(false);
    });
  }

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
                <strong>Gestion des activités des membres</strong>
                <span className="d-grid gap-2 d-md-flex justify-content-md-end">
                  {1 <= this.user.accountType && (
                    <CButton
                      color={"primary"}
                      onClick={() =>
                        this.props.history.push(`/memberActivity/add`)
                      }
                    >
                      <CIcon icon={cilPlus} className="me-2" />
                      Ajouter
                    </CButton>
                  )}
                </span>
              </CCardHeader>
              <CCardBody>
                {this.state.loading ? (
                  <Loading />
                ) : (
                  <>
                    <CTable>
                      <CTableHead color="dark">
                        <CTableRow>
                          <CTableHeaderCell scope="col">
                            Membre
                          </CTableHeaderCell>
                          <CTableHeaderCell scope="col">
                            Lieu d'activité
                          </CTableHeaderCell>
                          <CTableHeaderCell scope="col">
                            Année d'activité
                          </CTableHeaderCell>
                          <CTableHeaderCell scope="col">Rôle</CTableHeaderCell>
                          <CTableHeaderCell scope="col">
                            Section
                          </CTableHeaderCell>
                          <CTableHeaderCell scope="col">
                            Remarques
                          </CTableHeaderCell>
                          <CTableHeaderCell scope="col"></CTableHeaderCell>
                          <CTableHeaderCell scope="col"></CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        {this.state.memberActivities &&
                          this.state.memberActivities.map(
                            (memberActivity, index) => (
                              <CTableRow key={memberActivity.id}>
                                <CTableDataCell>{`${memberActivity.member.last_name} ${memberActivity.member.first_name}`}</CTableDataCell>
                                <CTableDataCell>
                                  {memberActivity.activityField.name}
                                </CTableDataCell>
                                <CTableDataCell>{`${memberActivity.activityYear.start_year} - ${memberActivity.activityYear.end_year}`}</CTableDataCell>
                                <CTableDataCell>
                                  {memberActivity.memberRole.name}
                                </CTableDataCell>
                                <CTableDataCell>
                                  {memberActivity.section &&
                                    memberActivity.section.name}
                                </CTableDataCell>
                                <CTableDataCell>
                                  {memberActivity.note_role}
                                </CTableDataCell>
                                <CTableDataCell>
                                  {1 <= this.user.accountType && (
                                    <CButton
                                      color={"light"}
                                      onClick={() =>
                                        this.props.history.push(
                                          `/memberActivity/edit/${memberActivity.id}`
                                        )
                                      }
                                    >
                                      <CIcon icon={cilPencil} /> Modifier
                                    </CButton>
                                  )}
                                </CTableDataCell>
                                <CTableDataCell>
                                  {1 <= this.user.accountType && (
                                    <CButton
                                      color={"danger"}
                                      onClick={() =>
                                        this.memberActivityToDelete(index)
                                      }
                                    >
                                      <CIcon icon={cilTrash} /> Supprimer
                                    </CButton>
                                  )}
                                </CTableDataCell>
                              </CTableRow>
                            )
                          )}
                      </CTableBody>
                    </CTable>
                    <CPagination aria-label="Page navigation example">
                      <CPaginationItem
                        aria-label="Previous"
                        disabled={this.state.page === 1}
                        onClick={() =>
                          this.getMemberActivities(
                            this.state.page - 1,
                            this.state.pageNumber
                          )
                        }
                      >
                        <span aria-hidden="true">&laquo;</span>
                      </CPaginationItem>
                      {this.state.pagination.map((page, index) => (
                        <CPaginationItem
                          key={index}
                          active={page === this.state.page}
                          onClick={() =>
                            this.getMemberActivities(
                              page,
                              this.state.pageNumber
                            )
                          }
                        >
                          {` ${page} `}
                        </CPaginationItem>
                      ))}
                      <CPaginationItem
                        aria-label="Next"
                        disabled={
                          this.state.totalPage - this.state.page === 0 ||
                          this.state.memberActivities.length === 0
                        }
                        onClick={() =>
                          this.getMemberActivities(
                            this.state.page + 1,
                            this.state.pageNumber
                          )
                        }
                      >
                        <span aria-hidden="true"> &raquo; </span>
                      </CPaginationItem>
                    </CPagination>
                  </>
                )}
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
        <CModal
          size="xl"
          alignment="center"
          visible={this.state.formModalState}
          onClose={this.cancelFormModal}
        >
          <CModalHeader>
            <CModalTitle>{this.state.formText} un utilisateur</CModalTitle>
          </CModalHeader>
          <CModalBody>
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
                <CFormLabel htmlFor="activityField">Lieu d'activité</CFormLabel>
                <AsyncSelect
                  name="activityField"
                  placeholder="Selectionner un lieu"
                  loadOptions={this.getPlaces}
                  onChange={this.setActivityField}
                />
              </div>
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
                <CFormLabel htmlFor="memberRole">Rôle</CFormLabel>
                <CFormSelect
                  id="memberRole"
                  value={this.state.memberRole}
                  onChange={this.setMemberRole}
                >
                  <option>Selectionner un rôle</option>
                  {this.state.memberRoles &&
                    this.state.memberRoles.map((a) => (
                      <option key={a.id} value={a.id}>{`${a.name}`}</option>
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
                    this.state.sections.map((a) => (
                      <option key={a.id} value={a.id}>{`${a.name}`}</option>
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
              <div className="mb-3">
                <CFormLabel htmlFor="note">Note</CFormLabel>
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
            </CForm>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={this.cancelFormModal}>
              Annuler
            </CButton>
            <CButton
              color="primary"
              onClick={this.modalSubmit}
              disabled={this.state.pending}
            >
              {this.state.pending ? (
                <CSpinner className="me-2" color="light" size="sm" />
              ) : (
                <></>
              )}
              {this.state.formText}
            </CButton>
          </CModalFooter>
        </CModal>
        <CModal
          alignment="center"
          visible={this.state.deleteModalState}
          onClose={() => this.setDeleteModalState(false)}
        >
          <CModalHeader>
            <CModalTitle>Supprimer une activité de membre</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <p>
              Voulez vous supprimer
              {this.state.memberActivities &&
                this.state.memberActivities.length > 0 &&
                this.state.id < this.state.memberActivities.length &&
                ` ${
                  this.state.memberActivities[this.state.id].member.last_name
                } ${
                  this.state.memberActivities[this.state.id].member.first_name
                }`}
              ?
            </p>
          </CModalBody>
          <CModalFooter>
            <CButton
              color="secondary"
              onClick={() => this.setDeleteModalState(false)}
            >
              Annuler
            </CButton>
            <CButton color="danger" onClick={() => this.deleteMemberActivity()}>
              Supprimer
            </CButton>
          </CModalFooter>
        </CModal>
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

  setActivityField = (value) => {
    this.setState({
      activityField: value.value,
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
