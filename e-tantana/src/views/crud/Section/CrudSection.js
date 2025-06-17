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
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilTrash, cilPencil, cilInfo, cilX, cilPlus } from "@coreui/icons";
import AdminLayout from "../../../layout/AdminLayout";

export default class CrudSection extends AdminLayout {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      ready: false,
      insertVisible: false,
      updateVisible: false,
      deletetVisible: false,
      infoVisible: false,
      name: "",
      color: "",
      min_age: 0,
      max_age: 0,
      code: "",
      pending: false,
      section_name: "",
      group_name: "",
      motto: "",
      activity_name: "",
      outfit_color: "",
      council: "",
      patron_saint: "",
      base: "",
      engagement: "",
      index: 0,
      error: "",
      alert: false,
    };
    //  ()=>this.setInsertVisible=
  }

  getError = (index) => {
    const errors = {
      "section_name should not be empty":
        "Le champ nom de la categorie est obligatoire.",
      "name should not be empty": "Le champ section est obligatoire.",
      "code should not be empty": "Le champ `nom de code` est obligatoire.",
      "outfit_color should not be empty": "Le champ tenue est obligatoire.",
      "color should not be empty": "Le champ `code couleur` est obligatoire.",
      "group_name should not be empty":
        "Le champ `nom du groupe` est obligatoire.",
      "activity_name should not be empty":
        "Le champ `nom de 'activite` est obligatoire.",
      "patron_saint should not be empty":
        "Le champ `saint Patron` est obligatoire.",
      "council should not be empty": "Le champ concile  est obligatoire.",
      "base should not be empty": "Le champ fondement est obligatoire.",
      "motto should not be empty": "Le champ devise est obligatoire.",
      "engagement should not be empty": "Le champ engagement est obligatoire.",
    };
    return errors[index];
  };

  onChangeColor = (e) => {
    this.setState({
      color: e.target.value,
    });
  };

  setError = (error) => {
    this.setState({ error: error });
  };

  onChangeMaxAge = (e) => {
    this.setState({
      max_age: e.target.value,
    });
  };

  onChangeMinAge = (e) => {
    this.setState({
      min_age: e.target.value,
    });
  };

  onChangeCode = (e) => {
    this.setState({
      code: e.target.value,
    });
  };

  onChangeSectionName = (e) => {
    this.setState({
      section_name: e.target.value,
    });
  };

  onChangeGroupName = (e) => {
    this.setState({
      group_name: e.target.value,
    });
  };

  onChangeActivityName = (e) => {
    this.setState({
      activity_name: e.target.value,
    });
  };

  onChangeOutfitColor = (e) => {
    this.setState({
      outfit_color: e.target.value,
    });
  };

  checkAge = (age) => {
    if (Number(age)) {
      if (Number(age) < 0) {
        this.setError("Age negatif");
        this.setState({ alert: true });
        return false;
      }
      return true;
    }
    this.setError(" Age invalide ");
    this.setState({ alert: true });
    return false;
  };

  onChangeCouncil = (e) => {
    this.setState({
      council: e.target.value,
    });
  };

  onChangePatronSaint = (e) => {
    this.setState({
      patron_saint: e.target.value,
    });
  };

  clearFields = () => {
    this.setState({
      name: "",
      group_name: "",
      patron_saint: "",
      section_name: "",
      color: "",
      base: "",
      engagement: "",
      outfit_color: "",
      council: "",
      motto: "",
      activity_name: "",
      max_age: 0,
      min_age: 0,
      code: "",
      error: "",
      alert: false,
    });
  };

  setInfoVisible = (visible) => {
    this.setState({ infoVisible: visible });
    this.clearFields();
  };

  onChangeBase = (e) => {
    this.setState({
      base: e.target.value,
    });
  };

  onChangeEngagement = (e) => {
    this.setState({
      engagement: e.target.value,
    });
  };

  onChangeMotto = (e) => {
    this.setState({
      motto: e.target.value,
    });
  };

  onChangeName = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  pageUpdate = (index) => {
    this.setState({
      updateVisible: true,
      index: index,
      name: this.state.list[index].name,
      group_name: this.state.list[index].group_name,
      patron_saint: this.state.list[index].patron_saint,
      section_name: this.state.list[index].section_name,
      color: this.state.list[index].color,
      base: this.state.list[index].base,
      engagement: this.state.list[index].engagement,
      outfit_color: this.state.list[index].outfit_color,
      council: this.state.list[index].council,
      motto: this.state.list[index].motto,
      activity_name: this.state.list[index].activity_name,
      max_age: this.state.list[index].max_age,
      min_age: this.state.list[index].min_age,
      code: this.state.list[index].code,
    });
  };

  pageInfo = (index) => {
    this.setState({
      infoVisible: true,
      index: index,
      name: this.state.list[index].name,
      group_name: this.state.list[index].group_name,
      patron_saint: this.state.list[index].patron_saint,
      section_name: this.state.list[index].section_name,
      color: this.state.list[index].color,
      base: this.state.list[index].base,
      engagement: this.state.list[index].engagement,
      outfit_color: this.state.list[index].outfit_color,
      council: this.state.list[index].council,
      motto: this.state.list[index].motto,
      activity_name: this.state.list[index].activity_name,
      max_age: this.state.list[index].max_age,
      min_age: this.state.list[index].min_age,
      code: this.state.list[index].code,
    });
  };

  pageDelete = (index) => {
    this.setState({
      deleteVisible: true,
      index: index,
      name: this.state.list[index].name,
    });
  };

  setInsertVisible = (visible) => {
    this.clearFields();
    this.setState({ insertVisible: visible });
  };

  viewPageUpdate = (visible, index) => {
    this.setState({ updateVisible: visible, index: index });
    this.clearFields();
    this.pageInfo(this.state.index);
  };

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
    fetch(api("sections/" + this.state.list[this.state.index].id), option)
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
          infoVisible: false,
          index: 0,
        });
        this.clearFields();
        this.getSection();
      });
  };

  getSection = () => {
    fetch(api("sections"))
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then((data) => {
        this.setState({ list: data.sections });
        this.setState({ ready: true });
        this.setState({ infoVisible: false });
      });
  };

  componentDidMount() {
    this.getSection();
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
            <strong> Gestion des sections </strong>
            <span className="d-grid gap-2 d-md-flex justify-content-md-end">
            <CButton onClick={() => this.props.history.push(`/section/add`)}>
              <CIcon icon={cilPlus}/>Ajouter{" "}
            </CButton>
            </span>
          </CCardHeader>
          <CCardBody>
            <CTable>
              <CTableHead color="dark">
                <CTableRow>
                  <CTableHeaderCell scope="col">Section</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Code</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Code couleur</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Limite d'age</CTableHeaderCell>
                  <CTableHeaderCell scope="col"></CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {list.map((section, index) => (
                  <CTableRow key={section.id}>
                    <CTableDataCell>{section.name}</CTableDataCell>
                    <CTableDataCell>{section.code}</CTableDataCell>
                    <CTableDataCell>{section.color}</CTableDataCell>
                    <CTableDataCell>
                      {section.min_age} ans - {section.max_age} ans
                    </CTableDataCell>
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
          </CCardBody>
        </CCard>

        {/* info modal */}

        <>
          <CModal
            size="lg"
            visible={this.state.infoVisible}
            onClose={() => this.setInfoVisible(false)}
          >
            <CModalHeader>
              <CModalTitle>Information</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <center>
                {" "}
                <h1> Section {this.state.name}</h1>{" "}
              </center>
              <br></br>
              <CRow>
                <CCol md={1}></CCol>
                <CCol md={5}>
                  <p>
                    <strong>Nom de code : </strong> {this.state.code}
                  </p>
                </CCol>
                <CCol md={1}></CCol>
                <CCol md={5}>
                  {" "}
                  <p>
                    <strong>Code couleur: </strong> {this.state.color}
                  </p>
                </CCol>
                <CCol md={1}></CCol>
                <CCol md={5}>
                  {" "}
                  <p>
                    <strong> Limite d'age : </strong> {this.state.min_age} -{" "}
                    {this.state.max_age}
                  </p>
                </CCol>
                <CCol md={1}></CCol>
                <CCol md={5}>
                  <p>
                    <strong>Devise: </strong> {this.state.motto}
                  </p>
                </CCol>
                <CCol md={1}></CCol>
                <CCol md={5}>
                  <p>
                    <strong>Tenue: </strong> {this.state.outfit_color}
                  </p>
                </CCol>
                <CCol md={1}></CCol>
                <CCol md={5}>
                  <p>
                    <strong>Nom de la categorie: </strong>{" "}
                    {this.state.section_name}
                  </p>
                </CCol>
                <CCol md={1}></CCol>
                <CCol md={5}>
                  <p>
                    <strong>Nom du groupe: </strong> {this.state.group_name}
                  </p>
                </CCol>
                <CCol md={1}></CCol>
                <CCol md={5}>
                  <p>
                    <strong>Nom de l'activite: </strong>{" "}
                    {this.state.activity_name}
                  </p>
                </CCol>
                <CCol md={1}></CCol>
                <CCol md={5}>
                  <p>
                    <strong>Saint patron: </strong> {this.state.patron_saint}
                  </p>
                </CCol>
                <CCol md={1}></CCol>
                <CCol md={5}>
                  <p>
                    <strong>Engagement: </strong> {this.state.engagement}
                  </p>
                </CCol>
                <CCol md={1}></CCol>
                <CCol md={5}>
                  <p>
                    <strong>Concile: </strong> {this.state.council}
                  </p>
                </CCol>
                <CCol md={1}></CCol>
                <CCol md={5}>
                  <p>
                    <strong>Fondement: </strong> {this.state.base}
                  </p>
                </CCol>
              </CRow>
            </CModalBody>
            <CModalFooter>
              <CButton
                color="secondary"
                onClick={() => this.setInfoVisible(false)}
              >
                <CIcon icon={cilX} />
                Fermer
              </CButton>
              <CButton
                color="danger"
                variant="outline"
                active={true}
                onClick={() => this.pageDelete(this.state.index)}
              >
                <CIcon icon={cilTrash} color="red" /> Supprimer
              </CButton>
              <CButton
                color="primary"
                variant="outline"
                active={true}
                onClick={() => this.props.history.push(`/section/${this.state.list[this.state.index].id}`)}
              >
                <CIcon icon={cilPencil} /> Modifier
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
              <CModalTitle>Suppression d'une section</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <p className="text-medium-emphasis small">
                Voulez-vous supprimer la section:{" "}
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
