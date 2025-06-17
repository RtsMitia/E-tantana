import {
  CCol,
  CCard,
  CCardBody,
  CCardHeader,
  CListGroup,
  CListGroupItem,
} from "@coreui/react";
import React, { Component } from "react";
import api from "../../const/api";
import BackButton from "../../components/BackButton";
import Loading from "../pages/Loading";
import Moment from "moment";

export default class PaymentTicketDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: null,
      loading: true,
    };
  }

  componentDidMount() {
    this.getDetails();
  }

  getDetails = () => {
    this.setState({
      loading: true,
    });
    fetch(api("payments/check?id=" + this.props.match.params.id)).then(
      (res) => {
        if (res.ok) {
          return res.json().then((data) => {
            if (data && data.payment && data.payment.length > 0)
              this.setState({
                details: data.payment[0],
                loading: false,
              });
						else this.setState({
							loading: false,
						});
          });
        }
      }
    );
  };

  render() {
    if (this.state.loading) {
      return <Loading />;
    }
    return (
      <div className="m-5">
        <BackButton to={"/checkPaymentTickets"} />
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader color="green">
              <strong>Détails de paiement</strong>
            </CCardHeader>
            <CCardBody>
              {this.state.details ? (
                <CListGroup flush>
                  <h3>
                    <center>Paiement valide</center>
                  </h3>
                  <CListGroupItem className="d-flex justify-content-between align-items-center">
                    <span>
                      <strong> Nom: </strong>
                      {this.state.details.last_name}
                    </span>
                  </CListGroupItem>
                  <CListGroupItem className="d-flex justify-content-between align-items-center">
                    <span>
                      <strong> Prénoms: </strong>
                      {this.state.details.first_name}
                    </span>
                  </CListGroupItem>
                  <CListGroupItem className="d-flex justify-content-between align-items-center">
                    <span>
                      <strong> Lieu d'activité: </strong>
                      {this.state.details.activityField}
                    </span>
                  </CListGroupItem>
                  <CListGroupItem className="d-flex justify-content-between align-items-center">
                    <span>
                      <strong> Année d'activité du paiement: </strong>
                      {this.state.details.activity_year}
                    </span>
                  </CListGroupItem>
                  <CListGroupItem className="d-flex justify-content-between align-items-center">
                    <span>
                      <strong> Date de paiement: </strong>
                      {Moment(this.state.details.date).format("D/MM/y")}
                    </span>
                  </CListGroupItem>
                </CListGroup>
              ): <p>Paiement invalide</p>}
            </CCardBody>
          </CCard>
        </CCol>
      </div>
    );
  }
}
