import React from "react";
import api from "../../../const/api";
import Loading from "../../pages/Loading";
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
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CButton,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilTrash, cilPencil, cilPlus } from "@coreui/icons";
import AdminLayout from "../../../layout/AdminLayout";

export default class CrudActivityYear extends AdminLayout {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      status: "",
      ready: false,
      insertVisible: false,
      updateVisible: false,
      deletetVisible: false,
      start_year: "",
      end_year: "",
      note: "",
      index: 0,
      totalPage: 0,
      page: 1,
      pageNumber: 10,
      pagination: [],
      pending: false,
      error: "",
      body: undefined,
      alert: false,
    };
  }

  setBody = (body) => {
    this.setState({ body: body });
  };

  onChangeStartYear = (e) => {
    this.setState({
      start_year: e.target.value,
    });
  };

  setError = (error) => {
    this.setState({ error: error });
    if(error !== undefined || error !== ""){
      this.setState({alert:true});
    }
    else{
      this.setState({alert:false});
    }
  };

  onChangeEndYear = (e) => {
    this.setState({
      end_year: e.target.value,
    });
  };

  onChangeNote = (e) => {
    this.setState({
      note: e.target.value,
    });
  };

  onChangeId = (idActivityYear) => {
    this.setState({
      id: idActivityYear,
    });
  };

  pageUpdate = (index) => {
    this.setState({
      updateVisible: true,
      index: index,
      start_year: this.state.list[index].start_year,
      end_year: this.state.list[index].end_year,
      note: this.state.list[index].note,
    });
  };

  getError = (index) => {
    const errors = {
      "start_year should not be empty":
        "Le champ `debut d'annee` est obligatoire.",
      "end_year should not be empty": "Le champ `fin d'annee` est obligatoire.",
    };
    return errors[index];
  };

  checkYear = (year) => {
    if (Number(year)) {
      // console.log(true);
      if (Number(year) < 0) {
        this.setError("Annee negative");
        return false;
      } else {
        return true;
      }
    }
    this.setError("Une annee ne doit contenir que des chiffres");
    return false;
  };

  checkFields = (startYear, endYear, note) => {
    if (startYear === "" && endYear === "") {
      this.setError(
        "Les champs `debut d'annee` et `fin d'annee` sont obligatoires"
      );
      return false;
    } else if (startYear === "" && endYear !== "") {
      this.setError("Le champ `debut d'annee` est obligatoire.");
      return false;
    } else if (startYear !== "" && endYear === "") {
      this.setError("Le champ `fin d'annee` est obligatoire.");
      return false;
    }
    if (this.checkYear(startYear)) {
      if(this.checkYear(endYear)){
        if(Number(startYear)>Number(endYear)){
          this.setError("Le debut d'année doit etre inferieur au fin d'année")
        }
        else return true;
      }
      else
      {
        return false;
      }
    } else {
      return false;
    }
  };

  pageDelete = (index) => {
    this.setState({
      deleteVisible: true,
      index: index,
      start_year: this.state.list[index].start_year,
      end_year: this.state.list[index].end_year,
      note: this.state.list[index].note,
    });
  };

  setPending = (pending) => {
    this.setState({ pending: pending });
  };

  setInsertVisible = (visible) => {
    this.clearFields();
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

  delete = (event) => {
    this.setPending(true);
    const option = {
      headers: { "Content-Type": "application/json" },
      method: "DELETE",
    };
    fetch(api("activityYears/" + this.state.list[this.state.index].id), option)
      .then((res) => {
        this.setPending(false);
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then((data) => {
        this.setState({
          deleteVisible: false,
          index: 0,
        });
        this.clearFields();
        this.getActivityYears(this.state.page, this.state.pageNumber);
      });
  };

  clearFields = () => {
    this.setState({ start_year: "", end_year: "", note: "", error: "" , alert: false});
  };

  getActivityYears = (page, pageNumber) => {
    fetch(
      api(
        "activityYears?page=" +
          Number(page) +
          "&pageNumber=" +
          Number(pageNumber)
      )
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then((data) => {
        this.setState({ list: data.data });
        this.setState({ ready: true });
        this.setState({ totalPage: data.pagination.totalPages, page: page });
        this.pagination(data.pagination.totalPages);
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
    this.getActivityYears(this.state.page, this.state.pageNumber);
  }

  render() {
    const { list, ready } = this.state;
    if (!ready) {
      return <Loading />;
    }

    return (
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader color="green">
            <strong>Gestion des années d'activités</strong>
            <span className="d-grid gap-2 d-md-flex justify-content-md-end">
              <CButton onClick={() => this.props.history.push(`/activityYear/add`)}>
                <CIcon icon={cilPlus}/>Ajouter{" "}
              </CButton>
            </span>
          </CCardHeader>
          <CCardBody>
            <CTable>
              <CTableHead color="dark">
                <CTableRow>
                  <CTableHeaderCell scope="col">Debut d'année</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Fin d'année</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Remarques</CTableHeaderCell>
                  <CTableHeaderCell scope="col"></CTableHeaderCell>
                  <CTableHeaderCell scope="col"></CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {list.map((activityYear, index) => (
                  <CTableRow key={activityYear.id}>
                    <CTableDataCell>{activityYear.start_year}</CTableDataCell>
                    <CTableDataCell>{activityYear.end_year}</CTableDataCell>
                    <CTableDataCell>{activityYear.note}</CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        color="secondary"
                        variant="outline"
                        active={true}
                        onClick={() => this.props.history.push(`/activityYear/${activityYear.id}`)}
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
                  this.getActivityYears(
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
                    this.getActivityYears(page, this.state.pageNumber)
                  }
                >
                  {" "}
                  {page}{" "}
                </CPaginationItem>
              ))}
              <CPaginationItem
                aria-label="Next"
                disabled={this.state.totalPage - this.state.page === 0}
                onClick={() =>
                  this.getActivityYears(
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
    );
  }
}
