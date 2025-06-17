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
import { cilTrash, cilPlus } from "@coreui/icons";
import AdminLayout from "../../../layout/AdminLayout";

export default class CrudActivityField extends AdminLayout {
  user = JSON.parse(sessionStorage.getItem("user"));

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      activityFields: [],
      totalPage: 0,
      page: 1,
      pageNumber: 10,
      pagination: [],
      index: 0,
    };
  }

  componentDidMount() {
    this.getActivityField();
    this.getActivityFields(this.state.page, this.state.pageNumber);
  }
  
  getActivityField = () => {
    this.setState({loading: true});
    const user = JSON.parse(sessionStorage.getItem("user"));
    fetch(api(`activityFields/${user.activity_field_id}`))
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then((data) => {
        this.setState(
          {
            loggedHierarchy: data.activityField.hierarchy.name,
            loggedActivityField: data.activityField,
          },
          () => {
            if(this.state.loggedActivityField.hierarchy.name !== "Nasionaly" && this.state.loggedActivityField.hierarchy.name !== "Diosezy")
            this.props.history.push('/');
            this.setState({loading: true});
          }
        );
      });
  };

  getActivityFields = (page, pageNumber) => {
    this.setState({ loading: true });
    fetch(
      api(
        `activityFields?page=${Number(page)}&pageNumber=${Number(pageNumber)}&activityField=${this.user.activity_field_id}`
      )
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then((data) => {
        this.setState({
          activityFields: data.activityFields.data,
          totalPage: data.activityFields.pagination.totalPages,
          page: page,
          loading: false,
        });
        this.pagination(data.activityFields.pagination.totalPages);
      });
  };

  pagination = (totalPage) => {
    let page = [];
    for (let i = 1; i <= totalPage; i++) {
      page.push(i);
    }
    this.setState({ pagination: page });
  };

  pageDelete = (index) => {
    this.setState({
      deleteVisible: true,
      index: index,
      activityFieldDelete: this.state.activityFields[index].name,
    });
  };

  clearFields() {
    this.setState({
      activityFieldDelete: "",
    });
  }

  viewPageDelete = (visible, index) => {
    this.clearFields();
    this.setState({ deleteVisible: visible, index: index });
  };
  
  setPending = (pending) => {
    this.setState({ pending: pending });
  };

  delete = (event) => {
    this.setPending(true);
    const option = {
      headers: { "Content-Type": "application/json" },
      method: "DELETE",
    };
    fetch(api("activityFields/" + this.state.activityFields[this.state.index].id), option)
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
        this.getActivityFields(this.state.page, this.state.pageNumber);
      });
  };

  render() {
    const { loading, activityFields } = this.state;
    if (loading) {
      return <Loading />;
    }

    return (
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader color="green">
            <strong>Gestion des lieux d'activités</strong>
            <span className="d-grid gap-2 d-md-flex justify-content-md-end">
              <CButton
                onClick={() => this.props.history.push(`/activityField/add`)}
              >
                <CIcon icon={cilPlus} />
                Ajouter{" "}
              </CButton>
            </span>
          </CCardHeader>
          <CCardBody>
            <CTable>
              <CTableHead color="dark">
                <CTableRow>
                  <CTableHeaderCell scope="col">Numero</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Nom</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Superieur</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Rafitra</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Entité</CTableHeaderCell>
                  {/* <CTableHeaderCell scope="col"></CTableHeaderCell> */}
                  <CTableHeaderCell scope="col"></CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {activityFields.map((activityField, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell>{activityField.number}</CTableDataCell>
                    <CTableDataCell>{activityField.name}</CTableDataCell>
                    <CTableDataCell>
                      {activityField.superior?.name}
                    </CTableDataCell>
                    <CTableDataCell>
                      {activityField.hierarchy.name}
                    </CTableDataCell>
                    <CTableDataCell>
                      {activityField.entity}
                    </CTableDataCell>
                    {/* <CTableDataCell>
                      <CButton
                        color="secondary"
                        variant="outline"
                        active={true}
                        onClick={() =>
                          this.props.history.push(
                            `/activityField/${activityField.id}`
                          )
                        }
                      >
                        <CIcon icon={cilPencil} /> Modifier
                      </CButton>
                    </CTableDataCell> */}
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
                  this.getActivityFields(
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
                    this.getActivityFields(page, this.state.pageNumber)
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
                  this.getActivityFields(
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
              <CModalTitle>Suppression d'un lieu d'activité</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <p className="text-medium-emphasis small">
                Voulez-vous supprimer{" "}
                <strong color="red"> {this.state.activityFieldDelete}</strong> ?
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
