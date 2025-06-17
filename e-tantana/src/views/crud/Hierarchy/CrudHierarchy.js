import React from "react";
import {
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

export default class CrudHierarchy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formModalState: false,
      formText: "Ajouter",
      deleteModalState: false,
      loading: true,
      pending: false,
      hierarchies: null,
      error: "",
      hasError: false,
      id: 0,
      name: "",
      level: "",
      note: "",
      alert: false,
    };
  }

  componentDidMount() {
    this.getHierarchies();
  }

  getError(index) {
    const errors = {
      "name should not be empty": "Le champ nom est obligatoire.",
    };
    return errors[index];
  }

  cancelFormModal = () => {
    this.setFormModalState(false);
    this.clearFields();
    this.setError();
  }

  modalSubmit = () => {
    if (this.state.formText === "Ajouter") this.addHierarchy();
    else this.updateHierarchy();
  }

  deleteHierarchy() {
    fetch(api(`hierarchies/${this.state.hierarchies[this.state.id].id}`), {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        const tmp = [...this.state.hierarchies];
        tmp.splice(this.state.id, 1);
        this.setState({
          hierarchies: tmp,
        });
        this.setDeleteModalState(false);
      }
    });
  }

  updateHierarchy() {
    this.setPending(true);
    fetch(api(`hierarchies/${this.state.id}`), {
      headers: { "Content-Type": "application/json" },
      method: "PUT",
      body: JSON.stringify({
        name: this.state.name,
        level: this.state.level,
        note: this.state.note,
      }),
    }).then((res) => {
      this.setPending(false);
      if (res.ok) {
        let tmp = [...this.state.hierarchies];
        tmp = tmp.map((elm) => {
          if (elm.id === this.state.id)
            return {
              ...elm,
              name: this.state.name,
              level: this.state.level,
              note: this.state.note,
            };
          return elm;
        });
        this.setState({
          hierarchies: tmp,
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

  getHirarchy(index) {
    this.props.history.push(`/hierarchy/${index}`);
  }

  addHierarchy() {
    this.setPending(true);
    fetch(api("hierarchies"), {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        name: this.state.name,
        level: this.state.level,
        note: this.state.note,
      }),
    }).then((res) => {
      this.setPending(false);
      if (res.ok)
        res.json().then((data) => {
          this.state.hierarchies.push(data.hierarchy);
          this.cancelFormModal();
        });
      else
        res.json().then((res) => {
          this.setError(this.getError(res.message));
        });
    });
  }

  getHierarchies() {
    this.setLoading(true);
    fetch(api("hierarchies")).then((res) => {
      if (res.ok)
        res.json().then((data) => {
          if (data && data.hierarchies)
            this.setState({
              hierarchies: data.hierarchies,
            });
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
                <strong>Gestion des hierarchies</strong>
                <span className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <CButton
                    color={"primary"}
                    onClick={() => this.props.history.push("/hierarchy/add")}
                  >
                    <CIcon icon={cilPlus} className="me-2" />
                    Ajouter
                  </CButton>
                </span>
              </CCardHeader>
              <CCardBody>
                <CTable>
                  <CTableHead>
                    <CTableRow color="dark">
                      <CTableHeaderCell scope="col">Nom</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Niveau</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Remarques</CTableHeaderCell>
                      <CTableHeaderCell scope="col"></CTableHeaderCell>
                      <CTableHeaderCell scope="col"></CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {this.state.loading ? (
                      <></>
                    ) : (
                      this.state.hierarchies &&
                      this.state.hierarchies.map((hierarchy, index) => (
                        <CTableRow key={hierarchy.id}>
                          <CTableDataCell>{hierarchy.name}</CTableDataCell>
                          <CTableDataCell>{hierarchy.level}</CTableDataCell>
                          <CTableDataCell>{hierarchy.note}</CTableDataCell>
                          <CTableDataCell>
                            <CButton
                              color={"light"}
                              onClick={() => this.getHirarchy(hierarchy.id)}
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
                    )}
                  </CTableBody>
                </CTable>
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
            <CModalTitle>Supprimer une hierarchie</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <p>
              Voulez vous supprimer{" "}
              {this.state.hierarchies &&
                this.state.hierarchies.length > 0 &&
                this.state.id < this.state.hierarchies.length &&
                this.state.hierarchies[this.state.id].name}
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
            <CButton color="danger" onClick={() => this.deleteHierarchy()}>
              Supprimer
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
        alert: true,
      });
    else
      this.setState({
        error: "",
        hasError: false,
        alert: false,
      });
  }

  clearFields() {
    this.setState({
      name: "",
      level: "",
      note: "",
    });
  }

  setId(id) {
    this.setState({
      id,
    });
  }

  setName = (e) => {
    this.setState({
      name: e.target.value,
    });
  }

  setLevel = (e) => {
    this.setState({
      level: e.target.value,
    });
  }

  setNote = (e) => {
    this.setState({
      note: e.target.value,
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
