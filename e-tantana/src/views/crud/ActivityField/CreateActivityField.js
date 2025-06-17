import React from "react";
import api from "../../../const/api";
import {
  CCard,
  CCardBody,
  CAlert,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CButton,
  CFormSelect,
} from "@coreui/react";
import BackButton from "../../../components/BackButton";
import AdminLayout from "../../../layout/AdminLayout";

export default class CreateActivityField extends AdminLayout {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      hierarchies: [],
      hierarchy: -1,
      activityFieldsSup: [],
      superior: 0,
      name: "",
      number: "",
      alert: false,
      error: "",
      pending: false,
      entity: "",
      loggedHierarchy: "",
      loggedActivityField: null,
    };
  }

  componentDidMount() {
    this.getActivityField();
    this.getHierarchies();
  }

  setLoading(value) {
    this.setState({ loading: value });
  }

  getActivityField = () => {
    this.setLoading(true);
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
            this.setLoading(false);
          }
        );
      });
  };

  getActivityFields = () => {
    fetch(
      api(
        `activityFields?page=1&pageNumber=1000&hierarchy_id=${
          this.state.hierarchies[this.state.hierarchy].id - 1
        }`
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
          activityFieldsSup: data.activityFields.data,
        });
      });
  };

  getHierarchies() {
    this.setLoading(true);
    fetch(api("hierarchies")).then((res) => {
      if (res.ok)
        res.json().then((data) => {
          if (data && data.hierarchies) {
            data.hierarchies = data.hierarchies.filter((v) => {
              if (v.name === "Nasionaly") return false;
              if (
                this.state.loggedHierarchy === "Diosezy" &&
                v.name === "Diosezy"
              )
                return false;
              if (
                this.state.loggedHierarchy === "Faritra" ||
                this.state.loggedHierarchy === "Fivondronana"
              )
                return false;
              else return true;
            });
            this.setState({
              hierarchies: data.hierarchies,
            });
          }
        });
      this.setLoading(false);
    });
  }

  onChangeHierarchy = (e) => {
    this.setState(
      {
        hierarchy: +e.target.value,
        entity: this.state.hierarchies[+e.target.value].name.toLowerCase(),
      },
      this.getActivityFields
    );
  };

  onChangeSuperior = (e) => {
    this.setState({
      superior: e.target.value,
    });
  };

  onChangeEntity = (e) => {
    this.setState({
      entity: e.target.value,
    });
  };

  onChangeName = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  onChangeNumber = (e) => {
    this.setState({
      number: e.target.value,
    });
  };

  setError = (error) => {
    this.setState({ error: error });
    if (error !== undefined || error !== "") {
      this.setState({ alert: true });
    } else {
      this.setState({ alert: false });
    }
  };

  checkFields = () => {
    if (this.state.hierarchy === -1) {
      this.setError("Le champ hierarchie est obligatoire.");
      return false;
    }
    if (this.state.superior === 0) {
      this.setError("Le champ lieud'activité supérieur est obligatoire.");
      return false;
    }
    if (this.state.name === "") {
      this.setError("Le champ nom est obligatoire.");
      return false;
    }
    if (this.state.number === "") {
      this.setError("Le champ numero est obligatoire.");
      return false;
    }
    if (this.state.entity === "") {
      this.setError("Le champ entité est obligatoire.");
      return false;
    }
    return true;
  };

  setPending(value) {
    this.setState({ pending: value });
  }

  insert = () => {
    if (this.checkFields()) {
      this.setPending(true);
      const option = {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({
          number: this.state.number,
          name: this.state.name,
          place: this.state.name,
          entity: this.state.entity,
          superior_field: this.state.superior,
          hierarchy_id: this.state.hierarchies[this.state.hierarchy].id,
        }),
      };
      fetch(api("activityFields"), option).then((res) => {
        this.setPending(false);
        if (res.ok) {
          this.props.history.push(`/activityField`);
        } else {
          res.json().then((res) => {
            if (typeof res.message === typeof []) {
              this.setError(res.message[0]);
            } else {
              this.setError(res.message);
            }
          });
        }
      });
    }
  };

  render() {
    return (
      <>
        <BackButton to={"/activityField"} />
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader color="green">
              <strong>Ajout de lieu d'activité</strong>
              <span className="d-grid gap-2 d-md-flex justify-content-md-end"></span>
            </CCardHeader>
            <CCardBody>
              <CForm className="row g-3">
                <div className="mb-3">
                  <CFormLabel htmlFor="hierarchy">
                    Hierarchie (Rafitra)
                  </CFormLabel>
                  <CFormSelect
                    id="hierarchy"
                    onChange={(e) => this.onChangeHierarchy(e)}
                    value={this.state.hierarchy}
                  >
                    <option>Selectionner une hierarchie</option>
                    {this.state.hierarchies.map((hierarchy, index) => (
                      <option value={index} key={index}>
                        {hierarchy.name}
                      </option>
                    ))}
                  </CFormSelect>
                </div>
              </CForm>
              <CForm className="row g-3">
                <div className="mb-3">
                  <CFormLabel htmlFor="superior">
                    Lieu d'activité supérieur
                  </CFormLabel>
                  <CFormSelect
                    id="superior"
                    onChange={(e) => this.onChangeSuperior(e)}
                    value={this.state.superior}
                  >
                    <option>Selectionner un lieu d'activité</option>
                    {this.state.activityFieldsSup.map((af, index) => (
                      <option value={af.id} key={index}>
                        {af.name}
                      </option>
                    ))}
                  </CFormSelect>
                </div>
                <div className="mb-3">
                  <CFormLabel htmlFor="name">Nom</CFormLabel>
                  <CFormInput
                    id="name"
                    type="text"
                    value={this.state.name}
                    onChange={this.onChangeName}
                    required
                  />
                </div>
                <div className="mb-3">
                  <CFormLabel htmlFor="number">Numero</CFormLabel>
                  <CFormInput
                    id="number"
                    type="text"
                    value={this.state.number}
                    onChange={this.onChangeNumber}
                    required
                  />
                </div>
                <div className="mb-3">
                  <CFormLabel htmlFor="number">
                    Entité (Diosezy, Faritra, Fivondronana, Fianarana,
                    Fiangonana, ...)
                  </CFormLabel>
                  <CFormInput
                    id="number"
                    type="text"
                    value={this.state.entity}
                    onChange={this.onChangeEntity}
                    required
                  />
                </div>
              </CForm>
              <br></br>
              {/* <p className="text-muted">* champs non-obligatoires</p> */}
              <CAlert visible={this.state.alert} color="danger">
                <center> {this.state.error}</center>
              </CAlert>
              <br></br>
              <CButton
                color="primary"
                onClick={this.insert}
                disabled={this.state.pending ? true : false}
              >
                Ajouter
              </CButton>
            </CCardBody>
          </CCard>
        </CCol>
      </>
    );
  }
}
