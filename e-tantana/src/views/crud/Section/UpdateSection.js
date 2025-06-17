import React from "react";
import api from "../../../const/api";
import Loading from "../../pages/Loading";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CAlert,
  CButton,
} from "@coreui/react";
import BackButton from "../../../components/BackButton";
import AdminLayout from "../../../layout/AdminLayout";

export default class UpdateSection extends AdminLayout {
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

  update = (event) => {
    if (
      this.checkAge(this.state.max_age) &&
      this.checkAge(this.state.min_age)
    ) {
      this.setPending(true);
      const option = {
        headers: { "Content-Type": "application/json" },
        method: "PUT",
        body: JSON.stringify({
          name: this.state.name,
          council: this.state.council,
          min_age: this.state.min_age,
          max_age: this.state.max_age,
          motto: this.state.motto,
          base: this.state.base,
          section_name: this.state.section_name,
          activity_name: this.state.activity_name,
          group_name: this.state.group_name,
          code: this.state.code,
          color: this.state.color,
          outfit_color: this.state.outfit_color,
          engagement: this.state.engagement,
          patron_saint: this.state.patron_saint,
          id: this.props.match.params.id,
        }),
      };
      fetch(api("sections/" + this.props.match.params.id), option)
        .then((res) => {
          this.setPending(false);
          if (res.ok) {
            this.setState({ updateVisible: false, infoVisible: false });
            this.clearFields();
            return res.json();
          }
        })
        .then((data) => {
          this.props.history.push(`/section`);
        });
    }
  };

  getSection = () => {
    fetch(api(`sections/${this.props.match.params.id}`))
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then((data) => {
        this.setState({
          name: data.section.name,
          code: data.section.code,
          color: data.section.color,
          min_age: data.section.min_age,
          max_age: data.section.max_age,
          section_name: data.section.section_name,
          group_name: data.section.group_name,
          motto: data.section.motto,
          activity_name: data.section.activity_name,
          outfit_color: data.section.outfit_color,
          council: data.section.council,
          patron_saint: data.section.patron_saint,
          base: data.section.base,
          engagement: data.section.engagement,
          ready: true,
        });
      });
  };

  componentDidMount() {
    this.getSection();
  }

  render() {
    const { ready } = this.state;
    if (!ready) {
      return <Loading />;
    }

    return (
      <>
        <BackButton to={"/section"} />
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader color="green">
              <strong> Modification de section </strong>
              <span className="d-grid gap-2 d-md-flex justify-content-md-end"></span>
            </CCardHeader>
            <CCardBody>
              <CForm className="row g-3">
                <CCol md={12}>
                  <CFormLabel htmlFor="inputEmail4">Section</CFormLabel>
                  <CFormInput
                    type="text"
                    value={this.state.name}
                    onChange={this.onChangeName}
                  />
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="inputPassword4">Age minimum</CFormLabel>
                  <CFormInput
                    aria-label="With textarea"
                    value={this.state.min_age}
                    onChange={this.onChangeMinAge}
                  ></CFormInput>
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="inputPassword4">Age maximum</CFormLabel>
                  <CFormInput
                    aria-label="With textarea"
                    value={this.state.max_age}
                    onChange={this.onChangeMaxAge}
                  ></CFormInput>
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="inputPassword4">Nom de code</CFormLabel>
                  <CFormInput
                    aria-label="With textarea"
                    value={this.state.code}
                    onChange={this.onChangeCode}
                  ></CFormInput>
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="inputPassword4">Code couleur</CFormLabel>
                  <CFormInput
                    aria-label="With textarea"
                    value={this.state.color}
                    onChange={this.onChangeColor}
                  ></CFormInput>
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="inputPassword4">Tenue</CFormLabel>
                  <CFormInput
                    aria-label="With textarea"
                    value={this.state.outfit_color}
                    onChange={this.onChangeOutfitColor}
                  ></CFormInput>
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="inputPassword4">
                    Nom de la categorie
                  </CFormLabel>
                  <CFormInput
                    aria-label="With textarea"
                    value={this.state.section_name}
                    onChange={this.onChangeSectionName}
                  ></CFormInput>
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="inputPassword4">
                    Nom du groupe
                  </CFormLabel>
                  <CFormInput
                    aria-label="With textarea"
                    value={this.state.group_name}
                    onChange={this.onChangeGroupName}
                  ></CFormInput>
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="inputPassword4">
                    Nom de l'activite
                  </CFormLabel>
                  <CFormInput
                    aria-label="With textarea"
                    value={this.state.activity_name}
                    onChange={this.onChangeActivityName}
                  ></CFormInput>
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="inputPassword4">Saint Patron</CFormLabel>
                  <CFormInput
                    aria-label="With textarea"
                    value={this.state.patron_saint}
                    onChange={this.onChangePatronSaint}
                  ></CFormInput>
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="inputPassword4">Concile</CFormLabel>
                  <CFormInput
                    aria-label="With textarea"
                    value={this.state.council}
                    onChange={this.onChangeCouncil}
                  ></CFormInput>
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="inputPassword4">Devise</CFormLabel>
                  <CFormInput
                    aria-label="With textarea"
                    value={this.state.motto}
                    onChange={this.onChangeMotto}
                  ></CFormInput>
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="inputPassword4">Fondement</CFormLabel>
                  <CFormInput
                    aria-label="With textarea"
                    value={this.state.base}
                    onChange={this.onChangeBase}
                  ></CFormInput>
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="inputPassword4">Engagement</CFormLabel>
                  <CFormInput
                    aria-label="With textarea"
                    value={this.state.engagement}
                    onChange={this.onChangeEngagement}
                  ></CFormInput>
                </CCol>
              </CForm>
              <br></br>
              <CAlert visible={this.state.alert} color="danger">
                <center> {this.state.error}</center>
              </CAlert>
              <br></br>
              <CButton
                color="primary"
                onClick={this.update}
                disabled={this.state.pending ? true : false}
              >
                Modifier
              </CButton>
            </CCardBody>
          </CCard>

          {/* update modal */}

          <>
            <CModal
              alignment="center"
              size="xl"
              visible={this.state.updateVisible}
              onClose={() => this.viewPageUpdate(false, this.state.index)}
            >
              <CModalHeader>
                <CModalTitle>
                  Modification de la section{" "}
                  <strong> {this.state.name} </strong>
                </CModalTitle>
              </CModalHeader>
              <CModalBody>
                <CForm className="row g-3">
                  <CCol md={12}>
                    <CFormLabel htmlFor="inputEmail4">Section</CFormLabel>
                    <CFormInput
                      type="text"
                      value={this.state.name}
                      onChange={this.onChangeName}
                    />
                  </CCol>
                  <CCol md={6}>
                    <CFormLabel htmlFor="inputPassword4">
                      Age minimum
                    </CFormLabel>
                    <CFormInput
                      aria-label="With textarea"
                      value={this.state.min_age}
                      onChange={this.onChangeMinAge}
                    ></CFormInput>
                  </CCol>
                  <CCol md={6}>
                    <CFormLabel htmlFor="inputPassword4">
                      Age maximum
                    </CFormLabel>
                    <CFormInput
                      aria-label="With textarea"
                      value={this.state.max_age}
                      onChange={this.onChangeMaxAge}
                    ></CFormInput>
                  </CCol>
                  <CCol md={4}>
                    <CFormLabel htmlFor="inputPassword4">
                      Nom de code
                    </CFormLabel>
                    <CFormInput
                      aria-label="With textarea"
                      value={this.state.code}
                      onChange={this.onChangeCode}
                    ></CFormInput>
                  </CCol>
                  <CCol md={4}>
                    <CFormLabel htmlFor="inputPassword4">
                      Code couleur
                    </CFormLabel>
                    <CFormInput
                      aria-label="With textarea"
                      value={this.state.color}
                      onChange={this.onChangeColor}
                    ></CFormInput>
                  </CCol>
                  <CCol md={4}>
                    <CFormLabel htmlFor="inputPassword4">Tenue</CFormLabel>
                    <CFormInput
                      aria-label="With textarea"
                      value={this.state.outfit_color}
                      onChange={this.onChangeOutfitColor}
                    ></CFormInput>
                  </CCol>
                  <CCol md={4}>
                    <CFormLabel htmlFor="inputPassword4">
                      Nom de la categorie
                    </CFormLabel>
                    <CFormInput
                      aria-label="With textarea"
                      value={this.state.section_name}
                      onChange={this.onChangeSectionName}
                    ></CFormInput>
                  </CCol>
                  <CCol md={4}>
                    <CFormLabel htmlFor="inputPassword4">
                      Nom du groupe
                    </CFormLabel>
                    <CFormInput
                      aria-label="With textarea"
                      value={this.state.group_name}
                      onChange={this.onChangeGroupName}
                    ></CFormInput>
                  </CCol>
                  <CCol md={4}>
                    <CFormLabel htmlFor="inputPassword4">
                      Nom de l'activite
                    </CFormLabel>
                    <CFormInput
                      aria-label="With textarea"
                      value={this.state.activity_name}
                      onChange={this.onChangeActivityName}
                    ></CFormInput>
                  </CCol>
                  <CCol md={6}>
                    <CFormLabel htmlFor="inputPassword4">
                      Saint Patron
                    </CFormLabel>
                    <CFormInput
                      aria-label="With textarea"
                      value={this.state.patron_saint}
                      onChange={this.onChangePatronSaint}
                    ></CFormInput>
                  </CCol>
                  <CCol md={6}>
                    <CFormLabel htmlFor="inputPassword4">Concile</CFormLabel>
                    <CFormInput
                      aria-label="With textarea"
                      value={this.state.council}
                      onChange={this.onChangeCouncil}
                    ></CFormInput>
                  </CCol>
                  <CCol md={4}>
                    <CFormLabel htmlFor="inputPassword4">Devise</CFormLabel>
                    <CFormInput
                      aria-label="With textarea"
                      value={this.state.motto}
                      onChange={this.onChangeMotto}
                    ></CFormInput>
                  </CCol>
                  <CCol md={4}>
                    <CFormLabel htmlFor="inputPassword4">Fondement</CFormLabel>
                    <CFormInput
                      aria-label="With textarea"
                      value={this.state.base}
                      onChange={this.onChangeBase}
                    ></CFormInput>
                  </CCol>
                  <CCol md={4}>
                    <CFormLabel htmlFor="inputPassword4">Engagement</CFormLabel>
                    <CFormInput
                      aria-label="With textarea"
                      value={this.state.engagement}
                      onChange={this.onChangeEngagement}
                    ></CFormInput>
                  </CCol>
                </CForm>
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
        </CCol>
      </>
    );
  }
}
