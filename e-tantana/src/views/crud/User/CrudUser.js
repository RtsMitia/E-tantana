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
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilTrash, cilPlus, cilPencil } from "@coreui/icons";
import api from "../../../const/api";
import Loading from "../../pages/Loading";
import AdminLayout from "../../../layout/AdminLayout";

export default class CrudUser extends AdminLayout {
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
      // member: 0,
      totalPage: 0,
      page: 1,
      pageNumber: 4,
      pagination: [],
    };
  }

  componentDidMount() {
    this.getUsers();
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

  modalSubmit = () => {
    if (this.state.formText === "Ajouter") this.addUser();
    else this.updateUser();
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
  //       json.data.forEach((d) => {
  //         res.push({
  //           value: `${d.id}`,
  //           label: `${d.last_name} ${d.first_name}`,
  //         });
  //       });
  //       callback(res);
  //     });
  // }

  deleteUser() {
    fetch(api(`users/${this.state.users[this.state.id].id}`), {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        const tmp = [...this.state.users];
        tmp.splice(this.state.id, 1);
        this.setState({
          users: tmp,
        });
        this.setDeleteModalState(false);
      }
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
        // member_id: this.state.member_id,
      }),
    }).then((res) => {
      this.setPending(false);
      if (res.ok) {
        let tmp = [...this.state.users];
        tmp = tmp.map((elm) => {
          if (elm.id === this.state.id)
            return {
              ...elm,
              username: this.state.username,
              email: this.state.email,
              // member_id: this.state.member_id,
            };
          return elm;
        });
        this.setState({
          users: tmp,
        });
        this.cancelFormModal();
      } else
        res.json().then((res) => {
          this.setError(this.getError(res.message));
        });
    });
  }

  hierarchyToDelete(index) {
    this.setId(index);
    this.setDeleteModalState(true);
  }

  getUser(index) {
    this.props.history.push(`/user/${index}`);
    // this.setState({
    //   id: this.state.users[index].id,
    //   username: this.state.users[index].username,
    //   email: this.state.users[index].email || "",
    //   member: this.state.users[index].member,
    // });
    // this.setFormModalState(true, "Modifier");
  }

  addUser() {
    this.setPending(true);
    fetch(api("users"), {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        // member_id: this.state.member,
      }),
    }).then((res) => {
      this.setPending(false);
      if (res.ok)
        res.json().then((data) => {
          this.state.users.push(data.user);
          this.cancelFormModal();
        });
      else {
        res.json().then((res) => {
          if (typeof res.message === typeof []) {
            this.setError(this.getError(res.message[0]));
          } else {
            this.setError(this.getError(res.message));
          }
        });
      }
    });
  }

  getAccountType(type) {
    if(type === 0) return "Lecture";
    else if(type === 1) return "Lecture et écriture";
    else return "";
  }

  pagination = (totalPages) => {
    let page = [];
    for (let i = 1; i <= totalPages; i++) {
      page.push(i);
    }
    this.setState({ pagination: page });
  };

  getUsers(page=this.state.page, pageNumber=this.state.pageNumber) {
    this.setLoading(true);
    fetch(api(`users?page=${Number(page)}&pageNumber=${Number(pageNumber)}`)).then((res) => {
      if (res.ok)
        res.json().then((data) => {
          if (data && data.data)
            this.setState({
              users: data.data,
              totalPage: data.pagination.totalPages,
              page,
            });
          this.pagination(data.pagination.totalPages);
        });
      this.setLoading(false);
    });
  }

  render() {
    return (
      <>
        <CRow>
          <CCol xs={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <strong>Gestion des utilisateurs</strong>
                <span className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <CButton
                    color={"primary"}
                    onClick={() => this.props.history.push(`/user/add`)}
                  >
                    <CIcon icon={cilPlus} className="me-2" />
                    Ajouter
                  </CButton>
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
                        Nom d'utilisateur
                      </CTableHeaderCell>
                      <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                      {/* <CTableHeaderCell scope="col">Membre</CTableHeaderCell> */}
                      <CTableHeaderCell scope="col">Accès (Fivondronana)</CTableHeaderCell>
                      <CTableHeaderCell scope="col"></CTableHeaderCell>
                      <CTableHeaderCell scope="col"></CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {
                      this.state.users &&
                      this.state.users.map((user, index) => (
                        <CTableRow key={user.id}>
                          <CTableDataCell>{user.username}</CTableDataCell>
                          <CTableDataCell>{user.email}</CTableDataCell>
                          {/* <CTableDataCell>
                            {user.member.last_name +
                              " " +
                              user.member.first_name}
                          </CTableDataCell> */}
                          <CTableDataCell>{this.getAccountType(user.accountType)} ({user.activityField.name})</CTableDataCell>
                          <CTableDataCell>
                            <CButton
                              color={"light"}
                              onClick={() => this.getUser(user.id)}
                            >
                              <CIcon icon={cilPencil} /> Modifier
                            </CButton>
                          </CTableDataCell>
                          <CTableDataCell>
                            <CButton
                              color={"danger"}
                              onClick={() => this.hierarchyToDelete(index)}
                            >
                              <CIcon icon={cilTrash} /> Supprimer
                            </CButton>
                          </CTableDataCell>
                        </CTableRow>
                      ))
                    }
                  </CTableBody>
                </CTable>
                <CPagination aria-label="Page navigation example">
                      <CPaginationItem
                        aria-label="Previous"
                        disabled={this.state.page === 1}
                        onClick={() =>
                          this.getUsers(
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
                            this.getUsers(page, this.state.pageNumber)
                          }
                        >
                          {` ${page} `}
                        </CPaginationItem>
                      ))}
                      <CPaginationItem
                        aria-label="Next"
                        disabled={this.state.totalPage - this.state.page === 0 || this.state.users.length === 0}
                        onClick={() =>
                          this.getUsers(
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
          alignment="center"
          visible={this.state.deleteModalState}
          onClose={() => this.setDeleteModalState(false)}
        >
          <CModalHeader>
            <CModalTitle>Supprimer un utilisateur</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <p>
              Voulez vous supprimer{" "}
              {this.state.users &&
                this.state.users.length > 0 &&
                this.state.id < this.state.users.length &&
                this.state.users[this.state.id].username}
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
            <CButton color="danger" onClick={() => this.deleteUser()}>
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
  //     member: value.value,
  //   });
  // }

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
