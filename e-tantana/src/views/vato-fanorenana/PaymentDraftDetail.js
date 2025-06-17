import React from "react";
import api from "../../const/api";
import Loading from "../pages/Loading";
import AsyncSelect from "react-select/async";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CListGroup,
  CAlert,
  CRow,
  CForm,
  CFormInput,
  CFormTextarea,
  CSpinner,
  CFormLabel,
  CTable,
  CListGroupItem,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CButton,
} from "@coreui/react";
import Moment from "moment";
import CIcon from "@coreui/icons-react";
import {
  cilPlus,
  cilCheck,
  cilInfo,
  cilPencil,
  cilX,
  cilTask,
} from "@coreui/icons";
import { Redirect } from "react-router";
import AdminLayout from "../../layout/AdminLayout";
import BackButton from "../../components/BackButton";

export default class PaymentDraftDetail extends AdminLayout {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params && this.props.match.params.id,
      paymentDraftDetails: [],
      ready: false,
      page: 1,
      pending: false,
      pageNumber: 20,
      alertValidation: false,
      pagination: [],
      paymentDraft: undefined,
      index: 0,
      infoVisible: false,
      alert: false,
      error: "",
      assignmentMemberModal: false,
      insertMemberModal: false,
      member: undefined,
      member_id: "",
      lastName: "",
      firstName: "",
      validate: false,
      contact: "",
      birthdate: undefined,
      birthPlace: "",
      address: "",
      church: "",
      entryDate: undefined,
      promiseDate: undefined,
      picture: "picture.png",
      talent: "",
      religion: "",
      activityFields: [],
      memberInput: "",
      memberInputId: "",
    };
  }

  numberWithSpaces(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  setInsertMemberModal = (visible) => {
    this.setState({ insertMemberModal: visible });
    if (visible === false) {
      this.clearFields();
    } else {
      this.setState({
        lastName: this.state.paymentDraftDetails[this.state.index].last_name,
        firstName: this.state.paymentDraftDetails[this.state.index].first_name,
        contact: this.state.paymentDraftDetails[this.state.index].phone_number,
        birthdate: Moment(
          this.state.paymentDraftDetails[this.state.index].birthdate
        ).format("D/MM/y"),
        promiseDte: Moment(
          this.state.paymentDraftDetails[this.state.index].promise_date
        ).format("D/MM/y"),
      });
    }
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

  getActivityFields = (index) => {
    fetch(
      api(
        "paymentDraftDetailActivityFields?payment_draft_detail_id=" +
          this.state.paymentDraftDetails[index].id
      )
    ).then((res) => {
      if (res.ok) {
        return res.json().then((data) => {
          this.setState({
            activityFields: data.data,
          });
        });
      }
    });
  };

  updateMember(id, value) {
    this.setPending(true);
    fetch(api(`paymentDraftDetails/${id}`), {
      headers: { "Content-Type": "application/json" },
      method: "PUT",
      body: JSON.stringify({
        member_id: value,
      }),
    }).then((res) => {
      if (res.ok) {
        // this.props.history.push(`/paymentDraftDetail/${this.props.match.params.id}`);
        // window.location.reload(true)
        this.getPaymentDraftDetails(this.state.page, this.state.pageNumber);
      }
    });
  }

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

  clearFields = () => {
    this.setState({
      lastName: "",
      firstName: "",
      contact: "",
      birthdate: undefined,
      birthPlace: "",
      address: "",
      church: "",
      entryDate: undefined,
      promiseDate: undefined,
      picture: "picture.png",
      talent: "",
      religion: "",
    });
  };

  setAssignmentMemberModal = (visible) => {
    this.setState({ assignmentMemberModal: visible });
    if (visible === false) {
      this.setState({ member: undefined, member_id: "", infoVisible: true });
    } else {
      this.setState({ infoVisible: false });
    }
  };

  setIndex = (index) => {
    this.setState({ index: index });
  };

  pageInfo = (index) => {
    this.getActivityFields(index);
    this.setIndex(index);
    this.setInfoVisible(true);
  };

  setInfoVisible = (visible) => {
    this.setState({ infoVisible: visible });
  };

  setMember = (value) => {
    this.setState({ member_id: value.value });
    fetch(api("members/" + value.value)).then((res) => {
      if (res.ok) {
        return res.json().then((data) => {
          this.setState({ member: data.member });
        });
      }
    });
  };

  async getMember(name, callback) {
    let query = "";
    if (name && name.length > 0) query = `?last_name=${name}`;
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
      "some payments have no corresponding member":
        " L'attribution d'un membre pour certains paiements n'est pas encore fait",
      "payment already validated": "payment déjà validé",
    };
    return errors[index];
  };

  setError = (error) => {
    this.setState({ error: error });
  };

  addMember = () => {
    this.setPending(true);
    fetch(api("memberSacrements/saveMember"), {
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
        sacrement: this.state.paymentDraftDetails[this.state.index].sacrement,
      }),
    }).then((res) => {
      this.setPending(false);
      if (res.ok)
        res.json().then((data) => {
          const paymentDraftDetails = this.state.paymentDraftDetails;
          paymentDraftDetails[this.state.index].member = data;
          paymentDraftDetails[this.state.index].member_id = data.id;
          this.setState({
            paymentDraftDetails: paymentDraftDetails,
            assignmentMemberModal: false,
            member: undefined,
            member_id: "",
            alertValidation: false,
            alert: false,
            error: "",
            insertMemberModal: false,
            infoVisible: true,
          });
          this.clearFields();
        });
      else
        res.json().then((res) => {
          if (typeof res.message === typeof []) {
            console.log(res.message);
            this.setState({ alert: true });
            this.setError(this.getError(res.message[0]));
          } else {
            this.setError(this.getError(res.message));
            this.setState({ alert: true });
          }
        });
    });
  };

  pagination = (totalPage) => {
    let page = [];
    for (let i = 1; i <= totalPage; i++) {
      page.push(i);
    }
    this.setState({ pagination: page });
  };

  assignmentMember = () => {
    const paymentDraftDetails = this.state.paymentDraftDetails;
    paymentDraftDetails[this.state.index].member = this.state.member;
    paymentDraftDetails[this.state.index].member_id = this.state.member_id;
    this.setState({
      paymentDraftDetails: paymentDraftDetails,
      assignmentMemberModal: false,
      member: undefined,
      member_id: "",
    });
  };

  getPaymentDraftDetails = (page, pageNumber) => {
    fetch(
      api(
        "paymentDraftDetails/" +
          this.state.id +
          "?page=" +
          Number(page) +
          "&pageNumber=" +
          Number(pageNumber)
      )
    ).then((res) => {
      if (res.ok) {
        return res.json().then((data) => {
          // console.log(data);
          const paymentDraft = data.paymentDraftDetails[0].paymentDraft;
          paymentDraft.id = data.paymentDraftDetails[0].payment_draftt_id;
          this.setState({
            paymentDraftDetails: data.paymentDraftDetails,
            totalPage: data.pagination.totalPages,
            page: page,
            paymentDraft: paymentDraft,
          });
          this.pagination(data.pagination.totalPages);
          this.setState({ ready: true });
        });
      }
    });
  };

  setPending = (state) => {
    this.setState({
      pending: state,
    });
  };

  validatePayment = async () => {
    fetch(api("paymentDrafts/validatePayment"), {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        paymentDraft: this.state.paymentDraft,
        paymentDraftDetails: this.state.paymentDraftDetails,
        note: undefined,
      }),
    }).then((res) => {
      if (res.ok) {
        this.setState({ validate: true });
      } else {
        res.json().then((res) => {
          if (typeof res.error === typeof []) {
            // console.log(res.error);
            this.setState({ alertValidation: true });
            this.setError(this.getError(res.error[0]));
          } else {
            this.setError(this.getError(res.error));
            this.setState({ alertValidation: true });
          }
        });
      }
    });
  };

  addRef = (id) => {
    this.props.history.push(`/paymentDraftDetail/${id}/ref`);
  };

  componentDidMount() {
    this.getPaymentDraftDetails(this.state.page, this.state.pageNumber);
  }

  MemberInput = ({ innerRef, innerProps, isDisabled, children, ...props }) =>
    !isDisabled ? (
      <div ref={innerRef} {...innerProps} className="customReactSelectMenu">
        {children}
        <button
          onClick={() => this.addMemberFromInput(props.selectProps.index)}
          className="btn btn-primary"
        >
          <CIcon icon={cilPlus} /> Nouveau membre
        </button>
      </div>
    ) : null;

  addMemberFromInput(index) {
    console.log(this.state.paymentDraftDetails[index]);
    fetch(api("members"), {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        last_name: this.state.paymentDraftDetails[index].last_name,
        first_name: this.state.paymentDraftDetails[index].first_name,
        contact: this.state.paymentDraftDetails[index].phone_number,
        birthdate: this.state.paymentDraftDetails[index].birthdate,
        birth_place: "",
        address: this.state.paymentDraftDetails[index].address,
        church: "",
        entry_date: "2000-01-01",
        picture: this.state.picture,
        religion: "Catholique",
      }),
    }).then((res) => {
      this.setPending(false);
      if (res.ok)
        res.json().then((data) => {
          this.updateMember(this.state.memberInputId, data.member.id);
        });
    });
  }

  render() {
    const {
      paymentDraft,
      ready,
      paymentDraftDetails,
      validate,
      activityFields,
    } = this.state;
    if (!ready) {
      return <Loading />;
    }
    if (validate) {
      return <Redirect to="/payment" />;
    }
    return (
      <>
        <BackButton to={"/invalidPayment"} />
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader className="text-danger">
              Les details du paiement de Md/Mr {paymentDraft.payer} le{" "}
              {Moment(paymentDraft.date).format("D/MM/y")}
              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                {2 <= this.user.accountType && (
                  <CButton
                    color={"success"}
                    onClick={() => this.validatePayment()}
                  >
                    <CIcon icon={cilCheck} className="me-2" />
                    Valider
                  </CButton>
                )}
              </div>
            </CCardHeader>
            <CCardBody>
              <CTable>
                <CTableHead color="dark">
                  <CTableRow>
                    <CTableHeaderCell scope="col">
                      Nom et Prenom
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col">Role</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Année</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Montant</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Membre</CTableHeaderCell>
                    {/* <CTableHeaderCell scope="col">Référence</CTableHeaderCell> */}
                    <CTableHeaderCell scope="col"></CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {paymentDraftDetails.map((paymentDraftDetail, index) => (
                    <CTableRow key={paymentDraftDetail.id}>
                      <CTableDataCell>
                        {paymentDraftDetail.last_name}{" "}
                        {paymentDraftDetail.first_name}
                      </CTableDataCell>
                      <CTableDataCell>
                        {paymentDraftDetail.memberRole.name}{" "}
                        {paymentDraftDetail.hierarchy &&
                          paymentDraftDetail.hierarchy.name}
                      </CTableDataCell>
                      <CTableDataCell>
                        {" "}
                        {paymentDraftDetail.activityYear.end_year}
                      </CTableDataCell>
                      <CTableDataCell className="text-success">
                        {this.numberWithSpaces(paymentDraftDetail.amount)} Ar
                      </CTableDataCell>
                      <CTableDataCell>
                        <AsyncSelect
                          index={index}
                          value={{
                            value: paymentDraftDetail.member?.id || 0,
                            label: `${
                              paymentDraftDetail.member?.last_name || ""
                            } ${paymentDraftDetail.member?.first_name || ""}`,
                          }}
                          name="membre"
                          placeholder="Selectionner un membre"
                          loadOptions={this.getMember}
                          // onInputChange={(value) => {
                          //   this.setState({
                          //     memberInput: value,
                          //     memberInputId: paymentDraftDetail.id,
                          //   });
                          // }}
                          onChange={(value) => {
                            this.updateMember(
                              paymentDraftDetail.id,
                              value.value
                            );
                          }}
                          components={{ Menu: this.MemberInput }}
                        />
                      </CTableDataCell>
                      {/* <CTableDataCell>
                        {paymentDraftDetail.note ? (
                          paymentDraftDetail.note
                        ) : (
                          <CButton
                            color="secondary"
                            variant="outline"
                            active={true}
                            onClick={() => this.addRef(this.state.id)}
                          >
                            Ajouter une référence
                          </CButton>
                        )}
                      </CTableDataCell> */}

                      <CTableHeaderCell scope="col">
                        <CButton
                          color="secondary"
                          variant="outline"
                          active={true}
                          onClick={() => this.pageInfo(index)}
                        >
                          <CIcon icon={cilInfo} /> Information
                        </CButton>
                      </CTableHeaderCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
              <br></br>
              <CAlert visible={this.state.alertValidation} color="danger">
                <center> {this.state.error}</center>
              </CAlert>
              <br></br>
            </CCardBody>
          </CCard>

          {/* Info modal */}
          <>
            <CModal
              alignment="center"
              visible={this.state.infoVisible}
              onClose={() => this.setInfoVisible(false)}
            >
              <CModalHeader>
                <CModalTitle> Paiement </CModalTitle>
              </CModalHeader>
              <CModalBody>
                <CListGroup flush>
                  <h3>
                    <center>
                      {paymentDraftDetails[
                        this.state.index
                      ].feeType.name.toUpperCase()}{" "}
                      ANNEE{" "}
                      {
                        paymentDraftDetails[this.state.index].activityYear
                          .end_year
                      }
                    </center>
                  </h3>
                  <br></br>
                  <CListGroupItem className="d-flex justify-content-between align-items-center">
                    <span>
                      {" "}
                      <strong> Nom : </strong>{" "}
                      {paymentDraftDetails[this.state.index].last_name}
                    </span>{" "}
                  </CListGroupItem>
                  <CListGroupItem>
                    <span>
                      {" "}
                      <strong> Prenom : </strong>{" "}
                      {paymentDraftDetails[this.state.index].first_name}
                    </span>
                  </CListGroupItem>
                  <CListGroupItem className="d-flex justify-content-between align-items-center">
                    <span>
                      {" "}
                      <strong> Role : </strong>{" "}
                      {paymentDraftDetails[this.state.index].memberRole.name}{" "}
                      {paymentDraftDetails[this.state.index].hierarchy &&
                        paymentDraftDetails[this.state.index].hierarchy
                          .name}{" "}
                    </span>
                  </CListGroupItem>
                  {paymentDraftDetails[this.state.index].section && (
                    <CListGroupItem>
                      <span>
                        {" "}
                        <strong>Section : </strong>{" "}
                        <span>
                          {" "}
                          {paymentDraftDetails[this.state.index].section.name}
                        </span>{" "}
                      </span>
                    </CListGroupItem>
                  )}
                  <CListGroupItem>
                    <span>
                      {" "}
                      <strong> Domaine: </strong>{" "}
                    </span>
                    <ul>
                      {activityFields.map((activityField, index) => (
                        <li key={index}>
                          {" "}
                          <strong>
                            {" "}
                            {activityField.activityField.hierarchy.name} :
                          </strong>{" "}
                          {activityField.activityField.name}{" "}
                        </li>
                      ))}
                    </ul>
                  </CListGroupItem>
                  {paymentDraftDetails[this.state.index].phone_number && (
                    <CListGroupItem>
                      <strong>Telephone : </strong>{" "}
                      {paymentDraftDetails[this.state.index].phone_number}
                    </CListGroupItem>
                  )}
                  {paymentDraftDetails[this.state.index].email && (
                    <CListGroupItem>
                      <strong>Email : </strong>{" "}
                      {paymentDraftDetails[this.state.index].email}
                    </CListGroupItem>
                  )}
                  {paymentDraftDetails[this.state.index].birthdate && (
                    <CListGroupItem>
                      <strong> Date de naissance : </strong>{" "}
                      {Moment(
                        paymentDraftDetails[this.state.index].birthdate
                      ).format("D/MM/y")}
                    </CListGroupItem>
                  )}
                  {paymentDraftDetails[this.state.index].promise_date && (
                    <CListGroupItem>
                      <strong> Voeux : </strong>{" "}
                      {Moment(
                        paymentDraftDetails[this.state.index].promise_date
                      ).format("D/MM/y")}
                    </CListGroupItem>
                  )}
                  {paymentDraftDetails[this.state.index].number_card && (
                    <CListGroupItem>
                      <strong> Numero de carte: </strong>{" "}
                      {paymentDraftDetails[this.state.index].number_card}
                    </CListGroupItem>
                  )}
                  {paymentDraftDetails[this.state.index].step && (
                    <CListGroupItem>
                      <strong> Phase : </strong>{" "}
                      {paymentDraftDetails[this.state.index].step}
                    </CListGroupItem>
                  )}
                  {paymentDraftDetails[this.state.index].sacrement && (
                    <CListGroupItem>
                      <strong> Sacrement: </strong>{" "}
                      {paymentDraftDetails[this.state.index].sacrement}
                    </CListGroupItem>
                  )}
                  {paymentDraftDetails[this.state.index].training && (
                    <CListGroupItem>
                      <strong> Formation: </strong>{" "}
                      {paymentDraftDetails[this.state.index].training}
                    </CListGroupItem>
                  )}
                  {paymentDraftDetails[this.state.index].member && (
                    <CListGroupItem>
                      <span>
                        {" "}
                        Cette personne correspond au membre{" "}
                        <strong>
                          {" "}
                          {
                            paymentDraftDetails[this.state.index].member
                              .last_name
                          }{" "}
                          {
                            paymentDraftDetails[this.state.index].member
                              .first_name
                          }
                        </strong>{" "}
                      </span>
                    </CListGroupItem>
                  )}
                  <CListGroupItem>
                    <strong> Montant :</strong>{" "}
                    <span className="text-success">
                      {this.numberWithSpaces(
                        paymentDraftDetails[this.state.index].amount
                      )}{" "}
                      AR
                    </span>
                  </CListGroupItem>
                </CListGroup>
              </CModalBody>
              <CModalFooter>
                {!paymentDraftDetails[this.state.index].member && (
                  <CButton
                    color="secondary"
                    variant="outline"
                    active={true}
                    onClick={() => this.setAssignmentMemberModal(true)}
                  >
                    <CIcon icon={cilPlus} /> Attribuer un membre
                  </CButton>
                )}
                {paymentDraftDetails[this.state.index].member && (
                  <CButton
                    color="secondary"
                    variant="outline"
                    active={true}
                    onClick={() => this.setAssignmentMemberModal(true)}
                  >
                    <CIcon icon={cilPencil} /> Changer le membre
                  </CButton>
                )}
              </CModalFooter>
            </CModal>
          </>

          {/* assignment member modal */}
          <>
            <CModal
              alignment="center"
              visible={this.state.assignmentMemberModal}
              onClose={() => this.setAssignmentMemberModal(false)}
              size="lg"
            >
              <CModalHeader>
                <CModalTitle>Attribution d'un membre </CModalTitle>
              </CModalHeader>
              <CModalBody>
                <CFormLabel htmlFor="membre">Membre</CFormLabel>
                <AsyncSelect
                  name="membre"
                  placeholder="Selectionner un membre"
                  loadOptions={this.getMember}
                  onChange={this.setMember}
                />
              </CModalBody>
              <CModalFooter>
                <CButton
                  color="danger"
                  onClick={() => this.setAssignmentMemberModal(false)}
                >
                  <CIcon icon={cilX} /> Fermer
                </CButton>
                <CButton
                  color="primary"
                  variant="outline"
                  active={true}
                  onClick={() => this.setInsertMemberModal(true)}
                >
                  <CIcon icon={cilPlus} /> Ajouter un membre
                </CButton>
                <CButton
                  color="success"
                  variant="outline"
                  active={true}
                  onClick={() => this.assignmentMember()}
                >
                  <CIcon icon={cilTask} /> Attribuer un membre
                </CButton>
              </CModalFooter>
            </CModal>
          </>

          {/* insert member modal */}
          <CModal
            size="xl"
            alignment="center"
            visible={this.state.insertMemberModal}
            onClose={() => this.setInsertMemberModal(false)}
          >
            <CModalHeader>
              <CModalTitle>Ajouter un membre </CModalTitle>
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
                    <CFormLabel htmlFor="birthdate">
                      Date de naissance
                    </CFormLabel>
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
                <CAlert visible={this.state.alert} color="danger">
                  <center> {this.state.error}</center>
                </CAlert>
              </CForm>
            </CModalBody>
            <CModalFooter>
              <CButton
                color="secondary"
                onClick={() => this.setInsertMemberModal(false)}
              >
                Annuler
              </CButton>
              <CButton
                color="primary"
                onClick={() => this.addMember()}
                disabled={this.state.pending ? true : false}
              >
                {this.state.pending ? (
                  <CSpinner className="me-2" color="light" size="sm" />
                ) : (
                  <></>
                )}
                Ajouter
              </CButton>
            </CModalFooter>
          </CModal>
        </CCol>
      </>
    );
  }
}
