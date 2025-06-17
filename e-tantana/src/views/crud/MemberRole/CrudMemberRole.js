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

export default class CrudMemberRole extends AdminLayout {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      ready: false,
      insertVisible: false,
      updateVisible: false,
      deletetVisible: false,
      name: "",
      level: "",
      note: "",
      index: 0,
      pending: false,
      body: undefined,
      error: "",
      alert: false,
    };
    //  ()=>this.setInsertVisible=
  }

  setPending = (pending) => {
    this.setState({ pending: pending });
  };

  onChangeName = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  onChangeLevel = (e) => {
    this.setState({
      level: e.target.value,
    });
  };

  onChangeNote = (e) => {
    this.setState({
      note: e.target.value,
    });
  };

  setError = (error) => {
    this.setState({ error: error });
  };

  setBody = (body) => {
    this.setState({ body: body });
  };

  clearFields = () => {
    this.setState({ name: "", level: "", note: "", error: "", alert: false });
  };

  pageUpdate = (index) => {
    this.setState({
      updateVisible: true,
      index: index,
      name: this.state.list[index].name,
      level: this.state.list[index].level,
      note: this.state.list[index].note,
    });
  };

  pageDelete = (index) => {
    this.setState({
      deleteVisible: true,
      index: index,
      name: this.state.list[index].name,
      level: this.state.list[index].level,
      note: this.state.list[index].note,
    });
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

  update = (event) => {
    this.setPending(true);
    const option = {
      headers: { "Content-Type": "application/json" },
      method: "PUT",
      body: JSON.stringify({
        name: this.state.name,
        level: this.state.level,
        note: this.state.note,
      }),
    };
    fetch(
      api("memberRoles/" + this.state.list[this.state.index].id),
      option
    ).then((res) => {
      this.setPending(false);
      // console.log(res);
      if (res.ok)
        return res.json()
      else
        res.json().then((res) => {
          if (typeof res.message === typeof []) {
            this.setError(this.getError(res.message[0]));
            this.setState({ alert: true });
          } else {
            this.setError(this.getError(res.message));
            this.setState({ alert: true });

          }
        });
    })
    .then((data) => {
      this.setState({ updateVisible: false });
      this.getmemberRoles();
      this.clearFields();
    });;
  };

  getError = (index) => {
    const errors = {
      "level should not be empty": "Le champ niveau est obligatoire.",
      "name should not be empty": "Le champ role est obligatoire."
    };
    return errors[index];
  };

  insert = (event) => {
    this.setPending(true);
    const option = {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        name: this.state.name,
        level: this.state.level,
        note: this.state.note,
      }),
    };
    fetch(api("memberRoles"), option).then((res) => {
      this.setPending(false);
      if (res.ok)
        return res.json().then((data) => {
          this.setState({ insertVisible: false });
          this.clearFields();
          this.getmemberRoles();
        });
      else
        res.json().then((res) => {
          if (typeof res.message === typeof []) {
            this.setError(this.getError(res.message[0]));
            this.setState({ alert: true });
          } else {
            this.setError(this.getError(res.message));
            this.setState({ alert: true });
          }
        });
    });
  };

  delete = (event) => {
    this.setPending(true);
    const option = {
      headers: { "Content-Type": "application/json" },
      method: "DELETE",
    };
    fetch(api("memberRoles/" + this.state.list[this.state.index].id), option)
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
        this.getmemberRoles();
      });
  };

  getmemberRoles = () => {
    fetch(api("memberRoles"))
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then((data) => {
        this.setState({ list: data.memberRoles.data });
        this.setState({ ready: true });
      });
  };

  componentDidMount() {
    this.getmemberRoles();
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
            <strong> Gestion des roles des membres</strong>
            <span className="d-grid gap-2 d-md-flex justify-content-md-end"><CButton onClick={() => this.props.history.push(`/memberRole/add`)}>
              <CIcon icon={cilPlus}/>Ajouter{" "}
            </CButton></span>
          </CCardHeader>
          <CCardBody>
            <CTable>
              <CTableHead color="dark">
                <CTableRow>
                  <CTableHeaderCell scope="col">Role</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Hierarchie</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Remarque</CTableHeaderCell>
                  <CTableHeaderCell scope="col"></CTableHeaderCell>
                  <CTableHeaderCell scope="col"></CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {list.map((memberRole, index) => (
                  <CTableRow key={memberRole.id}>
                    <CTableDataCell>{memberRole.name}</CTableDataCell>
                    <CTableDataCell>{memberRole.hierarchy.name}</CTableDataCell>
                    <CTableDataCell>{memberRole.note}</CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        color="secondary"
                        variant="outline"
                        active={true}
                        onClick={() => this.props.history.push(`/memberRole/${memberRole.id}`)}
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
              <CModalTitle>Suppression d'un role</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <p className="text-medium-emphasis small">
                Voulez-vous supprimer le role:{" "}
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
