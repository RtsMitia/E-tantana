import React, { Component } from "react";
import Loading from "../pages/Loading";
import {
  CCard,
  CCardBody,
  CCol,
  CCardHeader,
  CRow,
  CFormInput,
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
import { CChartBar } from "@coreui/react-chartjs";
import api from "../../const/api";
export default class StatisticGlobal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date_inf: undefined,
      date_sup: undefined,
      resultType: "Graphe",
      statisticType: "Montant total",
      ready: false,
      labels: [],
      data: [],
      page: 1,
      pageNumber: 8,
      pagination: [],
      label: "Montant total en Ariary",
      color: "#3300CC",
      totalPage: 1,
    };
  }

  onChangeStatisticType = (e) => {
    this.setState({ statisticType: e.target.value });
    this.getData(
      this.state.page,
      this.state.pageNumber,
      e.target.value,
      this.state.date_inf,
      this.state.date_sup
    );
  };

  onChangeResulType = (e) => {
    this.setState({ resultType: e.target.value });
  };

  onChangeDateSup = (e) => {
    this.setState({ date_sup: e.target.value });
    this.getData(
      this.state.page,
      this.state.pageNumber,
      this.state.statisticType,
      this.state.date_inf,
      e.target.value
    );
  };

  onChangeDateInf = (e) => {
    this.setState({ date_inf: e.target.value });
    this.getData(
      this.state.page,
      this.state.pageNumber,
      this.state.statisticType,
      e.target.value,
      this.state.date_sup
    );
  };

  componentDidMount() {
    this.getData(
      this.state.page,
      this.state.pageNumber,
      this.state.statisticType,
      this.state.date_inf,
      this.state.date_sup
    );
  }

  pagination = (totalPage) => {
    let page = [];
    for (let i = 1; i <= totalPage; i++) {
      page.push(i);
    }
    this.setState({ pagination: page });
  };

  getData = (page, pageNumber, statisticType, date_inf, date_sup) => {
    let url =
      "paymentDetails/globalStatistic?page=" +
      page +
      "&pageNumber=" +
      pageNumber +
      "&statisticType=" +
      statisticType;
    if (date_inf) {
      url = url + "&date_inf=" + date_inf;
    }
    if (date_sup) {
      url = url + "&date_sup=" + date_sup;
    }
    fetch(api(url)).then((res) => {
      if (res.ok) {
        return res.json().then((res) => {
          this.pagination(res.pagination.totalPages);
          if (statisticType === "Nombres de personnes") {
            this.setState({ label: statisticType, color: "#f87979" });
          } else {
            this.setState({
              label: statisticType + " en Ariary",
              color: "#3300CC",
            });
          }
          const labels = [];
          const data = [];
          res.statistic.forEach((statistic) => {
            labels.push(statistic.year);
            data.push(Number(statistic.nb));
          });
          const max = Math.max(...data);
          data.push(max + 10);
          this.setState({
            data: data,
            labels: labels,
            page: page,
            totalPage: res.pagination.totalPages,
            ready: true,
          });
        });
      }
    });
  };

  render() {
    const { data, labels, ready, label, color } = this.state;
    if (!ready) {
      return <Loading />;
    }
    return (
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong> Statistiques globales sur les paiements </strong>
          </CCardHeader>
          <CCardBody>
            <br></br>
            <CRow>
              <CCol md={1}></CCol>
              <CCol md={4}>
                <CFormInput
                  type="date"
                  id="date_inf"
                  value={this.state.date_inf}
                  onChange={this.onChangeDateInf}
                />
              </CCol>
              <CCol md={1}> </CCol>
              <CCol md={1}> à </CCol>
              <CCol md={4}>
                <CFormInput
                  type="date"
                  id="date_sup"
                  value={this.state.date_sup}
                  onChange={this.onChangeDateSup}
                />
              </CCol>
              <CCol md={1}></CCol>
            </CRow>
            <br></br>
            <CRow className="mb-3">
              <CCol md={1}></CCol>
              <CCol md={4}>
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
              <CCol md={2}></CCol>
              <CCol md={4}>
                <CFormSelect
                  onChange={this.onChangeStatisticType}
                  value={this.state.statisticType}
                  aria-label="Default select example"
                >
                  <option value="Montant total"> -- Type de donnée -- </option>
                  <option value="Montant total"> Montant total </option>
                  <option value="Nombres de personnes">
                    {" "}
                    Nombres de personnes{" "}
                  </option>
                </CFormSelect>
              </CCol>
              <CCol md={1}></CCol>
            </CRow>

            <br></br>
            {this.state.resultType === "Graphe" && (
              <CRow>
                <CCol md={1}></CCol>
                <CCol md={10}>
                  <CChartBar
                    data={{
                      labels: labels,
                      datasets: [
                        {
                          label: label,
                          backgroundColor: color,
                          data: data,
                        },
                      ],
                    }}
                  />
                </CCol>
                <CCol md={1}></CCol>
              </CRow>
            )}
            {this.state.resultType === "Tableau" && (
              <CRow>
                <CCol md={1}></CCol>
                <CCol md={10}>
                  <CTable>
                    <CTableHead color="dark">
                      <CTableRow>
                        <CTableHeaderCell scope="col">Année</CTableHeaderCell>
                        <CTableHeaderCell scope="col">
                          {this.state.statisticType}
                        </CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {labels.map((label, index) => (
                        <CTableRow key={index}>
                          <CTableDataCell>{label} </CTableDataCell>
                          <CTableDataCell>
                            {data[index]}{" "}
                            {this.state.statisticType === "Montant total" &&
                              "AR"}
                            {this.state.statisticType !== "Montant total" &&
                              "personnes"}
                          </CTableDataCell>
                        </CTableRow>
                      ))}
                    </CTableBody>
                  </CTable>
                </CCol>
                <CCol md={1}></CCol>
              </CRow>
            )}
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
                      this.getData(
                        this.state.page - 1,
                        this.state.pageNumber,
                        this.state.statisticType,
                        this.state.date_inf,
                        this.state.date_sup
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
                          this.state.statisticType,
                          this.state.date_inf,
                          this.state.date_sup
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
                      this.state.labels.length === 0
                    }
                    onClick={() =>
                      this.getData(
                        this.state.page + 1,
                        this.state.pageNumber,
                        this.state.statisticType,
                        this.state.date_inf,
                        this.state.date_sup
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
    );
  }
}
