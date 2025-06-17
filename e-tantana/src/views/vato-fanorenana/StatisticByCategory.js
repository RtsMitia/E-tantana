import React, { Component } from "react";
import api from "../../const/api";
import Loading from "../pages/Loading";
import {
  CCard,
  CCardBody,
  CCallout,
  CCol,
  CCardHeader,
  CRow,
  CPagination,
  CPaginationItem,
  CFormSelect,
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableDataCell,
  CTableRow,
} from "@coreui/react";
import { CChartPie } from "@coreui/react-chartjs";
export default class StatisticByCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resultType: "Graphe",
      year: undefined,
      ready: false,
      statistics: [],
      page: 1,
      pageNumber: 16,
      pagination: [],
      totalPage: 1,
      hierarchy: undefined,
      activityYears: [],
      activity_year_id: undefined,
      hierarchies: [],
      hierarchy_id: undefined,
      labels: [
        " Nombres de personnes qui ont payé ",
        " Nombres de personnes qui n'ont pas encore payé",
      ],
      index_year: undefined,
      hierarchy_index: undefined,
    };
  }

  onChangeActivityYearId = (e) => {
    this.setState({ ready: false });
    if (e.target.value !== "-- Année d'activité --") {
      this.setState({
        index_year: e.target.value,
      });
      this.getData(
        this.state.page,
        this.state.pageNumber,
        this.state.activityYears[e.target.value].end_year,
        this.state.hierarchy_id,
        this.state.hierarchy
      );
    } else {
      this.setState({
        activity_year_id: undefined,
        year: undefined,
        index_year: undefined,
      });
      this.getData(
        this.state.page,
        this.state.pageNumber,
        undefined,
        this.state.hierarchy_id,
        this.state.hierarchy
      );
    }
  };

  onChangeHierarchyId = (e) => {
    this.setState({
      // hierarchy_id: this.state.hierarchies[e.target.value].id,
      // hierarchy: this.state.hierarchies[e.target.value].name,
      hierarchy_index: e.target.value,
    });
    this.setState({ ready: false });
    this.setState({
      hierarchy_index: e.target.value,
    });
    if (e.target.value !== "-- Hierarchie --") {
      this.getData(
        this.state.page,
        this.state.pageNumber,
        this.state.year,
        this.state.hierarchies[e.target.value].id,
        this.state.hierarchies[e.target.value].name
      );
    } else {
      this.setState({
        hierarchy_id: undefined,
        hierarchy: undefined,
        hierarchy_index: undefined,
      });
      this.getData(
        this.state.page,
        this.state.pageNumber,
        this.state.year,
        undefined,
        undefined
      );
    }
  };

  onChangeResulType = (e) => {
    this.setState({ resultType: e.target.value });
  };

  getActivityYears = () => {
    fetch(api("activityYears?page=1&pageNumber=100")).then((res) => {
      if (res.ok) {
        return res.json().then((data) => {
          this.setState({ activityYears: data.data });
        });
      }
    });
  };

  getHierarchies = () => {
    fetch(api("hierarchies/hierarchies"))
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then((data) => {
        this.setState({ hierarchies: data.hierarchies });
      });
  };

  componentDidMount() {
    this.getHierarchies();
    this.getActivityYears();
    this.getData(
      this.state.page,
      this.state.pageNumber,
      this.state.year,
      this.state.hierarchy_id,
      this.state.hierarchy
    );
  }

  pagination = (totalPage) => {
    let page = [];
    for (let i = 1; i <= totalPage; i++) {
      page.push(i);
    }
    this.setState({ pagination: page });
  };

  getData = (page, pageNumber, year, hierarchy_id, hierarchy) => {
    let url =
      "paymentDetails/statisticByCategory?page=" +
      page +
      "&pageNumber=" +
      pageNumber;
    if (year) {
      url = url + "&year=" + year;
    }
    if (hierarchy_id) {
      url = url + "&hierarchy_id=" + hierarchy_id + "&hierarchy=" + hierarchy;
    }
    fetch(api(url)).then((res) => {
      if (res.ok) {
        return res.json().then((data) => {
          this.pagination(data.pagination.totalPages);
          this.setState({
            statistics: data.statistic,
            page: page,
            totalPage: data.pagination.totalPages,
            hierarchy_id: hierarchy_id,
            year: year,
            hierarchy: hierarchy,
            ready: true,
          });
        });
      }
    });
  };

  render() {
    const { labels, statistics, ready, activityYears, hierarchies } =
      this.state;
    if (!ready) {
      return <Loading />;
    }
    return (
      <CRow>
        <CCol xs={12}>
          <CCallout color="info" className="bg-white">
            <center>
              <h4> Statistiques sur les paiements par {this.state.hierarchy_id && this.state.hierarchy}{" "}
                            {!this.state.hierarchy_id && "Année"} </h4>{" "}
            </center>
            <br />
            <CRow className="mb-3">
              <CCol md={2}></CCol>
              <CCol md={3}>
                <CFormSelect
                  onChange={this.onChangeResulType}
                  value={this.state.resultType}
                  aria-label="Default select example"
                >
                  <option value="Graphe"> -- Type d'affichage -- </option>
                  <option value="Graphe"> Graphe </option>
                  <option value="Tableau"> Tableau </option>
                </CFormSelect>
              </CCol>

              <CCol md={2}>
                <CFormSelect
                  onChange={this.onChangeHierarchyId}
                  value={this.state.hierarchy_index}
                  aria-label="Default select example"
                >
                  <option value={undefined}> -- Hierarchie -- </option>
                  {hierarchies.map((hierarchy, index) => (
                    <option value={index} key={index}>
                      {hierarchy.name}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
              <CCol md={3}>
                <CFormSelect
                  onChange={this.onChangeActivityYearId}
                  value={this.state.index_year}
                  aria-label="Default select example"
                >
                  <option value={undefined}> -- Année d'activité -- </option>
                  {activityYears.map((activityYear, index) => (
                    <option value={index} key={index}>
                      {activityYear.end_year}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
              <CCol md={2}></CCol>
            </CRow>
          </CCallout>
        </CCol>
        <CCol xs={12}>
          {this.state.resultType === "Graphe" && (
            <CRow>
              {statistics.map((statistic, index) => (
                <CCol md={3} key={index}>
                  <CCard className="mb-4">
                    <CCardHeader>
                      <strong> {statistic.title} </strong>
                    </CCardHeader>
                    <CCardBody>
                      <br></br>
                      <CChartPie
                        data={{
                          labels: labels,
                          datasets: [
                            {
                              data: [statistic.payé, statistic.reste],
                              backgroundColor: ["#36A2EB", "#FF0000"],
                              hoverBackgroundColor: ["#36A2EB", "#FF0000"],
                            },
                          ],
                        }}
                      />
                    </CCardBody>
                  </CCard>
                </CCol>
              ))}
              <CCol md={12}>
                <CCard className="mb-4">
                  <CCardBody>
                    <CRow>
                      <CCol md={12}>
                        <CPagination aria-label="Page navigation example">
                          {" "}
                          <CPaginationItem
                            aria-label="Previous"
                            disabled={this.state.page === 1}
                            onClick={() =>
                              this.getData(
                                this.state.page - 1,
                                this.state.pageNumber,
                                this.state.year,
                                this.state.hierarchy_id,
                                this.state.hierarchy
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
                                this.getData(
                                  page,
                                  this.state.pageNumber,
                                  this.state.year,
                                  this.state.hierarchy_id,
                                  this.state.hierarchy
                                )
                              }
                            >
                              {" "}
                              {page}{" "}
                            </CPaginationItem>
                          ))}
                          <CPaginationItem
                            aria-label="Next"
                            disabled={
                              this.state.totalPage - this.state.page === 0 ||
                              this.state.statistics.length === 0
                            }
                            onClick={() =>
                              this.getData(
                                this.state.page + 1,
                                this.state.pageNumber,
                                this.state.year,
                                this.state.hierarchy_id,
                                this.state.hierarchy
                              )
                            }
                          >
                            <span aria-hidden="true"> &raquo; </span>
                          </CPaginationItem>
                        </CPagination>
                      </CCol>
                    </CRow>
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
          )}
          {this.state.resultType === "Tableau" && (
            <CCard className="mb-4">
              <CCardBody>
                <br></br>

                <br></br>
                <CRow>
                  <CCol md={1}></CCol>
                  <CCol md={10}>
                    <CTable>
                      <CTableHead color="dark">
                        <CTableRow>
                          <CTableHeaderCell scope="col">
                            {this.state.hierarchy_id && this.state.hierarchy}{" "}
                            {!this.state.hierarchy_id && "Année"}
                          </CTableHeaderCell>
                          <CTableHeaderCell scope="col">
                            Nombre des Antilin'i Madagasikara
                          </CTableHeaderCell>
                          <CTableHeaderCell scope="col">
                            {" "}
                            qui ont payé
                          </CTableHeaderCell>
                          <CTableHeaderCell scope="col" className="text-danger">
                            {" "}
                            qui n'ont pas encore payé{" "}
                          </CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        {statistics.map((statistic, index) => (
                          <CTableRow key={index}>
                            <CTableDataCell>{statistic.title}</CTableDataCell>
                            <CTableDataCell>
                              {statistic.total} personnes
                            </CTableDataCell>
                            <CTableDataCell>
                              {statistic.payé} personnes
                            </CTableDataCell>
                            <CTableDataCell className="text-danger">
                              {statistic.reste} personnes
                            </CTableDataCell>
                          </CTableRow>
                        ))}
                      </CTableBody>
                    </CTable>
                  </CCol>
                  <CCol md={1}></CCol>
                </CRow>
                <br></br>
                <CRow>
                  <CCol md={1}></CCol>
                  <CCol md={11}>
                    <CPagination aria-label="Page navigation example">
                      {" "}
                      <CPaginationItem
                        aria-label="Previous"
                        disabled={this.state.page === 1}
                        onClick={() =>
                          this.getPayments(
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
                            this.getPayments(page, this.state.pageNumber)
                          }
                        >
                          {" "}
                          {page}{" "}
                        </CPaginationItem>
                      ))}
                      <CPaginationItem
                        aria-label="Next"
                        disabled={
                          this.state.totalPage - this.state.page === 0 ||
                          this.state.statistics.length === 0
                        }
                        onClick={() =>
                          this.getPayments(
                            this.state.page + 1,
                            this.state.pageNumber
                          )
                        }
                      >
                        <span aria-hidden="true"> &raquo; </span>
                      </CPaginationItem>
                    </CPagination>
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
          )}
        </CCol>
      </CRow>
    );
  }
}
