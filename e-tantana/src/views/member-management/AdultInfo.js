import React, { Component } from "react";
import Moment from "moment";
import api from "../../const/api";
import Loading from "../pages/Loading";
import AsyncSelect from "react-select/async";
import avatar from "../../assets/images/avatars/2.jpg";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CPaginationItem,
  CPagination,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CModal,
  CForm,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CSpinner,
  CAlert,
  CFormTextarea,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CRow,
  CImage,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {
  cilTrash,
  cilPencil,
  cilPlus,
  cilUser,
  cilX,
  cilNotes,
} from "@coreui/icons";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
export default class AdultInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      member: undefined,
      member_id: undefined,
      marital_status: undefined,
      child_number: 0,
      profession: undefined,
      company_name: undefined,
      school_name: undefined,
      school_level: undefined,
      mail: undefined,
      facebook: undefined,
      member_activity: undefined,
      church_association: undefined,
      church_activities: undefined,
      ready: false,
      index: 0,
      totalPage: 0,
      pdf: false,
      page: 1,
      pageNumber: 50,
      pagination: [],
      pending: false,
      searchName: undefined,
      error: "",
      alert: false,
      list: [],
      rawList: [],
      insertModal: false,
      updateModal: false,
      deleteModal: false,
      infoModal: false,
      id: undefined,
      fivondronana: [],
      confirmation: false,
    };
  }

  onChangeSearchName = (e) => {
    this.getAdultInfos(1, this.state.pageNumber, e.target.value);
  };

  savePdf = () => {
    window.scrollTo(0, 0);
    setTimeout(() => {
      const input = document.getElementById("pdf");
      html2canvas(input, { useCORS: true, dpi: 144 }).then((canvas) => {
        const imgData = canvas.toDataURL();
        const imgWidth = 190;
        const pageHeight = 290;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        const doc = new jsPDF("pt", "mm");
        let position = 0;
        doc.addImage(imgData, "PNG", 10, 0, imgWidth, imgHeight + 30);
        heightLeft -= pageHeight;
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight - 5;
          doc.addPage();
          doc.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight + 30);
          heightLeft -= pageHeight;
        }
        doc.save(
          "adulte-" +
            this.state.member.last_name +
            "-" +
            this.state.member.first_name +
            ".pdf"
        );
      });
    }, 1000);
  };

  checkSacrementOfSacrementForMember = (id) => {
    fetch(api("memberSacrements/checkSacrement/member/" + id)).then((res) => {
      if (res.ok) {
        return res.json().then((data) => {
          this.setState({ confirmation: data });
        });
      }
    });
  };

  getMemberActivityForMember = (id) => {
    fetch(api("memberActivities/member/" + id)).then((res) => {
      if (res.ok) {
        return res.json().then((data) => {
          this.setState({
            member_activity: data.member_activity,
            fivondronana: data.fivondronana,
          });
        });
      }
    });
  };

  pageInfo = async (index) => {
    this.getMemberActivityForMember(this.state.list[index].member_id);
    this.checkSacrementOfSacrementForMember(this.state.list[index].member_id);
    this.setState({
      member: this.state.list[index].member,
      member_id: this.state.list[index].member_id,
      marital_status: this.state.list[index].marital_status,
      child_number: this.state.list[index].child_number,
      profession: this.state.list[index].profession,
      company_name: this.state.list[index].company_name,
      school_level: this.state.list[index].school_level,
      school_name: this.state.list[index].school_name,
      mail: this.state.list[index].mail,
      facebook: this.state.list[index].facebook,
      church_activities: this.state.list[index].church_activities,
      church_association: this.state.list[index].church_association,
      index: index,
      id: this.state.list[index].id,
    });
    this.setInfoModal(true);
  };

  delete = () => {
    this.setPending(true);
    const option = {
      headers: { "Content-Type": "application/json" },
      method: "DELETE",
    };
    fetch(api("adult-info/" + this.state.id), option)
      .then((res) => {
        this.setPending(false);
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then((data) => {
        this.setState({
          deleteModal: false,
          infoModal: false,
          index: 0,
        });
        this.clearState();
        this.getAdultInfos(
          this.state.page,
          this.state.pageNumber,
          this.state.searchName
        );
      });
  };

  setInfoModal = (visible) => {
    this.setState({ infoModal: visible });
    if (visible === false) {
      this.clearState();
    }
  };

  setUpdateModal = (visible) => {
    this.setState({ updateModal: visible });
  };

  setDeleteModal = (visible) => {
    this.setState({ deleteModal: visible });
  };

  clearState = () => {
    this.setState({
      member: undefined,
      member_id: undefined,
      marital_status: undefined,
      child_number: 0,
      profession: undefined,
      company_name: undefined,
      school_name: undefined,
      school_level: undefined,
      mail: undefined,
      facebook: undefined,
      church_association: undefined,
      church_activities: undefined,
      error: "",
      alert: false,
    });
  };

  setInsertModal = (visible) => {
    this.setState({ insertModal: visible });
    this.clearState();
  };

  getError(index) {
    const errors = {
      "marital_status should not be empty":
        "Le champ etat civil est obligatoire.",
      "member_id should not be empty": "Vous devez selectionner un membre",
      "This member already has an adult info":
        " il existe une autre information sur ce membre",
    };
    return errors[index];
  }

  setPending = (pending) => {
    this.setState({ pending: pending });
  };

  setError = (error) => {
    this.setState({ error: error });
    if (error !== undefined || error !== "") {
      this.setState({ alert: true });
    } else {
      this.setState({ alert: false });
    }
  };

  insert = () => {
    const option = {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        marital_status: this.state.marital_status,
        child_number: Number(this.state.child_number),
        profession: this.state.profession,
        member_id: this.state.member_id,
        company_name: this.state.company_name,
        church_association: this.state.church_association,
        church_activities: this.state.church_activities,
        school_level: this.state.school_level,
        school_name: this.state.school_name,
        facebook: this.state.facebook,
        mail: this.state.mail,
      }),
    };
    fetch(api("adult-info"), option).then((res) => {
      this.setPending(false);
      if (res.ok) {
        res.json().then((data) => {
          this.setState({
            insertModal: false,
          });
          this.clearState();
          this.getAdultInfos(
            this.state.page,
            this.state.pageNumber,
            this.state.searchName
          );
        });
      } else {
        res.json().then((res) => {
          if (typeof res.message === typeof []) {
            this.setError(this.getError(res.message[0]));
          } else {
            this.setError(this.getError(res.message));
          }
        });
      }
    });
  };

  update = () => {
    const option = {
      headers: { "Content-Type": "application/json" },
      method: "PUT",
      body: JSON.stringify({
        marital_status: this.state.marital_status,
        child_number: Number(this.state.child_number),
        profession: this.state.profession,
        member_id: this.state.member_id,
        company_name: this.state.company_name,
        church_association: this.state.church_association,
        church_activities: this.state.church_activities,
        school_level: this.state.school_level,
        school_name: this.state.school_name,
        facebook: this.state.facebook,
        mail: this.state.mail,
      }),
    };
    fetch(api("adult-info/" + this.state.id), option).then((res) => {
      this.setPending(false);
      if (res.ok) {
        res.json().then((data) => {
          this.setState({
            updateModal: false,
          });
          this.getAdultInfos(
            this.state.page,
            this.state.pageNumber,
            this.state.searchName
          );
        });
      } else {
        res.json().then((res) => {
          if (typeof res.message === typeof []) {
            this.setError(this.getError(res.message[0]));
          } else {
            this.setError(this.getError(res.message));
          }
        });
      }
    });
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

  getAdultInfos = (page, pageNumber, name) => {
    this.setState({ searchName: name });
    let url = api(
      "adult-info?page=" + Number(page) + "&pageNumber=" + pageNumber
    );
    if (name) {
      url = url + "&name=" + name;
    }
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then((data) => {
        this.setState({ list: data.data.entities });
        this.setState({ rawList: data.data.raw });
        this.setState({ ready: true });
        this.setState({ totalPage: data.pagination.totalPages, page: page });
        this.pagination(data.pagination.totalPages);
      });
  };

  onChangeProfession = (e) => {
    this.setState({
      profession: e.target.value,
    });
  };

  onChangeChildNumber = (e) => {
    this.setState({
      child_number: e.target.value,
    });
  };

  onChangeMaritalStatus = (e) => {
    this.setState({
      marital_status: e.target.value,
    });
  };

  onChangeSchoolLevel = (e) => {
    this.setState({
      school_level: e.target.value,
    });
  };

  onChangeSchoolName = (e) => {
    this.setState({
      school_name: e.target.value,
    });
  };

  onChangeCompanyName = (e) => {
    this.setState({
      company_name: e.target.value,
    });
  };

  onChangeChurhAssociation = (e) => {
    this.setState({
      churh_association: e.target.value,
    });
  };

  onChangeChurhActivities = (e) => {
    this.setState({
      church_activities: e.target.value,
    });
  };

  onChangeMail = (e) => {
    this.setState({
      mail: e.target.value,
    });
  };

  onChangememberId = (e) => {
    this.setState({
      member_id: e.value,
    });
  };

  onChangeFacebook = (e) => {
    this.setState({
      facebook: e.target.value,
    });
  };

  pagination = (totalPage) => {
    let page = [];
    for (let i = 1; i <= totalPage; i++) {
      page.push(i);
    }
    this.setState({ pagination: page });
  };

  componentDidMount() {
    this.getAdultInfos(
      this.state.page,
      this.state.pageNumber,
      this.state.searchName
    );
  }

  render() {
    const { ready, list } = this.state;
    if (!ready) {
      return <Loading />;
    }
    return (
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader color="green">
            <strong>Gestion des adultes</strong>
            <span className="d-grid gap-2 d-md-flex justify-content-md-end">
              <CButton onClick={() => this.setInsertModal(true)}>
                <CIcon icon={cilPlus} />
                Ajouter{" "}
              </CButton>
            </span>
          </CCardHeader>
          <CCardBody>
            <center>
              <CCol md={3}>
                {" "}
                <CFormInput
                  placeholder="rechercher un adulte"
                  type="text"
                  onChange={this.onChangeSearchName}
                  value={this.state.searchName}
                />
              </CCol>
            </center>
            <br></br>
            <CTable>
              <CTableHead color="dark">
                <CTableRow>
                  <CTableHeaderCell scope="col">
                    {" "}
                    Nom et prénom{" "}
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col">
                    {" "}
                    Fivondronana{" "}
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col">
                    {" "}
                    Address{" "}
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Fiche </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {list.map((adultInfo, index) => (
                  <CTableRow key={adultInfo.id}>
                    <CTableDataCell>
                      {adultInfo.member.last_name} {adultInfo.member.first_name}{" "}
                    </CTableDataCell>
                    <CTableDataCell>
                      {this.state.rawList[index].activityField}
                    </CTableDataCell>
                    <CTableDataCell>
                      {adultInfo.member.address}
                    </CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        color={"primary"}
                        onClick={() => this.pageInfo(index)}
                      >
                        <CIcon icon={cilUser} />
                      </CButton>
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
                  this.getAdultInfos(
                    this.state.page - 1,
                    this.state.pageNumber,
                    this.state.searchName
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
                    this.getAdultInfos(
                      page,
                      this.state.pageNumber,
                      this.state.searchName
                    )
                  }
                >
                  {" "}
                  {page}{" "}
                </CPaginationItem>
              ))}
              <CPaginationItem
                aria-label="Next"
                disabled={
                  this.state.totalPage - this.state.page === 0 ||
                  this.state.list.length === 0
                }
                onClick={() =>
                  this.getAdultInfos(
                    this.state.page + 1,
                    this.state.pageNumber,
                    this.state.searchName
                  )
                }
              >
                <span aria-hidden="true"> &raquo; </span>
              </CPaginationItem>
            </CPagination>
          </CCardBody>
        </CCard>

        {/* insert modal */}

        <CModal
          size="xl"
          alignment="center"
          visible={this.state.insertModal}
          onClose={this.setInsertModal}
          false
        >
          <CModalHeader>
            <CModalTitle>Ajouter un adulte</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CForm className="row g-3">
              <CCol md={12}>
                <CFormLabel htmlFor="membre">Membre</CFormLabel>
                <AsyncSelect
                  name="membre"
                  placeholder="Selectionner un membre"
                  loadOptions={this.getMember}
                  onChange={this.onChangememberId}
                />
              </CCol>
              <CCol md={6}>
                <CFormLabel>Etat civil</CFormLabel>
                <CFormSelect
                  id="marital_status"
                  value={this.state.marital_status}
                  onChange={this.onChangeMaritalStatus}
                >
                  <option> -- Etat civil --</option>
                  <option value="0"> Célibataire </option>
                  <option value="1"> Marié(e) </option>
                </CFormSelect>
              </CCol>
              <CCol md={6}>
                <CFormLabel>Nombre d'enfant</CFormLabel>
                <CFormInput
                  type="number"
                  id="child_number"
                  value={this.state.child_number}
                  onChange={this.onChangeChildNumber}
                />
              </CCol>
              <CCol md={6}>
                <CFormLabel>Email</CFormLabel>
                <CFormInput
                  type="text"
                  id="Mail"
                  value={this.state.mail}
                  onChange={this.onChangeMail}
                />
              </CCol>
              <CCol md={6}>
                <CFormLabel>Facebook</CFormLabel>
                <CFormInput
                  type="text"
                  id="facebook"
                  value={this.state.facebook}
                  onChange={this.onChangeFacebook}
                />
              </CCol>
              <CCol md={6}>
                <CFormLabel>Profession</CFormLabel>
                <CFormInput
                  type="text"
                  id="profession"
                  value={this.state.profession}
                  onChange={this.onChangeProfession}
                />
              </CCol>
              <CCol md={6}>
                <CFormLabel>Lieu de travail</CFormLabel>
                <CFormInput
                  type="text"
                  id="company_name"
                  value={this.state.company_name}
                  onChange={this.onChangeCompanyName}
                />
              </CCol>
              <center> Ou </center>
              <CCol md={6}>
                <CFormLabel>Ecole</CFormLabel>
                <CFormInput
                  type="text"
                  id="school"
                  value={this.state.school_name}
                  onChange={this.onChangeSchoolName}
                />
              </CCol>
              <CCol md={6}>
                <CFormLabel>Niveau</CFormLabel>
                <CFormInput
                  type="text"
                  id="school_level"
                  value={this.state.school_level}
                  onChange={this.onChangeSchoolLevel}
                />
              </CCol>
              <CCol md={6}>
                <CFormLabel>Autres associations à l'église</CFormLabel>
                <CFormTextarea
                  aria-label="With textarea"
                  value={this.state.church_association}
                  onChange={this.onChangeChurhAssociation}
                ></CFormTextarea>
              </CCol>
              <CCol md={6}>
                <CFormLabel>Autres activités à l'église</CFormLabel>
                <CFormTextarea
                  aria-label="With textarea"
                  value={this.state.churh_activities}
                  onChange={this.onChangeChurhActivities}
                ></CFormTextarea>
              </CCol>
              <CAlert visible={this.state.alert} color="danger">
                <center> {this.state.error}</center>
              </CAlert>
              <br></br>
            </CForm>
          </CModalBody>
          <CModalFooter>
            <CButton
              color="secondary"
              onClick={() => this.setInsertModal(false)}
            >
              Annuler
            </CButton>
            <CButton
              color="primary"
              onClick={() => this.insert()}
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
        <></>

        <CModal
          size="xl"
          alignment="center"
          visible={this.state.infoModal}
          onClose={() => this.setInfoModal(false)}
        >
          <CModalHeader>
            <CModalTitle> Fiche </CModalTitle>
          </CModalHeader>
          <CModalBody>
            <div className="aim-background" id="pdf">
              {this.state.pdf && (
                <center>
                  {" "}
                  <h1>
                    <u> Fiche </u>
                  </h1>
                </center>
              )}
              <br></br>
              <div className="image">
                <CImage rounded src={avatar} width={250} />
              </div>
              <div className="margin-left">
                <strong>
                  <u> A PROPOS DE LA PERSONNE </u>
                </strong>

                <ul>
                  <li>
                    {" "}
                    <strong> Nom : </strong>{" "}
                    {this.state.member && this.state.member.last_name}{" "}
                  </li>
                  <li>
                    {" "}
                    <strong> Prénom : </strong>{" "}
                    {this.state.member && this.state.member.first_name}
                  </li>{" "}
                  <li>
                    {" "}
                    <strong> Surnom : </strong>{" "}
                  </li>{" "}
                  <li>
                    {" "}
                    <strong> Responsabilité :</strong>{" "}
                    {this.state.member_activity &&
                      this.state.member_activity.memberRole.name}{" "}
                    {this.state.member_activity &&
                      this.state.member_activity.section &&
                      this.state.member_activity.section.name}{" "}
                    {this.state.member_activity &&
                      "à " + this.state.member_activity.activityField.name}{" "}
                  </li>
                  <li>
                    {" "}
                    <strong> Date et lieu de naissance : </strong>{" "}
                    {this.state.member &&
                      Moment(this.state.member.birthdate).format("D/MM/y")}{" "}
                    {this.state.member &&
                      this.state.member.bith_place &&
                      "  à " + this.state.member.bith_place}{" "}
                  </li>{" "}
                  <li>
                    {" "}
                    <strong> Marié(e)? : </strong>{" "}
                    {this.state.marital_status === 0 && " Non"}{" "}
                    {this.state.marital_status !== 0 && " Oui"}
                  </li>{" "}
                  <li>
                    {" "}
                    <strong> Nombre d'enfants : </strong>{" "}
                    {this.state.child_number}
                  </li>
                  <li>
                    {" "}
                    <strong> Adresse : </strong>{" "}
                    {this.state.member && this.state.member.address}
                  </li>{" "}
                  <CRow>
                    <CCol md={4}>
                      {" "}
                      <li>
                        {" "}
                        <strong> Profession : </strong> {this.state.profession}{" "}
                      </li>
                    </CCol>
                    <CCol md={3}>
                      {" "}
                      <li>
                        {" "}
                        <strong>Travaille à : </strong>{" "}
                        {this.state.company_name}
                      </li>
                    </CCol>
                    <CCol md={3}></CCol>
                  </CRow>
                  <CRow>
                    <CCol md={4}>
                      {" "}
                      <li>
                        {" "}
                        <strong> Niveau d'étude : </strong>{" "}
                        {this.state.school_level}
                      </li>
                    </CCol>
                    <CCol md={4}>
                      {" "}
                      <li>
                        {" "}
                        <strong> Etudie à : </strong> {this.state.school_name}
                      </li>
                    </CCol>
                    <CCol md={3}></CCol>
                  </CRow>
                  <li>
                    {" "}
                    <strong> Email : </strong>
                    {this.state.mail}{" "}
                  </li>
                  <li>
                    {" "}
                    <strong> Facebook : </strong> {this.state.facebook}
                  </li>
                  <li>
                    {" "}
                    <strong> Telephone : </strong>{" "}
                    {this.state.member && this.state.member.contact}{" "}
                  </li>
                  <li>
                    {" "}
                    <strong> Eglise : </strong>
                    {this.state.member && this.state.member.church}{" "}
                  </li>
                  <li>
                    {" "}
                    <strong> Déjà responsable des fivondronana : </strong>
                    {this.state.fivondronana.map((fivondronana, index) => (
                      <span key={index}>
                        {" "}
                        {fivondronana.name}{" "}
                        {index !== this.state.fivondronana.length - 1 && ","}
                      </span>
                    ))}
                  </li>
                  <li>
                    {" "}
                    <strong> Autres activités à l'église : </strong>{" "}
                    {this.state.church_activities}
                  </li>
                  <li>
                    {" "}
                    <strong> Autres associations à l'église : </strong>
                    {this.state.church_association}{" "}
                  </li>
                </ul>
                <br></br>
                <strong>
                  <u> A PROPOS DU SACREMENT </u>
                </strong>
                <ul>
                  <li>
                    {" "}
                    <strong> CONFIRMÉ : </strong>{" "}
                    {this.state.confirmation === false && "Non"}{" "}
                    {this.state.confirmation === true && "Oui"}{" "}
                  </li>
                </ul>
                <br></br>
                <strong>
                  <u> ASSOCIATION : </u>
                </strong>
                <ul>
                  <li>
                    {" "}
                    <strong> Date d'entrée en tant qu'Antily : </strong>{" "}
                    {this.state.member &&
                      this.state.member.entry_date &&
                      Moment(this.state.member.entry_date).format(
                        "D/MM/y"
                      )}{" "}
                  </li>
                  <li>
                    {" "}
                    <strong> Date de la promesse : </strong>{" "}
                    {this.state.member &&
                      this.state.member.promise_date &&
                      Moment(this.state.member.promise_date).format("D/MM/y")}
                  </li>
                </ul>
                <br></br>
                <strong>
                  <u> A PROPOS DE LA FORMATION : </u>
                </strong>
                <br></br>
                <br></br>
                <strong>
                  <u> TALENT OU COMPÉTENCES PARTICULIÈRES  : </u>
                </strong>
                <p>{this.state.member && this.state.member.talent}</p>
              </div>
            </div>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => this.setInfoModal(false)}>
              <CIcon icon={cilX} />
              Fermer
            </CButton>
            <CButton
              color="dark"
              variant="outline"
              active={true}
              disabled={this.state.pdf === true}
              onClick={() => this.savePdf()}
            >
              <CIcon icon={cilNotes} /> Générer un pdf
            </CButton>
            <CButton
              color="primary"
              variant="outline"
              active={true}
              onClick={() => this.setUpdateModal(true)}
            >
              <CIcon icon={cilPencil} /> Modifier
            </CButton>
            <CButton
              color="danger"
              variant="outline"
              active={true}
              onClick={() => this.setDeleteModal(true)}
            >
              <CIcon icon={cilTrash} color="red" /> Supprimer
            </CButton>
          </CModalFooter>
        </CModal>

        {/* delete modal */}
        <>
          <CModal
            alignment="center"
            visible={this.state.deleteModal}
            onClose={() => this.setDeleteModal(false)}
          >
            <CModalHeader>
              <CModalTitle>Suppression</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <p className="text-medium-emphasis small">
                Voulez-vous supprimer l'information sur le membre:{" "}
                <strong>
                  {" "}
                  {this.state.member && this.state.member.last_name}{" "}
                  {this.state.member && this.state.member.first_name}{" "}
                </strong>{" "}
                ?
              </p>
            </CModalBody>
            <CModalFooter>
              <CButton
                color="secondary"
                onClick={() => this.setDeleteModal(false)}
              >
                Annuler
              </CButton>
              <CButton
                color="danger"
                onClick={this.delete}
                disabled={this.state.pending ? true : false}
              >
                Confirmer
              </CButton>
            </CModalFooter>
          </CModal>
        </>

        <>
          {/* update modal */}

          <CModal
            size="xl"
            alignment="center"
            visible={this.state.updateModal}
            onClose={this.setUpdateModal}
            false
          >
            <CModalHeader>
              <CModalTitle>
                Modifier les informations de{" "}
                {this.state.member && this.state.member.last_name}{" "}
                {this.state.member && this.state.member.last_name}
              </CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CForm className="row g-3">
                <CCol md={6}>
                  <CFormLabel>Etat civil</CFormLabel>
                  <CFormSelect
                    id="marital_status"
                    value={this.state.marital_status}
                    onChange={this.onChangeMaritalStatus}
                  >
                    <option> -- Etat civil --</option>
                    <option value="0"> Célibataire </option>
                    <option value="1"> Marié(e) </option>
                  </CFormSelect>
                </CCol>
                <CCol md={6}>
                  <CFormLabel>Nombre d'enfant</CFormLabel>
                  <CFormInput
                    type="number"
                    id="child_number"
                    value={this.state.child_number}
                    onChange={this.onChangeChildNumber}
                  />
                </CCol>
                <CCol md={6}>
                  <CFormLabel>Email</CFormLabel>
                  <CFormInput
                    type="text"
                    id="Mail"
                    value={this.state.mail}
                    onChange={this.onChangeMail}
                  />
                </CCol>
                <CCol md={6}>
                  <CFormLabel>Facebook</CFormLabel>
                  <CFormInput
                    type="text"
                    id="facebook"
                    value={this.state.facebook}
                    onChange={this.onChangeFacebook}
                  />
                </CCol>
                <CCol md={6}>
                  <CFormLabel>Profession</CFormLabel>
                  <CFormInput
                    type="text"
                    id="profession"
                    value={this.state.profession}
                    onChange={this.onChangeProfession}
                  />
                </CCol>
                <CCol md={6}>
                  <CFormLabel>Lieu de travail</CFormLabel>
                  <CFormInput
                    type="text"
                    id="company_name"
                    value={this.state.company_name}
                    onChange={this.onChangeCompanyName}
                  />
                </CCol>
                <center> Ou </center>
                <CCol md={6}>
                  <CFormLabel>Ecole</CFormLabel>
                  <CFormInput
                    type="text"
                    id="school"
                    value={this.state.school_name}
                    onChange={this.onChangeSchoolName}
                  />
                </CCol>
                <CCol md={6}>
                  <CFormLabel>Niveau</CFormLabel>
                  <CFormInput
                    type="text"
                    id="school_level"
                    value={this.state.school_level}
                    onChange={this.onChangeSchoolLevel}
                  />
                </CCol>
                <CCol md={6}>
                  <CFormLabel>Autres associations à l'église</CFormLabel>
                  <CFormTextarea
                    aria-label="With textarea"
                    value={this.state.church_association}
                    onChange={this.onChangeChurhAssociation}
                  ></CFormTextarea>
                </CCol>
                <CCol md={6}>
                  <CFormLabel>Autres activités à l'église</CFormLabel>
                  <CFormTextarea
                    aria-label="With textarea"
                    value={this.state.churh_activities}
                    onChange={this.onChangeChurhActivities}
                  ></CFormTextarea>
                </CCol>
                <CAlert visible={this.state.alert} color="danger">
                  <center> {this.state.error}</center>
                </CAlert>
                <br></br>
              </CForm>
            </CModalBody>
            <CModalFooter>
              <CButton
                color="secondary"
                onClick={() => this.setUpdateModal(false)}
              >
                Annuler
              </CButton>
              <CButton
                color="primary"
                onClick={() => this.update()}
                disabled={this.state.pending ? true : false}
              >
                {this.state.pending ? (
                  <CSpinner className="me-2" color="light" size="sm" />
                ) : (
                  <></>
                )}
                Modifier
              </CButton>
            </CModalFooter>
          </CModal>
        </>
      </CCol>
    );
  }
}
