import React from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CSpinner,
  CAlert,
} from "@coreui/react";
import api from "../../../const/api";
import BackButton from "../../../components/BackButton";
import AdminLayout from "../../../layout/AdminLayout";

export default class UpdateMember extends AdminLayout {
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
    };
  }

  componentDidMount() {
    this.getMember();
  }

  getError = (index) => {
    const errors = {
      "last_name should not be empty": "Le champ nom est obligatoire.",
      "first_name should not be empty": "Le champ prénom est obligatoire.",
      "contact must be longer than or equal to 10 characters": "Le champ contact doit contenir au moins 10 caractères.",
      "contact should not be empty": "Le champ contact doit contenir au moins 10 caractères.",
      "birth_place should not be empty": "Le champ lieu de naissance est obligatoire.",
      "address should not be empty": "Le champ adresse est obligatoire.",
      "church should not be empty": "Le champ paroisse est obligatoire.",
      "religion should not be empty": "Le champ religion est obligatoire.",
      "entry_date should not be empty": "Le champ date d'entrée est obligatoire.",
      "birthdate should not be empty": "Le champ date de naissance est obligatoire.",
    };
    return errors[index];
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
        this.props.history.push("/member");
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
            this.props.history.push("/member");
        });
      else
        res.json().then((res) => {
          if(typeof res.message === typeof []) {
            // console.log(res.message);
            this.setError(this.getError(res.message[0]));
          } else
          this.setError(this.getError(res.message));
        });
    });
  };

  getMember() {
    this.setLoading(true);
    fetch(api(`members/${this.props.match.params.id}`)).then((res) => {
      if (res.ok)
        res.json().then((data) => {
          if (data && data.member)
          this.setState({
            id: data.member.id,
            lastName: data.member.last_name,
            firstName: data.member.first_name,
            contact: data.member.contact,
            birthdate:
              data.member.birthdate &&
              data.member.birthdate.split("T")[0],
            birthPlace: data.member.birth_place,
            address: data.member.address,
            church: data.member.church,
            entryDate:
              data.member.entry_date &&
              data.member.entry_date.split("T")[0],
            promiseDate:
              data.member.promise_date &&
              data.member.promise_date.split("T")[0],
            picture: data.member.picture,
            talent: data.member.talent,
            religion: data.member.religion,
          });
        });
      this.setLoading(false);
    });
  }

  render() {
    return (
      <>
      <BackButton to={"/member"} />
        <CRow>
          <CCol xs={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <strong>Modification de membre</strong>
                <span className="d-grid gap-2 d-md-flex justify-content-md-end">
                </span>
              </CCardHeader>
              <CCardBody>
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
              <CButton
              color="primary"
              onClick={() => this.updateMember()}
              disabled={this.state.pending ? true : false}
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
