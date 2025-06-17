import React from "react";
import api from "../../../const/api";
import Loading from "../../pages/Loading";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
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

export default class CrudSacrement extends AdminLayout {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      ready: false,
      insertVisible: false,
      updateVisible: false,
      deletetVisible: false,
      name: "",
      note: "",
      index: 0,
      pending: false,
      error: "",
      alert: false,
    };
  }

  onChangeName = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  onChangeNote = (e) => {
    this.setState({
      note: e.target.value,
    });
  };

  pageUpdate = (index) => {
    this.setState({
      updateVisible: true,
      index: index,
      name: this.state.list[index].name,
      note: this.state.list[index].note,
    });
  };

  pageDelete = (index) => {
    this.setState({
      deleteVisible: true,
      index: index,
      name: this.state.list[index].name,
      note: this.state.list[index].note,
    });
  };

  setError = (error) => {
    this.setState({ error: error });
    if(error === "" || error === undefined){
      this.setState({alert:false})
    }
    else this.setState({alert:true})
  };

  setInsertVisible = (visible) => {
    this.clearField();
    this.setState({ insertVisible: visible });
  };

  viewPageUpdate = (visible, index) => {
    this.clearField();
    this.setState({ updateVisible: visible, index: index });
  };

  viewPageDelete = (visible, index) => {
    this.setState({ deleteVisible: visible, index: index });
  };

  getError = (index) => {
    const errors = {
      "name should not be empty": "Le champ sacrement est obligatoire.",
    };
    return errors[index];
  };

  update = (event) => {
    this.setPending(true);
    const option = {
      headers: { "Content-Type": "application/json" },
      method: "PUT",
      body: JSON.stringify({
        note: this.state.note,
        name: this.state.name,
      }),
    };
    fetch(api("sacrements/" + this.state.list[this.state.index].id), option)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then((data) => {
        this.setState({ updateVisible: false });
        this.clearField();
        this.getSacrements();
      });
    this.setPending(false);
  };

  clearField = () => {
    this.setState({ error: "", note: "", name: "", alert:false});
  };

  insert = (event) => {
    this.setPending(true);
    const option = {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        note: this.state.note,
        name: this.state.name,
      }),
    };
    fetch(api("sacrements"), option).then((res) => {
      if (res.ok) {
        return res.json().then((data) => {
          this.setState({ insertVisible: false });
          this.clearField();
          this.getSacrements();
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
    this.setPending(false);
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
    fetch(api("sacrements/" + this.state.list[this.state.index].id), option)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then((data) => {
        this.setState({ deleteVisible: false, index: 0 });
        this.clearField();
        this.getSacrements();
      });
    this.setPending(false);
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
        this.setState({ list: data });
        this.setState({ ready: true });
      });
  };

  componentDidMount() {
    this.getSacrements();
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
            <strong> Gestion des sacrements</strong>
           <span className="d-grid gap-2 d-md-flex justify-content-md-end"> <CButton onClick={() => this.props.history.push(`/sacrement/add`)}>
              <CIcon icon={cilPlus}/>Ajouter{" "}
            </CButton></span>
          </CCardHeader>
          <CCardBody>
            <CTable>
              <CTableHead color="dark">
                <CTableRow>
                  <CTableHeaderCell scope="col">Sacrement</CTableHeaderCell>
                  {/* <CTableHeaderCell scope="col">Note</CTableHeaderCell> */}
                  <CTableHeaderCell scope="col"></CTableHeaderCell>
                  <CTableHeaderCell scope="col"></CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {list.map((sacrement, index) => (
                  <CTableRow key={sacrement.id}>
                    <CTableDataCell>{sacrement.name}</CTableDataCell>
                    {/* <CTableDataCell>{sacrement.note}</CTableDataCell> */}
                    <CTableDataCell>
                      <CButton
                        color="secondary"
                        variant="outline"
                        active={true}
                        onClick={() => this.props.history.push(`/sacrement/${sacrement.id}`)}
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
              <CModalTitle>Suppression d'un sacrement</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <p className="text-medium-emphasis small">
                Voulez-vous supprimer le sacrement:{" "}
                <strong> {this.state.name} </strong> ?
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
