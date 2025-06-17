import React, { Component } from "react";
import api from "../../const/api";
import Loading from "../pages/Loading";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CAlert,
  CPagination,
  CPaginationItem,
  CForm,
  CFormInput,
  CFormSelect,
  CFormLabel,
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
import { cilTrash, cilPencil, cilCheck, cilPlus } from "@coreui/icons";
export default class MembershipFee extends Component {
  user = JSON.parse(sessionStorage.getItem("user"));

  constructor(props) {
    super(props);
    this.state = {
      list: [],
      ready: false,
      insertVisible: false,
      updateVisible: false,
      deletetVisible: false,
      validationVisible: false,
      hierarchy: undefined,
      hierarchy_id: undefined,
      fee_type_id: "",
      fee_type: undefined,
      activity_year: undefined,
      activity_year_id: "",
      member_role_id: "",
      section_id: undefined,
      section: undefined,
      member_role: undefined,
      memberRoles: [],
      hierarchies: [],
      activityYears: [],
      sections: [],
      feeTypes: [],
      index: 0,
      pending: false,
      error: "",
      alert: false,
      amount: "",
      status: "",
      page: 1,
      pageNumber: 10,
      pagination: [],
    };
  }

  clearField = () => {
    this.setState({
      insertVisible: false,
      updateVisible: false,
      deletetVisible: false,
      validationVisible: false,
      hierarchy: undefined,
      hierarchy_id: "",
      fee_type_id: "",
      fee_type: undefined,
      activity_year: undefined,
      activity_year_id: "",
      member_role_id: "",
      member_role: undefined,
      index: 0,
      pending: false,
      error: "",
      amount: "",
      status: "",
    });
  };

  onChangeFeeTypeId = (e) => {
    this.setState({
      fee_type_id: e.target.value,
    });
  };

  onChangeMemberRoleId = (e) => {
    this.setState({
      member_role_id: this.state.memberRoles[e.target.value].id,
    });
    this.setState({
      hierarchy_id: this.state.memberRoles[e.target.value].hierarchy_id,
    });
  };

  onChangeHierarchyId = (e) => {
    this.setState({
      hierarchy_id: e.target.value,
    });
  };

  onChangeSectionId = (e) => {
    this.setState({ section_id: e.target.value });
  };

  onChangeActivityYearId = (e) => {
    this.setState({
      activity_year_id: e.target.value,
    });
  };

  onChangeAmount = (e) => {
    this.setState({
      amount: e.target.value,
    });
  };

  getSections = () => {
    fetch(api("sections"))
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then((data) => {
        this.setState({ sections: data.sections });
      });
  };

  getHierarchies() {
    fetch(api("hierarchies")).then((res) => {
      if (res.ok)
        res.json().then((data) => {
          if (data && data.hierarchies)
            this.setState({
              hierarchies: data.hierarchies,
            });
        });
    });
  }

  getMemberRoles = () => {
    fetch(api("memberRoles")).then((res) => {
      if (res.ok) {
        return res.json().then((data) => {
          this.setState({ memberRoles: data.memberRoles.data });
        });
      }
    });
  };

  getMembershipFees = (page, pageNumber) => {
    fetch(
      api(
        "membershipFees?page=" +
          Number(page) +
          "&pageNumber=" +
          Number(pageNumber)
      )
    ).then((res) => {
      if (res.ok) {
        return res.json().then((data) => {
          this.setState({
            list: data.membershipFees.data,
            totalPage: data.membershipFees.pagination.totalPages,
            page: page,
          });
          this.pagination(data.membershipFees.pagination.totalPages);
          this.setState({ ready: true });
        });
      }
    });
  };

  pagination = (totalPage) => {
    let page = [];
    for (let i = 1; i <= totalPage; i++) {
      page.push(i);
    }
    this.setState({ pagination: page });
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

  getFeeTypes = () => {
    fetch(api("feeTypes")).then((res) => {
      if (res.ok) {
        return res.json().then((data) => {
          this.setState({ feeTypes: data });
        });
      }
    });
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

  viewPageValidation = (visible, index) => {
    this.setState({ validationVisible: visible, index: index });
  };

  pageUpdate = (index) => {
    this.setState({
      updateVisible: true,
      index: index,
      activityYear: this.state.list[index].activityYear,
      hierarchy: this.state.list[index].hierarchy,
      memberRole: this.state.list[index].memberRole,
      section: this.state.list[index].section,
      feeType: this.state.list[index].feeType,
      amount: this.state.list[index].amount,
      activity_year_id: this.state.list[index].activity_year_id,
      hierarchy_id: this.state.list[index].hierarchy_id,
      section_id: this.state.list[index].section_id,
      member_role_id: this.state.list[index].member_role_id,
      fee_type_id: this.state.list[index].fee_type_id,
    });
  };

  pageDelete = (index) => {
    this.setState({
      deleteVisible: true,
      index: index,
      activityYear: this.state.list[index].activityYear,
      hierarchy: this.state.list[index].hierarchy,
      memberRole: this.state.list[index].memberRole,
      amount: this.state.list[index].amount,
    });
  };

  pageValidation = (index) => {
    this.setState({
      validationVisible: true,
      index: index,
      activityYear: this.state.list[index].activityYear,
      hierarchy: this.state.list[index].hierarchy,
      memberRole: this.state.list[index].memberRole,
      amount: this.state.list[index].amount,
    });
  };

  delete = () => {
    this.setPending(true);
    const option = {
      headers: { "Content-Type": "application/json" },
      method: "DELETE",
    };
    fetch(api("membershipFees/" + this.state.list[this.state.index].id), option)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then((data) => {
        this.setState({ deleteVisible: false, index: 0 });
        this.clearField();
        this.getMembershipFees(this.state.page, this.state.pageNumber);
      });
    this.setPending(false);
  };

  validation = () => {
    this.setPending(true);
    const option = {
      headers: { "Content-Type": "application/json" },
      method: "PUT",
    };
    fetch(
      api("membershipFees/validation/" + this.state.list[this.state.index].id),
      option
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then((data) => {
        this.setState({ validationVisible: false, index: 0 });
        this.clearField();
        this.getMembershipFees(this.state.page, this.state.pageNumber);
      });
    this.setPending(false);
  };

  insert = () => {
    this.setPending(true);
    const option = {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        hierarchy_id: this.state.hierarchy_id,
        section_id: this.state.section_id,
        member_role_id: this.state.member_role_id,
        activity_year_id: this.state.activity_year_id,
        fee_type_id: this.state.fee_type_id,
        amount: this.state.amount,
      }),
    };
    fetch(api("membershipFees"), option).then((res) => {
      if (res.ok) {
        return res.json().then((data) => {
          this.setState({ insertVisible: false });
          this.clearField();
          this.getMembershipFees(this.state.page, this.state.pageNumber);
        });
      } else {
        res.json().then((res) => {
          if (typeof res.message === typeof []) {
            this.setError(this.getError(res.message[0]));
            this.setState({ alert: true });
          } else {
            this.setError(this.getError(res.message));
            this.setState({ alert: true });
          }
        });
      }
    });
    this.setPending(false);
  };

  update = () => {
    this.setPending(true);
    const option = {
      headers: { "Content-Type": "application/json" },
      method: "PUT",
      body: JSON.stringify({
        hierarchy_id: this.state.hierarchy_id,
        section_id: this.state.section_id,
        member_role_id: this.state.member_role_id,
        activity_year_id: this.state.activity_year_id,
        fee_type_id: this.state.fee_type_id,
        amount: this.state.amount,
      }),
    };
    fetch(
      api("membershipFees/" + this.state.list[this.state.index].id),
      option
    ).then((res) => {
      if (res.ok) {
        return res.json().then((data) => {
          this.setState({ updateVisible: false });
          this.clearField();
          this.getMembershipFees(this.state.page, this.state.pageNumber);
        });
      } else {
        res.json().then((res) => {
          if (typeof res.message === typeof []) {
            this.setError(this.getError(res.message[0]));
            this.setState({ alert: true });
          } else {
            this.setError(this.getError(res.message));
            this.setState({ alert: true });
          }
        });
      }
    });
    this.setPending(false);
  };

  setError = (error) => {
    this.setState({ error: error });
  };

  setPending = (pending) => {
    this.setState({ pending: pending });
  };

  getError = (index) => {
    const errors = {
      "fee_type_id should not be empty":
        "Vous devez selectionner un type de frais.",
      "member_role_id should not be empty": "Vous devez selectionner un role.",
      "amount should not be empty": "Le champ montant est obligatoire.",
      "activity_year_id should not be empty":
        "Vous devez selectionner une annee d'activite.",
    };
    return errors[index];
  };

  componentDidMount() {
    this.getSections();
    this.getHierarchies();
    this.getMemberRoles();
    this.getActivityYears();
    this.getFeeTypes();
    this.getMembershipFees(this.state.page, this.state.pageNumber);
  }

  render() {
    const {
      list,
      ready,
      sections,
      feeTypes,
      activityYears,
      hierarchies,
      memberRoles,
    } = this.state;
    if (!ready) {
      return <Loading />;
    }
    return (
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader color="green">
            <strong> Gestion des tarifs par année d'activité</strong>
            <span className="d-grid gap-2 d-md-flex justify-content-md-end">
              {" "}
              {1 <= this.user.accountType && (
                <CButton onClick={() => this.setInsertVisible(true)}>
                  <CIcon icon={cilPlus} /> Ajouter{" "}
                </CButton>
              )}
            </span>
          </CCardHeader>
          <CCardBody>
            <CTable>
              <CTableHead color="dark">
                <CTableRow>
                  <CTableHeaderCell scope="col">Role</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Section</CTableHeaderCell>
                  <CTableHeaderCell scope="col">
                    Type de Frais{" "}
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col">
                    {" "}
                    Année d'activité
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Montant</CTableHeaderCell>
                  {1 <= this.user.accountType && (
                    <CTableHeaderCell scope="col"> Statut </CTableHeaderCell>
                  )}
                  <CTableHeaderCell scope="col"> </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {list.map((membershipFee, index) => (
                  <CTableRow key={membershipFee.id}>
                    <CTableDataCell>
                      {membershipFee.memberRole &&
                        membershipFee.memberRole.name}
                    </CTableDataCell>
                    <CTableDataCell>
                      {membershipFee.section && membershipFee.section.name}
                    </CTableDataCell>
                    <CTableDataCell>
                      {membershipFee.feeType && membershipFee.feeType.name}
                    </CTableDataCell>
                    <CTableDataCell>
                      {membershipFee.activityYear &&
                        membershipFee.activityYear.start_year}{" "}
                      -{" "}
                      {membershipFee.activityYear &&
                        membershipFee.activityYear.end_year}
                    </CTableDataCell>
                    <CTableDataCell>{membershipFee.amount} Ar</CTableDataCell>
                    {1 <= this.user.accountType &&
                      membershipFee.status === "1" && (
                        <CTableDataCell className="text-success">
                          Validé{" "}
                        </CTableDataCell>
                      )}
                    {membershipFee.status === "0" && (
                      <CTableDataCell className="text-danger">
                        {" "}
                        Non validé
                      </CTableDataCell>
                    )}

                    <CTableDataCell>
                      {1 <= this.user.accountType && (
                        <CButton
                          color="danger"
                          variant="outline"
                          active={true}
                          onClick={() => this.pageDelete(index)}
                        >
                          <CIcon icon={cilTrash} color="red" /> Supprimer
                        </CButton>
                      )}
                    </CTableDataCell>
                    <CTableDataCell>
                      {membershipFee.status === "0" && (
                        <CButton
                          color="secondary"
                          variant="outline"
                          active={true}
                          onClick={() => this.pageUpdate(index)}
                        >
                          <CIcon icon={cilPencil} /> Modifier
                        </CButton>
                      )}
                    </CTableDataCell>
                    <CTableDataCell>
                      {membershipFee.status === "0" && (
                        <CButton
                          color="success"
                          variant="outline"
                          active={true}
                          onClick={() => this.pageValidation(index)}
                        >
                          <CIcon icon={cilCheck} /> Valider
                        </CButton>
                      )}
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
                  this.getMembershipFees(
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
                    this.getMembershipFees(page, this.state.pageNumber)
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
                  list.length === 0
                }
                onClick={() =>
                  this.getMembershipFees(
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

        {/* update modal */}
        <>
          <CModal
            alignment="center"
            size="xl"
            visible={this.state.updateVisible}
            onClose={() => this.viewPageUpdate(false, this.state.index)}
          >
            <CModalHeader>
              <CModalTitle>Modification d'un tarif</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CForm className="row g-3">
                <CCol md={6}>
                  <CFormLabel htmlFor="inputEmail4"> Role </CFormLabel>
                  <CFormSelect
                    value={this.state.member_role_id}
                    onChange={this.onChangeMemberRoleId}
                    aria-label="Default select example"
                  >
                    <option>--Role--</option>
                    {memberRoles.map((memberRole, index) => (
                      <option key={index} value={memberRole.id}>
                        {memberRole.name}
                      </option>
                    ))}
                  </CFormSelect>
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="inputPassword4">Hierarchie</CFormLabel>
                  <CFormSelect
                    value={this.state.hierarchy_id}
                    onChange={this.onChangeHierarchyId}
                    aria-label="Default select example"
                  >
                    <option>--Hierarchie--</option>
                    {hierarchies.map((hierarchy, index) => (
                      <option key={index} value={hierarchy.id}>
                        {hierarchy.name}
                      </option>
                    ))}
                  </CFormSelect>
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="inputEmail4"> Section </CFormLabel>
                  <CFormSelect
                    value={this.state.section_id}
                    onChange={this.onChangeSectionId}
                    aria-label="Default select example"
                  >
                    <option>--Section--</option>
                    {sections.map((section, index) => (
                      <option key={index} value={section.id}>
                        {section.name}
                      </option>
                    ))}
                  </CFormSelect>
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="inputEmail4"> Type de frais </CFormLabel>
                  <CFormSelect
                    value={this.state.fee_type_id}
                    onChange={this.onChangeFeeTypeId}
                    aria-label="Default select example"
                  >
                    <option>--type de frais--</option>
                    {feeTypes.map((feeType, index) => (
                      <option key={index} value={feeType.id}>
                        {feeType.name}
                      </option>
                    ))}
                  </CFormSelect>
                </CCol>
                <CCol md={12}>
                  <CFormLabel htmlFor="inputPassword4">
                    Année d'activité
                  </CFormLabel>
                  <CFormSelect
                    value={this.state.activity_year_id}
                    onChange={this.onChangeActivityYearId}
                    aria-label="Default select example"
                  >
                    <option>--Année d'activité--</option>
                    {activityYears.map((activityYear, index) => (
                      <option key={index} value={activityYear.id}>
                        {activityYear.start_year} - {activityYear.end_year}
                      </option>
                    ))}
                  </CFormSelect>
                </CCol>
                <CCol md={12}>
                  <CFormLabel htmlFor="inputPassword4">Montant</CFormLabel>
                  <CFormInput
                    type="text"
                    value={this.state.amount}
                    onChange={this.onChangeAmount}
                  />
                </CCol>
              </CForm>
              <br></br>
              <CAlert visible={this.state.alert} color="danger">
                <center> {this.state.error}</center>
              </CAlert>
              <br></br>
            </CModalBody>
            <CModalFooter>
              <CButton
                color="secondary"
                onClick={() => this.viewPageUpdate(false, this.state.index)}
              >
                Fermer
              </CButton>
              <CButton
                color="primary"
                onClick={() => this.update()}
                disabled={this.state.pending ? true : false}
              >
                Modifier
              </CButton>
            </CModalFooter>
          </CModal>
        </>

        {/* insert modal */}

        <>
          <CModal
            alignment="center"
            size="xl"
            visible={this.state.insertVisible}
            onClose={() => this.setInsertVisible(false)}
          >
            <CModalHeader>
              <CModalTitle>Ajout d'un tarif</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CForm className="row g-3">
                <CCol md={12}>
                  <CFormLabel htmlFor="inputEmail4"> Role </CFormLabel>
                  <CFormSelect
                    // value={this.state.member_role_id}
                    onChange={this.onChangeMemberRoleId}
                    aria-label="Default select example"
                  >
                    <option>--Role--</option>
                    {memberRoles.map((memberRole, index) => (
                      <option key={index} value={index}>
                        {memberRole.name}
                      </option>
                    ))}
                  </CFormSelect>
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="inputEmail4"> Section </CFormLabel>
                  <CFormSelect
                    value={this.state.section_id}
                    onChange={this.onChangeSectionId}
                    aria-label="Default select example"
                  >
                    <option>--Section--</option>
                    {sections.map((section, index) => (
                      <option key={index} value={section.id}>
                        {section.name}
                      </option>
                    ))}
                  </CFormSelect>
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="inputEmail4"> Type de frais </CFormLabel>
                  <CFormSelect
                    value={this.state.fee_type_id}
                    onChange={this.onChangeFeeTypeId}
                    aria-label="Default select example"
                  >
                    <option>--type de frais--</option>
                    {feeTypes.map((feeType, index) => (
                      <option key={index} value={feeType.id}>
                        {feeType.name}
                      </option>
                    ))}
                  </CFormSelect>
                </CCol>
                <CCol md={12}>
                  <CFormLabel htmlFor="inputPassword4">
                    Année d'activité
                  </CFormLabel>
                  <CFormSelect
                    value={this.state.activity_year_id}
                    onChange={this.onChangeActivityYearId}
                    aria-label="Default select example"
                  >
                    <option>--Année d'activité--</option>
                    {activityYears.map((activityYear, index) => (
                      <option key={index} value={activityYear.id}>
                        {activityYear.start_year} - {activityYear.end_year}
                      </option>
                    ))}
                  </CFormSelect>
                </CCol>
                <CCol md={12}>
                  <CFormLabel htmlFor="inputPassword4">Montant</CFormLabel>
                  <CFormInput
                    type="text"
                    value={this.state.amount}
                    onChange={this.onChangeAmount}
                  />
                </CCol>
              </CForm>
              <br></br>
              <CAlert visible={this.state.alert} color="danger">
                <center> {this.state.error}</center>
              </CAlert>
              <br></br>
            </CModalBody>
            <CModalFooter>
              <CButton
                color="secondary"
                onClick={() => this.setInsertVisible(false)}
              >
                Fermer
              </CButton>
              <CButton
                color="primary"
                onClick={() => this.insert()}
                disabled={this.state.pending ? true : false}
              >
                Ajouter
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
              <CModalTitle>Suppression d'un tarif</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <p className="text-medium-emphasis small">
                Voulez-vous supprimer ce tarif :
              </p>
              <ul>
                <li>
                  {" "}
                  <strong> Role : </strong>{" "}
                  {this.state.memberRole && this.state.memberRole.name}{" "}
                  {this.state.hierarchy && this.state.hierarchy.name}
                </li>
                <li>
                  {" "}
                  <strong> Année d'activité :</strong>{" "}
                  {this.state.activityYear &&
                    this.state.activityYear.start_year}{" "}
                  -{" "}
                  {this.state.activityYear && this.state.activityYear.end_year}
                </li>
                <li>
                  {" "}
                  <strong>Tarif :</strong> {this.state.amount} Ar
                </li>
              </ul>
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

        {/* validation modal */}
        <>
          <CModal
            alignment="center"
            visible={this.state.validationVisible}
            onClose={() => this.viewPageValidation(false, this.state.index)}
          >
            <CModalHeader>
              <CModalTitle>Validation d'un tarif</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <p className="text-medium-emphasis small">
                Voulez-vous valider ce tarif :
              </p>
              <ul>
                <li>
                  {" "}
                  <strong> Role : </strong>{" "}
                  {this.state.memberRole && this.state.memberRole.name}{" "}
                  {this.state.hierarchy && this.state.hierarchy.name}
                </li>
                <li>
                  {" "}
                  <strong> Année d'activité :</strong>{" "}
                  {this.state.activityYear &&
                    this.state.activityYear.start_year}{" "}
                  -{" "}
                  {this.state.activityYear && this.state.activityYear.end_year}
                </li>
                <li>
                  {" "}
                  <strong>Tarif :</strong> {this.state.amount} Ar
                </li>
              </ul>
            </CModalBody>
            <CModalFooter>
              <CButton
                color="secondary"
                onClick={() => this.viewPageValidation(false, this.state.index)}
              >
                Fermer
              </CButton>
              <CButton
                color="success"
                onClick={this.validation}
                disabled={this.state.pending ? true : false}
              >
                Valider
              </CButton>
            </CModalFooter>
          </CModal>
        </>
      </CCol>
    );
  }
}
