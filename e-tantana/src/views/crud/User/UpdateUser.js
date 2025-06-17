import React from "react";
import {
  CAlert,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
  CForm,
  CFormInput,
  CFormLabel,
  CSpinner,
  CFormSelect,
} from "@coreui/react";
import AsyncSelect from "react-select/async";
import api from "../../../const/api";
import BackButton from "../../../components/BackButton";
import AdminLayout from "../../../layout/AdminLayout";

export default class CreateUser extends AdminLayout {
  accountTypes = ["Lecture", "Lecture et écriture"];

  constructor(props) {
    super(props);
    this.state = {
      formModalState: false,
      formText: "Ajouter",
      deleteModalState: false,
      loading: true,
      pending: false,
      users: [],
      error: "",
      hasError: false,
      id: 0,
      username: "",
      password: "motdepasse",
      email: "",
      // member: null,
      activityField: null,
      totalPage: 0,
      page: 1,
      pageNumber: 4,
      pagination: [],
      accountType: 0,
    };
  }

  componentDidMount() {
    this.getUser();
  }

  getError(index) {
    const errors = {
      "Username already used.": "Ce nom d'utilisateur est déjà utilisé.",
      "Email address already used.": "Cette adresse mail est déjà utilisée.",
      "Member already have a user account.":
        "Ce membre a déjà un compte utilisateur.",
        "username should not be empty":" Le champ nom d'utilisateur est obligatoire ",
        "email should not be empty":" Le champ email est obligatoire",
        "email must be an email":" Email incorrect",
    };
    return errors[index];
  }

  cancelFormModal = () => {
    this.setFormModalState(false);
    this.clearFields();
    this.setError();
  }
  
  // async getMember(name, callback) {
  //   let query = "";
  //   if (name && name.length > 0) query = `?last_name=${name}`;
  //   return fetch(api(`members` + query), {
  //     method: "GET",
  //   })
  //     .then((res) => {
  //       if (res.ok) {
  //         return res.json();
  //       }
  //     })
  //     .then((json) => {
  //       const res = [];
  //       json.data.entities.forEach((d) => {
  //         res.push({
  //           value: `${d.id}`,
  //           label: `${d.last_name} ${d.first_name}`,
  //         });
  //       });
  //       callback(res);
  //     });
  // }
  
  async getActivityField(name, callback) {
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
  }

  modalSubmit = () => {
    if (this.state.formText === "Ajouter") this.addUser();
    else this.updateUser();
  }

  getUser() {
    this.setLoading(true);
    fetch(api(`users/${this.props.match.params.id}`)).then((res) => {
      if (res.ok)
        res.json().then((data) => {
          if (data) 
          this.setState({
              id: data.id,
              username: data.username,
              email: data.email || "",
              // member: {
              //   value: `${data.member.id}`,
              //   label: `${data.member.first_name} ${data.member.last_name}`,
              // },
              accountType: data.accountType,
              activityField: {
                value: `${data.activity_field_id}`,
                label: `${data.activityField.name}`,
              }
            });
        });
      this.setLoading(false);
    });
  }

  updateUser() {
    this.setPending(true);
    fetch(api(`users/${this.state.id}`), {
      headers: { "Content-Type": "application/json" },
      method: "PUT",
      body: JSON.stringify({
        username: this.state.username,
        email: this.state.email,
        // member_id: this.state.member.value,
        accountType: this.state.accountType,
        activity_field_id: this.state.activityField.value,
      }),
    }).then((res) => {
      this.setPending(false);
      if (res.ok) {
        this.props.history.push(`/user`);
      } else
        res.json().then((res) => {
          this.setError(this.getError(res.message));
        });
    });
  }
  
  onChangeAcces(e) {
    this.setState({ accountType: +e.target.value });
  }

  render() {
    return (
      <>
      <BackButton to={"/user"} />
        <CRow>
          <CCol xs={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <strong>Modifier un utilisateur</strong>
                <span className="d-grid gap-2 d-md-flex justify-content-md-end">
                </span>
              </CCardHeader>
              <CCardBody>
              <CForm>
              <div className="mb-3">
                <CFormLabel htmlFor="name">Nom d'utilisateur</CFormLabel>
                <CFormInput
                  type="text"
                  id="username"
                  value={this.state.username}
                  onChange={this.setUsername}
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="name">Email</CFormLabel>
                <CFormInput
                  type="email"
                  id="email"
                  value={this.state.email}
                  onChange={this.setEmail}
                />
              </div>
              {/* <div className="mb-3">
                <CFormLabel htmlFor="membre">Membre</CFormLabel>
                <AsyncSelect
                  value={this.state.member}
                  name="membre"
                  placeholder="Selectionner un membre"
                  loadOptions={this.getMember}
                  onChange={this.setMember}
                />
              </div> */}
              <div className="mb-3">
                <CFormLabel htmlFor="inputPassword4">Accès</CFormLabel>
                <CFormSelect
                  onChange={(e) => this.onChangeAcces(e)}
                  value={this.state.accountType}
                >
                  {this.accountTypes.map((type, index) => (
                    <option value={index} key={index}>
                      {type}
                    </option>
                  ))}
                </CFormSelect>
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="activityField">Lieu d'activité</CFormLabel>
                <AsyncSelect
                  value={this.state.activityField}
                  name="activityField"
                  placeholder="Selectionner un lieu d'activité"
                  loadOptions={this.getActivityField}
                  onChange={this.setActivityField}
                />
              </div>
              <br></br>
              <CAlert visible={this.state.hasError} color="danger">
                <center> {this.state.error}</center>
              </CAlert>
              <br></br>
              <CButton
              color="primary"
              onClick={() => this.updateUser()}
              disabled={this.state.pending}
            >
              {this.state.pending ? (
                <CSpinner className="me-2" color="light" size="sm" />
              ) : (
                <></>
              )}
              Modifier
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
      });
    } else {
      this.setState({
        error: "",
        hasError: false,
      });
    }
  }

  clearFields() {
    this.setState({
      username: "",
      email: "",
      // member: 0,
    });
  }

  setId(id) {
    this.setState({
      id,
    });
  }

  setUsername = (e) => {
    this.setState({
      username: e.target.value,
    });
  }

  setEmail = (e) => {
    this.setState({
      email: e.target.value,
    });
  }

  // setMember = (value) => {
  //   this.setState({
  //     member: { 
  //       value: value.value,
  //       label: value.label
  //     },
  //   });
  // }

  setActivityField = (value) => {
    this.setState({
      activityField: {
        value: `${value.value}`,
        label: `${value.label}`,
      },
    });
  }

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
