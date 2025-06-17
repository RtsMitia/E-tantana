import { CCol, CCard, CCardBody, CCardHeader, CAlert } from "@coreui/react";
import React, { Component } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import api from "../../const/api";
import BackButton from "../../components/BackButton";

export default class CheckPaymentTicket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      delay: 300,
      ok: false,
      error: undefined,
      alert: false,
    };
  }

  handleScan = (data) => {
    if (data) {
      const id = JSON.parse(data);
      fetch(api("payments/check?id=" + id)).then((res) => {
        if (res.ok) {
          return res.json().then((data) => {
            if (data && data.payment && data.payment.length > 0) {
                this.props.history.push("paymentTickets/details/" + id);
            } else {
                this.setState({ alert: true, error: "Ce paiement est invalide." });
            }
          });
        }
      });
    }
  };

  handleError = (err) => {
    // console.error(err);
    this.setState({ alert: true, error: err });
  };

  render() {
    return (
      <div className="m-5">
        <BackButton to={"/"} />
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader color="green">
            <strong>Verification de paiement</strong>
          </CCardHeader>
          <CCardBody className="scan-qr-body">
            <center>
              <h3>
                {" "}
                <u> Scanner le qr code </u>
              </h3>
              <div className="scan-qr">
                <Html5QrcodeScanner
                  delay={this.state.delay}
                  onError={this.handleError}
                  onResult={this.handleScan}
                  constraints={{ facingMode: "user" }}
                />
              </div>
            </center>
            <div>
              <br></br> <br></br> <br></br>
              <br></br>
              <CAlert visible={this.state.alert} color="danger">
                <center> {this.state.error}</center>
              </CAlert>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
      </div>
    );
  }
}
