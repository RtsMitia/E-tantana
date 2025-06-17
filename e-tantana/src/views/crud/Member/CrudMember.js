import React from "react";
import Moment from "moment";
import { Link } from "react-router-dom";
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
  CFormTextarea,
  CSpinner,
  CListGroupItem,
  CListGroup,
  CCardText,
  CCardTitle,
  CAlert,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {
  cilTrash,
  cilPlus,
  cilPencil,
  cilArrowThickRight,
  cilUser,
} from "@coreui/icons";
import api from "../../../const/api";
import Loading from "../../pages/Loading";

export default class CrudMember extends React.Component {
  user = JSON.parse(sessionStorage.getItem("user"));

  constructor(props) {
    super(props);
    this.state = {
      formModalState: false,
      formText: "Ajouter",
      deleteModalState: false,
      cardModalState: false,
      loading: true,
      pending: false,
      members: [],
      error: "",
      hasError: false,
      id: 0,
      lastName: "",
      firstName: "",
      contact: "",
      birthdate: null,
      birthPlace: "",
      address: "",
      church: "",
      entryDate: null,
      promiseDate: null,
      picture: "picture.png",
      talent: "",
      religion: "",
      totalPage: 0,
      page: 1,
      pageNumber: 10,
      pagination: [],
      adultInfo: null,
      youthInfo: null,
      rawMembers: [],
    };
  }

  componentDidMount() {
    this.getMembers();
  }

  getError = (index) => {
    const errors = {
      "last_name should not be empty": "Le champ nom est obligatoire.",
      "first_name should not be empty": "Le champ prénom est obligatoire.",
      "contact must be longer than or equal to 10 characters":
        "Le champ contact doit contenir au moins 10 caractères.",
      "contact should not be empty":
        "Le champ contact doit contenir au moins 10 caractères.",
      "birth_place should not be empty":
        "Le champ lieu de naissance est obligatoire.",
      "address should not be empty": "Le champ adresse est obligatoire.",
      "church should not be empty": "Le champ paroisse est obligatoire.",
      "religion should not be empty": "Le champ religion est obligatoire.",
      "entry_date should not be empty":
        "Le champ date d'entrée est obligatoire.",
      "birthdate should not be empty":
        "Le champ date de naissance est obligatoire.",
    };
    return errors[index];
  };

  cancelFormModal = () => {
    this.setFormModalState(false);
    this.clearFields();
    this.setError();
  };

  cancelCardModal = () => {
    this.setCardModalState(false);
    this.clearFields();
  };

  modalSubmit = () => {
    if (this.state.formText === "Ajouter") this.addMember();
    else this.updateMember();
  };

  deleteMember = () => {
    fetch(api(`members/${this.state.members[this.state.id].id}`), {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        const tmp = [...this.state.members];
        tmp.splice(this.state.id, 1);
        this.setState({
          members: tmp,
        });
        this.setDeleteModalState(false);
      }
    });
  };

  updateMember = () => {
    this.setPending(true);
    fetch(api(`members/${this.state.id}`), {
      headers: { "Content-Type": "application/json" },
      method: "PUT",
      body: JSON.stringify({
        last_name: this.state.lastName,
        first_name: this.state.firstName,
        contact: this.state.contact,
        birthdate: this.state.birthdate,
        birth_place: this.state.birthPlace,
        address: this.state.address,
        church: this.state.church,
        entry_date: this.state.entryDate,
        promise_date: this.state.promiseDate,
        picture: this.state.picture,
        talent: this.state.talent,
        religion: this.state.religion,
      }),
    }).then((res) => {
      this.setPending(false);
      if (res.ok) {
        let tmp = [...this.state.members];
        tmp = tmp.map((elm) => {
          if (elm.id === this.state.id)
            return {
              ...elm,
              last_name: this.state.lastName,
              first_name: this.state.firstName,
              contact: this.state.contact,
              birthdate: this.state.birthdate,
              birth_place: this.state.birthPlace,
              address: this.state.address,
              church: this.state.church,
              entry_date: this.state.entryDate,
              promise_date: this.state.promiseDate,
              picture: this.state.picture,
              talent: this.state.talent,
              religion: this.state.religion,
            };
          return elm;
        });
        this.setState({
          members: tmp,
        });
        this.cancelFormModal();
      } else
        res.json().then((res) => {
          this.setError(this.getError(res.message));
        });
    });
  };

  memberToDelete = (index) => {
    this.setId(index);
    this.setDeleteModalState(true);
  };

  getMember = (index) => {
    this.props.history.push(`/member/${index}`);
  };

  pagination = (totalPages) => {
    let page = [];
    for (let i = 1; i <= totalPages; i++) {
      page.push(i);
    }
    this.setState({ pagination: page });
  };

  getCard = (index) => {
    this.setState({
      id: this.state.members[index].id,
      lastName: this.state.members[index].last_name,
      firstName: this.state.members[index].first_name,
      contact: this.state.members[index].contact,
      birthdate:
        this.state.members[index].birthdate &&
        this.state.members[index].birthdate,
      birthPlace: this.state.members[index].birth_place,
      address: this.state.members[index].address,
      church: this.state.members[index].church,
      entryDate:
        this.state.members[index].entry_date &&
        this.state.members[index].entry_date,
      promiseDate:
        this.state.members[index].promise_date &&
        this.state.members[index].promise_date,
      picture: this.state.members[index].picture,
      talent: this.state.members[index].talent,
      religion: this.state.members[index].religion,
      adultInfo: this.state.members[index].adultInfo,
      youthInfo: this.state.members[index].youthInfo,
      activityField: this.state.rawMembers[index].activityField,
    });
    this.setCardModalState(true);
  };

  addMember = () => {
    this.setPending(true);
    fetch(api("members"), {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        last_name: this.state.lastName,
        first_name: this.state.firstName,
        contact: this.state.contact,
        birthdate: this.state.birthdate,
        birth_place: this.state.birthPlace,
        address: this.state.address,
        church: this.state.church,
        entry_date: this.state.entryDate,
        promise_date: this.state.promiseDate,
        picture: this.state.picture,
        talent: this.state.talent,
        religion: this.state.religion,
      }),
    }).then((res) => {
      this.setPending(false);
      if (res.ok)
        res.json().then((data) => {
          this.state.members.push(data.member);
          this.cancelFormModal();
        });
      else
        res.json().then((res) => {
          if (typeof res.message === typeof []) {
            // console.log(res.message);
            this.setError(this.getError(res.message[0]));
          } else this.setError(this.getError(res.message));
        });
    });
  };

  getMembers = (page = this.state.page, pageNumber = this.state.pageNumber) => {
    this.setLoading(true);
    fetch(
      api(`members?page=${Number(page)}&pageNumber=${Number(pageNumber)}&activityField=${this.user.activity_field_id}`)
    ).then((res) => {
      if (res.ok)
        res.json().then((data) => {
          if (data && data.data)
            this.setState({
              members: data.data.entities,
              rawMembers: data.data.raw,
              totalPage: data.pagination.totalPages,
              page,
            });
          this.pagination(data.pagination.totalPages);
        });
      this.setLoading(false);
    });
  };

  render() {
    return (
      <>
        <CRow>
          <CCol xs={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <strong>Gestion des membres</strong>
                <span className="d-grid gap-2 d-md-flex justify-content-md-end">
                  {1 <= this.user.accountType && (
                    <CButton
                      color={"primary"}
                      onClick={() => this.props.history.push("/member/add")}
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
                          <CTableHeaderCell scope="col">Nom</CTableHeaderCell>
                          <CTableHeaderCell scope="col">
                            Prénom(s)
                          </CTableHeaderCell>
                          <CTableHeaderCell scope="col">
                            Contact
                          </CTableHeaderCell>
                          <CTableHeaderCell scope="col">
                            Toerana hikatrohana
                          </CTableHeaderCell>
                          <CTableHeaderCell scope="col">
                            Adresse
                          </CTableHeaderCell>
                          <CTableHeaderCell scope="col">Fiche</CTableHeaderCell>

                          <CTableHeaderCell scope="col"></CTableHeaderCell>
                          <CTableHeaderCell scope="col"></CTableHeaderCell>
                          <CTableHeaderCell scope="col"></CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        {this.state.members &&
                          this.state.members.map((member, index) => (
                            <CTableRow key={member.id}>
                              <CTableDataCell>
                                {member.last_name}
                              </CTableDataCell>
                              <CTableDataCell>
                                {member.first_name}
                              </CTableDataCell>
                              <CTableDataCell>{member.contact}</CTableDataCell>
                              <CTableDataCell>
                                {this.state.rawMembers[index].activityField}
                              </CTableDataCell>
                              <CTableDataCell>{member.address}</CTableDataCell>
                              <CTableDataCell>
                                <CButton
                                  color={"primary"}
                                  onClick={() => this.getCard(index)}
                                >
                                  <CIcon icon={cilUser} />
                                </CButton>
                              </CTableDataCell>
                              <CTableDataCell>
                                <Link to={"/memberSacrement/" + member.id}>
                                  <CButton color={"light"}>
                                    <CIcon icon={cilArrowThickRight} /> Voir ses
                                    sacrements
                                  </CButton>
                                </Link>
                              </CTableDataCell>
                              <CTableDataCell>
                                <center>
                                  {1 <= this.user.accountType && (
                                    <CButton
                                      color={"light"}
                                      onClick={() => this.getMember(member.id)}
                                    >
                                      <CIcon icon={cilPencil} /> Modifier
                                    </CButton>
                                  )}
                                </center>
                              </CTableDataCell>
                              <CTableDataCell>
                                {1 <= this.user.accountType && (
                                  <CButton
                                    color={"danger"}
                                    onClick={() => this.memberToDelete(index)}
                                  >
                                    <CIcon icon={cilTrash} /> Supprimer
                                  </CButton>
                                )}
                              </CTableDataCell>
                            </CTableRow>
                          ))}
                      </CTableBody>
                    </CTable>
                    <CPagination aria-label="Page navigation example">
                      <CPaginationItem
                        aria-label="Previous"
                        disabled={this.state.page === 1}
                        onClick={() =>
                          this.getMembers(
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
                            this.getMembers(page, this.state.pageNumber)
                          }
                        >
                          {` ${page} `}
                        </CPaginationItem>
                      ))}
                      <CPaginationItem
                        aria-label="Next"
                        disabled={
                          this.state.totalPage - this.state.page === 0 ||
                          this.state.members.length === 0
                        }
                        onClick={() =>
                          this.getMembers(
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
            <CModalTitle>{this.state.formText} un membre</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CForm>
              <CRow className="mb-3">
                <CCol sm>
                  <CFormLabel htmlFor="lastName">Nom</CFormLabel>
                  <CFormInput
                    type="text"
                    id="lastName"
                    value={this.state.lastName}
                    onChange={this.setLastName}
                  />
                </CCol>
                <CCol sm>
                  <CFormLabel htmlFor="firstName">Prénom(s)</CFormLabel>
                  <CFormInput
                    type="text"
                    id="firstName"
                    value={this.state.firstName}
                    onChange={this.setFirstName}
                  />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CCol sm={3}>
                  <CFormLabel htmlFor="birthdate">Date de naissance</CFormLabel>
                  <CFormInput
                    type="date"
                    id="birthdate"
                    value={this.state.birthdate}
                    onChange={this.setBirthdate}
                  />
                </CCol>
                <CCol sm={3}>
                  <CFormLabel htmlFor="birthplace">
                    Lieu de naissance
                  </CFormLabel>
                  <CFormInput
                    type="text"
                    id="birthplace"
                    value={this.state.birthPlace}
                    onChange={this.setBirthPlace}
                  />
                </CCol>
                <CCol sm>
                  <CFormLabel htmlFor="contact">Contact</CFormLabel>
                  <CFormInput
                    type="text"
                    id="contact"
                    value={this.state.contact}
                    onChange={this.setContact}
                  />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CCol sm>
                  <CFormLabel htmlFor="address">Adresse</CFormLabel>
                  <CFormInput
                    type="text"
                    id="address"
                    value={this.state.address}
                    onChange={this.setAddress}
                  />
                </CCol>
                <CCol sm={3}>
                  <CFormLabel htmlFor="entryDate">Date d'entrée</CFormLabel>
                  <CFormInput
                    type="date"
                    id="entryDate"
                    value={this.state.entryDate}
                    onChange={this.setEntryDate}
                  />
                </CCol>
                <CCol sm={3}>
                  <CFormLabel htmlFor="promiseDate">Promise date</CFormLabel>
                  <CFormInput
                    type="date"
                    id="promiseDate"
                    value={this.state.promiseDate}
                    onChange={this.setPromiseDate}
                  />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CCol sm>
                  <CFormLabel htmlFor="religion">Religion</CFormLabel>
                  <CFormInput
                    type="text"
                    id="religion"
                    value={this.state.religion}
                    onChange={this.setReligion}
                  />
                </CCol>
                <CCol sm>
                  <CFormLabel htmlFor="church">Paroisse</CFormLabel>
                  <CFormInput
                    type="text"
                    id="church"
                    value={this.state.church}
                    onChange={this.setChurch}
                  />
                </CCol>
              </CRow>
              <div className="mb-3">
                <CFormLabel htmlFor="talents">Talents</CFormLabel>
                <CFormTextarea
                  id="talents"
                  rows="3"
                  value={this.state.talent}
                  onChange={this.setTalent}
                ></CFormTextarea>
              </div>
              <br></br>
              <CAlert visible={this.state.hasError} color="danger">
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
              disabled={this.state.pending ? true : false}
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
            <CModalTitle>Supprimer un membre</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <p>
              Voulez vous supprimer{" "}
              {this.state.members &&
                this.state.members.length > 0 &&
                this.state.id < this.state.members.length &&
                `${this.state.members[this.state.id].last_name} ${
                  this.state.members[this.state.id].first_name
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
            <CButton color="danger" onClick={() => this.deleteMember()}>
              Supprimer
            </CButton>
          </CModalFooter>
        </CModal>
        <CModal
          alignment="center"
          visible={this.state.cardModalState}
          onClose={() => this.cancelCardModal(false)}
        >
          <CModalHeader>
            <CModalTitle>Fiche de membre</CModalTitle>
          </CModalHeader>
          <CModalBody>
            {/* <CCard style={{ width: '18rem' }}> */}
            {/* <CCardImage orientation="top" src={avatar} width="10px" /> */}
            <CCardBody>
              <CCardTitle>{`${this.state.lastName} ${this.state.firstName}`}</CCardTitle>
              <CCardText></CCardText>
            </CCardBody>
            <CListGroup flush>
              <CListGroupItem>
                <strong>Fivondronana</strong>: {this.state.activityField}
              </CListGroupItem>
              <CListGroupItem>
                <strong>Adresse</strong>: {this.state.address}
              </CListGroupItem>
              <CListGroupItem>
                <strong>Contact</strong>: {this.state.contact}
              </CListGroupItem>
              <CListGroupItem>
                <strong>Né(e)</strong> le{" "}
                {Moment(this.state.birthdate).format("D/MM/y")} à{" "}
                {this.state.birthPlace}
              </CListGroupItem>
              {this.state.adultInfo ? (
                this.state.adultInfo.profession ? (
                  <CListGroupItem>
                    <strong>Travail: </strong>
                    {this.state.adultInfo.profession} à{" "}
                    {this.state.adultInfo.company_name}
                  </CListGroupItem>
                ) : (
                  <CListGroupItem>
                    <strong>Etudes: </strong>
                    {this.state.adultInfo.shcool_level} à{" "}
                    {this.state.adultInfo.school_name}
                  </CListGroupItem>
                )
              ) : (
                this.state.youthInfo && (
                  <CListGroupItem>
                    <strong>Etudes: </strong>
                    {this.state.youthInfo.level} à{" "}
                    {this.state.adultInfo.school_name}
                  </CListGroupItem>
                )
              )}
              <CListGroupItem>
                {this.state.religion} à {this.state.church}
              </CListGroupItem>
              <CListGroupItem>
                <strong>Entré</strong> le{" "}
                {Moment(this.state.entryDate).format("D/MM/y")}
              </CListGroupItem>
              {this.state.promiseDate && (
                <CListGroupItem>
                  <strong>Engagement</strong> le{" "}
                  {Moment(this.state.promiseDate).format("D/MM/y")}
                </CListGroupItem>
              )}
              <CListGroupItem>
                <strong>Talents</strong>: {this.state.talent}
              </CListGroupItem>
            </CListGroup>
            {/* <CCardBody>
                            </CCardBody> */}
            {/* </CCard> */}
          </CModalBody>
          <CModalFooter>
            <CButton
              color={"primary"}
              onClick={() =>
                this.props.history.push(`/memberActivity/${this.state.id}`)
              }
            >
              Activité de membre
            </CButton>
            <CButton
              color={"primary"}
              onClick={() =>
                this.props.history.push(`/memberCard/${this.state.id}`)
              }
            >
              Carte de membre
            </CButton>
          </CModalFooter>
        </CModal>
      </>
    );
  }

  setError(message = null) {
    if (message)
      this.setState({
        error: message,
        hasError: true,
      });
    else
      this.setState({
        error: "",
        hasError: false,
      });
  }

  clearFields = () => {
    this.setState({
      lastName: "",
      firstName: "",
      contact: "",
      birthdate: "",
      birthPlace: "",
      address: "",
      church: "",
      entryDate: "",
      promiseDate: "",
      picture: "picture.png",
      talent: "",
      religion: "",
    });
  };

  setId = (id) => {
    this.setState({
      id,
    });
  };

  setLastName = (e) => {
    this.setState({
      lastName: e.target.value,
    });
  };

  setFirstName = (e) => {
    this.setState({
      firstName: e.target.value,
    });
  };

  setContact = (e) => {
    this.setState({
      contact: e.target.value,
    });
  };

  setBirthdate = (e) => {
    this.setState({
      birthdate: e.target.value,
    });
  };

  setBirthPlace = (e) => {
    this.setState({
      birthPlace: e.target.value,
    });
  };

  setAddress = (e) => {
    this.setState({
      address: e.target.value,
    });
  };

  setChurch = (e) => {
    this.setState({
      church: e.target.value,
    });
  };

  setEntryDate = (e) => {
    this.setState({
      entryDate: e.target.value,
    });
  };

  setPromiseDate = (e) => {
    this.setState({
      promiseDate: e.target.value,
    });
  };

  setTalent = (e) => {
    this.setState({
      talent: e.target.value,
    });
  };

  setReligion = (e) => {
    this.setState({
      religion: e.target.value,
    });
  };

  setFormModalState = (state, text = this.state.formText) => {
    this.setState({
      formModalState: state,
      formText: text,
    });
  };

  setCardModalState = (state) => {
    this.setState({
      cardModalState: state,
    });
  };

  setDeleteModalState = (state) => {
    this.setState({
      deleteModalState: state,
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
}
