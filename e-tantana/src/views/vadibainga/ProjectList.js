import React, { Component } from "react";
import api from "../../const/api";
import Loading from "../pages/Loading";
import Moment from "moment";
import { ProjectResponsible } from "./ProjectResponsible";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCarousel,
  CCarouselItem,
  CRow,
  CCol,
  CPagination,
  CPaginationItem,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CModal,
  CModalBody,
  CModalTitle,
  CModalHeader,
  CModalFooter,
  CButton,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {
  cibFacebookF,
  cilEnvelopeClosed,
  cilInfo,
  cilLocationPin,
  cilPhone,
} from "@coreui/icons";
export default class ProjectList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      ready: "",
      page: 1,
      pageNumber: 50,
      pagination: [],
      date_sup: undefined,
      date_inf: undefined,
      project: undefined,
      modalState: false,
      images: [],
      loading: false,
    };
  }

  invalidate = (id) => {
    this.setLoading(true);
    const option = {
      headers: { "Content-Type": "application/json" },
      method: "PUT",
    };
    fetch(api("projects/invalidate/" + id), option).then((res) => {
      this.setLoading(false);
      if (res.ok) {
        this.getProjects(this.state.page, this.state.pageNumber);
        this.setModalState(false);
      }
    });
  };

  validate = (id) => {
    this.setLoading(true);
    const option = {
      headers: { "Content-Type": "application/json" },
      method: "PUT",
    };
    fetch(api("projects/validate/" + id), option).then((res) => {
      this.setLoading(false);
      if (res.ok) {
        this.getProjects(this.state.page, this.state.pageNumber);
        this.setModalState(false);
      }
    });
  };

  numberWithSpaces(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  setLoading = (state) => {
    this.setState({
      loading: state,
    });
  };

  pagination = (totalPage) => {
    let page = [];
    for (let i = 1; i <= totalPage; i++) {
      page.push(i);
    }
    this.setState({ pagination: page });
  };

  setModalState = (visible) => {
    this.setState({ modalState: visible });
  };

  getProjectDetails = (id) => {
    this.setLoading(true);
    fetch(api("projects/" + id)).then((res) => {
      if (res.ok) {
        return res.json().then((data) => {
          this.setState(
            {
              project: data.project,
            },
            () => {
              fetch(api(`projectImages?project_id=${id}`)).then((res) => {
                if (res.ok) {
                  res.json().then((data) => {
                    this.setState(
                      { images: data.projectImages.data || [] },
                      () => {
                        this.setLoading(false);
                      }
                    );
                  });
                }
              });
            }
          );
          this.setModalState(true);
        });
      }
    });
  };

  getProjects = (page, pageNumber) => {
    fetch(
      api("projects/invalid?page=" + page + "&pageNumber=" + pageNumber)
    ).then((res) => {
      if (res.ok) {
        return res.json().then((data) => {
          this.setState({
            list: data.data,
            totalPage: data.pagination.totalPages,
            page: page,
          });
          this.pagination(data.pagination.totalPages);
          this.setState({ ready: true });
        });
      }
    });
  };

  componentDidMount() {
    this.getProjects(this.state.page, this.state.pageNumber);
  }

  pageValidation = (id) => {
    this.props.history.push("/paymentDraftDetail/" + id);
  };

  render() {
    const { list, ready } = this.state;
    if (!ready) {
      return <Loading />;
    }
    return (
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader className="text-danger">
            Les projets non validés
          </CCardHeader>
          <CCardBody>
            <CTable>
              <CTableHead color="dark">
                <CTableRow>
                  <CTableHeaderCell scope="col">Nom du projet</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Responsable</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Cible</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Financement</CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Calendrier</CTableHeaderCell>
                  <CTableHeaderCell scope="col"></CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {list.map((project, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell>{project.title}</CTableDataCell>
                    <CTableDataCell>{project.responsible_name}</CTableDataCell>
                    <CTableDataCell>{project.target_name}</CTableDataCell>
                    <CTableDataCell>{project.total_finances} Ar</CTableDataCell>
                    <CTableDataCell>
                      {Moment(project.start_date).format("D/MM/y")} à{" "}
                      {Moment(project.end_date).format("D/MM/y")}
                    </CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        color="secondary"
                        variant="outline"
                        active={true}
                        onClick={() => this.getProjectDetails(project.id)}
                      >
                        <CIcon icon={cilInfo} /> Voir les details
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
                  this.getProjects(this.state.page - 1, this.state.pageNumber)
                }
              >
                <span aria-hidden="true">&laquo;</span>
              </CPaginationItem>
              {this.state.pagination.map((page, index) => (
                <CPaginationItem
                  key={index}
                  active={page === this.state.page}
                  onClick={() => this.getProjects(page, this.state.pageNumber)}
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
                  this.getProjects(this.state.page + 1, this.state.pageNumber)
                }
              >
                <span aria-hidden="true"> &raquo; </span>
              </CPaginationItem>
            </CPagination>
          </CCardBody>
        </CCard>

        {/* info modal */}

        <>
          <CModal
            // alignment="center"
            size="xl"
            visible={this.state.modalState}
            onClose={() => this.setModalState(false)}
          >
            <CModalHeader>
              <CModalTitle>
                Details du projet{" "}
                {this.state.project && this.state.project.title}
              </CModalTitle>
            </CModalHeader>
            <CModalBody>
              {this.state.project && (
                <div className="margin-left">
                  <CRow className="mb-3">
                    <h1 style={{ textAlign: "center" }}>
                      {this.state.project.title}
                    </h1>
                    <small className="" style={{ textAlign: "center" }}>
                      par {this.state.project.responsible_name}
                    </small>
                    <small className="" style={{ textAlign: "center" }}>
                      <CIcon icon={cilPhone} />{" "}
                      {`${this.state.project.responsible_contact}`} -{" "}
                      <CIcon icon={cilEnvelopeClosed} />{" "}
                      {`${this.state.project.responsible_mail}`} -{" "}
                      {this.state.project.responsible_facebook && (
                        <CIcon icon={cibFacebookF} />
                      )}{" "}
                      {`${this.state.project.responsible_facebook || ""}`}
                    </small>
                  </CRow>
                  <CRow className="mb-3">
                    <CCarousel controls transition="crossfade">
                      {this.state.images &&
                        this.state.images.map((image) => (
                          <CCarouselItem key={image.id}>
                            <img
                              className="d-block w-100"
                              src={`https://${process.env.REACT_APP_AWS_BUCKET_NAME}.s3.amazonaws.com
                    /${image.name}?X-Amz-Expires=86400&X-Amz-Date=20220927T083704Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=${process.env.REACT_APP_ACCESS_KEY}%2F20220927%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=a0a2b57201eb4d5869296d366f608b7841a9039276a19562dd0b09772ade8dce`}
                              alt={this.state.project.title}
                            />
                          </CCarouselItem>
                        ))}
                    </CCarousel>
                  </CRow>
                  <CRow>
                    <h2>Le projet</h2>
                    <p>{this.state.project.summary}</p>
                  </CRow>
                  <CRow>
                    <h2>
                      <CIcon icon={cilLocationPin} size="xl" /> Ou le projet se
                      mettra en place
                    </h2>
                    <p>
                      {this.state.project.project_target &&
                        `${this.state.project.project_target.name} - ${this.state.project.target_name}`}
                    </p>
                  </CRow>
                  <CRow>
                    <h2>Contexte</h2>
                    <p>{this.state.project.context}</p>
                  </CRow>
                  <CRow>
                    <h2>Les principaux problèmes</h2>
                    <p>{this.state.project.problematics}</p>
                  </CRow>
                  <CRow>
                    <CCol>
                      <h2>Résultats voulu</h2>
                      <ol>
                        {this.state.project.projectResults &&
                          this.state.project.projectResults.map((pr) => (
                            <li key={pr.id}>{pr.name}</li>
                          ))}
                      </ol>
                    </CCol>
                    <CCol>
                      <h2>Changements attendus</h2>
                      <ol>
                        {this.state.project.projectGoals &&
                          this.state.project.projectGoals.map((pg) => (
                            <li key={pg.id}>{pg.name}</li>
                          ))}
                      </ol>
                    </CCol>
                  </CRow>
                  <CRow>
                    <h2>Profits</h2>
                    <h3>Pour les membres du scout</h3>
                    <p>{this.state.project.group_profit}</p>
                    <h3>Pour les autres personnes</h3>
                    <p>{this.state.project.others_profit}</p>
                    <h3>Les bénéficiaires</h3>
                    <ul>
                      <li>
                        Bénéficiaires directs:{" "}
                        {this.state.project.direct_benefactor}
                      </li>
                      <li>
                        Bénéficiaires indirects:{" "}
                        {this.state.project.indirect_benefactor}
                      </li>
                      <li>
                        Scouts bénéficiaires:{" "}
                        {this.state.project.scout_benefactor}
                      </li>
                      <li>
                        Non scouts bénéficiaires:{" "}
                        {this.state.project.non_scout_benefactor}
                      </li>
                    </ul>
                  </CRow>
                  <CRow>
                    <h2>Comment le project durera au long terme</h2>
                    <p>{this.state.project.durability_plan}</p>
                  </CRow>
                  <CRow>
                    <h2>Déroulement du projet</h2>
                    <p>
                      Date de début:{" "}
                      {Moment(this.state.project.start_date).format(
                        "D/MM/yyyy"
                      )}
                    </p>
                    <p>
                      Date de fin:{" "}
                      {Moment(this.state.project.end_date).format("D/MM/yyyy")}
                    </p>
                  </CRow>
                  <CRow>
                    <h2>
                      Les activités qui composeront le projet et les dépenses
                      correspondantes
                    </h2>
                    <ul>
                      {this.state.project.projectActivities &&
                        this.state.project.projectActivities.map((pa) => (
                          <li key={pa.id}>
                            {pa.name}
                            <p>{pa.detail}</p>
                            <CTable>
                              <CTableHead>
                                <CTableRow>
                                  <CTableHeaderCell scope="col">
                                    Outil
                                  </CTableHeaderCell>
                                  <CTableHeaderCell scope="col">
                                    Prix
                                  </CTableHeaderCell>
                                </CTableRow>
                              </CTableHead>
                              <CTableBody>
                                {pa.projectTools &&
                                  pa.projectTools.map((pt) => (
                                    <CTableRow key={pt.id}>
                                      <CTableDataCell>{pt.name}</CTableDataCell>
                                      <CTableDataCell>
                                        {this.numberWithSpaces(pt.amount)} Ar
                                      </CTableDataCell>
                                    </CTableRow>
                                  ))}
                              </CTableBody>
                            </CTable>
                          </li>
                        ))}
                    </ul>
                    <p>{/* <b>Total: </b>xxx Ar */}</p>
                  </CRow>
                  <CRow>
                    <h2>Les responsables du projet</h2>
                    {this.state.project.projectManagers &&
                      this.state.project.projectManagers.map((pm) => (
                        <ProjectResponsible key={pm.id} data={pm} />
                      ))}
                  </CRow>
                  <CRow>
                    <h2>Participants du projet</h2>
                    <ul>
                      <li>
                        Responsables: {this.state.project.responsible_number}
                      </li>
                      <li>Scout: {this.state.project.participants_number}</li>
                      <li>
                        Autres: {this.state.project.other_participants_number}
                      </li>
                      <b>Total: </b>
                      {this.state.project.responsible_number +
                        this.state.project.participants_number +
                        this.state.project.other_participants_number}
                    </ul>
                  </CRow>
                  <CRow>
                    <h2>Partenaires</h2>
                    <ul>
                      {this.state.project.projectPartners &&
                        this.state.project.projectPartners.map((pp) => (
                          <li key={pp.id}>
                            <b>{pp.name}</b>
                            <p>{pp.partnership_purpose}</p>
                          </li>
                        ))}
                    </ul>
                  </CRow>
                  <CRow>
                    <h2>Financement du projet</h2>
                    <p>
                      {this.numberWithSpaces(this.state.project.total_finances)}{" "}
                      Ar
                    </p>
                  </CRow>{" "}
                </div>
              )}
            </CModalBody>
            <CModalFooter>
              <CButton
                color="secondary"
                onClick={() => this.setModalState(false)}
              >
                Fermer
              </CButton>
              <CButton
                color="success"
                onClick={() => this.validate(this.state.project.id)}
                disabled={this.state.loading ? true : false}
              >
                Valider ce projet
              </CButton>
              <CButton
                color="danger"
                onClick={() => this.invalidate(this.state.project.id)}
                disabled={this.state.loading ? true : false}
              >
                Invalider ce projet
              </CButton>
            </CModalFooter>
          </CModal>
        </>
      </CCol>
    );
  }
}
