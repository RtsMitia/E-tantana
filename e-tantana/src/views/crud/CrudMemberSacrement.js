import React, { Component } from "react";
import Moment from "moment";
import api from "../../const/api";
import Loading from "../pages/Loading";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CRow,
  CPaginationItem,
  CFormSelect,
  CPagination,
  CFormInput,
  CFormLabel,
  CTable,
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
  CAlert,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilTrash, cilPencil, cilPlus } from "@coreui/icons";
import BackButton from "../../components/BackButton";

export default class CrudMemberSacrement extends Component {
  constructor(props) {
    super(props);
    const { match } = props;
    this.state = {
      list: [],
      pending: false,
      status: "",
      ready: false,
      insertVisible: false,
      updateVisible: false,
      deletetVisible: false,
      sacrements: [],
      sacrement: "",
      member: "",
      date: "",
      place: "",
      sacrement_id: "",
      member_id: match && match.params && match.params.id,
      index: 0,
      totalPage: 0,
      page: 1,
      pageNumber: 10,
      pagination: [],
      error: "",
      alert: false,
    };
    //  ()=>this.setInsertVisible=
  }

  setError = (error) => {
    this.setState({ error: error });
  };

  onChangeMemberId = (e) => {
    this.setState({
      member_id: e.target.value,
    });
  };

  onChangeSacrementId = (e) => {
    this.setState({
      sacrement_id: e.target.value,
    });
  };

  clearFields = () => {
    this.setState({ sacrement_id: "", place: "", date: "", error: "",alert:false });
  };

  checkFields = (sacrement, place, date) => {
    if (sacrement === "") {
      this.setError("vous devez selectionnez un sacrement");
      this.setState({ alert: true });
      return false;
    } else if (date === "") {
      this.setError("Le champ `date` ne peut pas etre vide");
      this.setState({ alert: true });
      return false;
    } else if (place === "") {
      this.setError("Le champ `lieu` ne peut pas etre vide");
      this.setState({ alert: true });
      return false;
    }
    return true;
  };

  onChangePlace = (e) => {
    this.setState({
      place: e.target.value,
    });
  };

  onChangeDate = (e) => {
    this.setState({
      date: e.target.value,
    });
  };

  pageUpdate = (index) => {
    this.setState({
      updateVisible: true,
      index: index,
      sacrement: this.state.list[index].sacrement,
      place: this.state.list[index].place,
      date: this.state.list[index].date,
      sacrement_id: this.state.list[index].sacrement.id,
    });
    if(this.state.list[index].date){
      this.setState({
        date: this.state.list[index].date,
      });
    }
  };

  pageDelete = (index) => {
    this.setState({
      deleteVisible: true,
      index: index,
      sacrement: this.state.list[index].sacrement,
      place: this.state.list[index].place,
      date: this.state.list[index].date,
    });
  };

  setPending = (pending) => {
    this.setState({ pending: pending });
  };

  setInsertVisible = (visible) => {
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
    if (
      this.checkFields(
        this.state.sacrement_id,
        this.state.place,
        this.state.date
      )
    ) {
      this.setPending(true);
      const option = {
        headers: { "Content-Type": "application/json" },
        method: "PUT",
        body: JSON.stringify({
          sacrement_id: this.state.sacrement_id,
          place: this.state.place,
          date: this.state.date,
        }),
      };
      fetch(
        api("memberSacrements/") + this.state.list[this.state.index].id,
        option
      )
        .then((res) => {
          this.setPending(false);
          if (res.ok) {
            return res.json();
          }
          throw res;
        })
        .then((data) => {
          this.setState({
            updateVisible: false,
          });
          this.clearFields();
          this.getMemberSacrements(this.state.page, this.state.pageNumber);
        });
    }
  };

  getError = (index) => {
    const errors = {
      "place should not be empty": "Le champ lieu est obligatoire.",
      "date should not be empty": "Le champ date est obligatoire.",
      "sacrement_id should not be empty":
        "Vous devez selectionnez un sacrement",
    };
    return errors[index];
  };

  insert = (event) => {
    // if(this.checkFields(this.state.sacrement_id,this.state.place,this.state.date)){
    this.setPending(true);
    const option = {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        member_id: this.state.member_id,
        sacrement_id: this.state.sacrement_id,
        place: this.state.place,
        date: this.state.date,
      }),
    };
    fetch(api("memberSacrements"), option).then((res) => {
      this.setPending(false);
      if (res.ok) {
        return res.json().then((data) => {
          this.setState({
            insertVisible: false,
          });
          this.clearFields();
          this.getMemberSacrements(this.state.page, this.state.pageNumber);
        });
      } else {
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
    });

    // }
  };

  getMember = () => {
    fetch(api("members/" + this.state.member_id))
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then((data) => {
        this.setState({
          member: data.member,
        });
      });
  };

  delete = (event) => {
    const option = {
      headers: { "Content-Type": "application/json" },
      method: "DELETE",
    };
    fetch(
      api("memberSacrements/" + this.state.list[this.state.index].id),
      option
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then((data) => {
        this.setState({
          deleteVisible: false,
          sacrement: "",
          index: 0,
        });
        this.clearFields();
        this.getMemberSacrements(this.state.page, this.state.pageNumber);
      });
  };

  getSacrements = () => {
    fetch(api("sacrements"))
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then((data) => {
        this.setState({ sacrements: data });
        this.setState({ ready: true });
      });
  };

  getMemberSacrements = (page, pageNumber) => {
    fetch(
      api(
        "memberSacrements?page=" +
          Number(page) +
          "&pageNumber=" +
          Number(pageNumber) +
          "&member_id=" +
          this.state.member_id
      )
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then((data) => {
        this.setState({ list: data.memberSacrements.data });
        this.setState({ ready: true });
        this.setState({
          totalPage: data.memberSacrements.pagination.totalPages,
          page: page,
        });
        this.pagination(data.memberSacrements.pagination.totalPages);
      });
  };
  pagination = (totalPages) => {
    let page = [];
    for (let i = 1; i <= totalPages; i++) {
      page.push(i);
    }
    this.setState({ pagination: page });
  };

  componentDidMount() {
    this.getMemberSacrements(this.state.page, this.state.pageNumber);
    this.getSacrements();
    this.getMember();
  }

  render() {
    const { list, ready, sacrements } = this.state;
    if (!ready) {
      return <Loading />;
    }

    return (
      <>
      <BackButton to={"/member"} />
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader color="green">
              <strong> Sacrements du membre  {this.state.member.first_name} {this.state.member.last_name}</strong>
              <span className="d-grid gap-2 d-md-flex justify-content-md-end"><CButton onClick={() => this.setInsertVisible(true)}>
                <CIcon icon={cilPlus}/>Ajouter{" "}
              </CButton></span>
            </CCardHeader>
            <CCardBody>
              <CTable>
                <CTableHead color="dark">
                  <CTableRow>
                    <CTableHeaderCell scope="col">Sacrement</CTableHeaderCell>
                    <CTableHeaderCell scope="col">
                      Date et lieu
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col"></CTableHeaderCell>
                    <CTableHeaderCell scope="col"></CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {list.map((memberSacrement, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell>
                        {memberSacrement.sacrement.name}
                      </CTableDataCell>
                      <CTableDataCell>
                        {Moment(memberSacrement.date).format("D/MM/y")} à{" "}
                        {memberSacrement.place}
                      </CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          color="secondary"
                          variant="outline"
                          active={true}
                          onClick={() => this.pageUpdate(index)}
                        >
                          <CIcon icon={cilPencil} /> Modifier
                        </CButton>
                      </CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          color="danger"
                          variant="outline"
                          active={true}
                          onClick={() => this.pageDelete(index)}
                        >
                          <CIcon icon={cilTrash} color="red" /> Supprimer
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
                    this.getMemberSacrements(
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
                    onClick={() =>
                      this.getMemberSacrements(page, this.state.pageNumber)
                    }
                  >
                    {" "}
                    {page}{" "}
                  </CPaginationItem>
                ))}
                <CPaginationItem
                  aria-label="Next"
                  disabled={this.state.totalPage - this.state.page === 0 || this.state.list.length === 0}
                  onClick={() =>
                    this.getMemberSacrements(
                      this.state.page + 1,
                      this.state.pageNumber
                    )
                  }
                >
                  <span aria-hidden="true"> &raquo; </span>
                </CPaginationItem>
              </CPagination>
            </CCardBody>
          </CCard>

          {/* insert modal */}

          <>
            <CModal
              alignment="center"
              size="xl"
              visible={this.state.insertVisible}
              onClose={() => this.setInsertVisible(false)}
            >
              <CModalHeader>
                <CModalTitle>Ajout </CModalTitle>
              </CModalHeader>
              <CModalBody>
                <CForm className="row g-3">
                  <CCol md={12}>
                    <CFormLabel htmlFor="inputEmail4">Sacrement</CFormLabel>
                    <CFormSelect
                      value={this.state.sacrement_id}
                      onChange={this.onChangeSacrementId}
                      aria-label="Default select example"
                    >
                      {sacrements.map((sacr, index) => (
                        <option key={index} value={sacr.id}>
                          {sacr.name}
                        </option>
                      ))}
                    </CFormSelect>
                  </CCol>
                  <CCol md={6}>
                    <CFormLabel htmlFor="inputEmail4">Date</CFormLabel>
                    <CFormInput
                      type="date"
                      value={this.state.date}
                      onChange={this.onChangeDate}
                    />
                  </CCol>
                  <CCol md={6}>
                    <CFormLabel htmlFor="inputPassword4">Lieu</CFormLabel>
                    <CFormInput
                      type="text"
                      value={this.state.place}
                      onChange={this.onChangePlace}
                    />
                  </CCol>
                </CForm>
                <br></br>
              <CAlert visible={this.state.alert} color="danger">
                <center> {this.state.error}</center>
              </CAlert><br></br>
              </CModalBody>
              <CModalFooter>
                <CButton
                  color="secondary"
                  onClick={() => this.setInsertVisible(false)}
                >
                  Fermer
                </CButton>
                <CButton
                  color="primary"
                  onClick={this.insert}
                  disabled={this.state.pending ? true : false}
                >
                  Ajouter
                </CButton>
              </CModalFooter>
            </CModal>
          </>
          {/* update modal */}

          <>
            <CModal
              alignment="center"
              size="xl"
              visible={this.state.updateVisible}
              onClose={() => this.viewPageUpdate(false, this.state.index)}
            >
              <CModalHeader>
                <CModalTitle>Modification d'une année d'activité</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <CForm className="row g-3">
                  <CCol md={12}>
                    <CFormLabel htmlFor="inputEmail4">
                      Sacrement {this.state.sacrement.id}
                    </CFormLabel>
                    <CFormSelect
                      value={this.state.sacrement_id}
                      onChange={this.onChangeSacrementId}
                      aria-label="Default select example"
                    >
                      {sacrements.map((sacr, index) => (
                        <option key={index} value={sacr.id}>
                          {sacr.name}
                        </option>
                      ))}
                    </CFormSelect>
                  </CCol>
                  <CCol md={6}>
                    <CFormLabel htmlFor="inputEmail4">Date</CFormLabel>
                    <CFormInput
                      type="date"
                      value={this.state.date.split("T")[0]}
                      onChange={this.onChangeDate}
                    />
                  </CCol>
                  <CCol md={6}>
                    <CFormLabel htmlFor="inputPassword4">Lieu</CFormLabel>
                    <CFormInput
                      type="text"
                      value={this.state.place}
                      onChange={this.onChangePlace}
                    />
                  </CCol>
                </CForm>
                <br></br>
              <CAlert visible={this.state.alert} color="danger">
                <center> {this.state.error}</center>
              </CAlert><br></br>
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

          {/* delete modal */}

          <>
            <CModal
              alignment="center"
              visible={this.state.deleteVisible}
              onClose={() => this.viewPageDelete(false, this.state.index)}
            >
              <CModalHeader>
                <CModalTitle>Suppression d'une année d'activité</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <p className="text-medium-emphasis small">
                  Voulez-vous supprimer l'année d'activité :{" "}
                  <strong color="red">
                    {" "}
                    {this.state.start_year} - {this.state.end_year}{" "}
                  </strong>{" "}
                  ?
                </p>
              </CModalBody>
              <CModalFooter>
                <CButton
                  color="secondary"
                  onClick={() => this.viewPageDelete(false, this.state.index)}
                >
                  Fermer
                </CButton>
                <CButton
                  color="danger"
                  onClick={this.delete}
                  disabled={this.state.pending ? true : false}
                >
                  Supprimer
                </CButton>
              </CModalFooter>
            </CModal>
          </>
        </CCol>
      </CRow>
      </>
    );
  }
}
