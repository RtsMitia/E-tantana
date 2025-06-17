import { Component } from "react";
import { withRouter } from "react-router";
import { CCol, CRow } from "@coreui/react";
import QRCode from "react-qr-code";

class PaymentTicket extends Component {
  render() {
    const { data } = this.props;
    return (
      <CCol className="mb-4" md={3}>
        <div
          className="qr-pt"
          style={{
            width: "200px",
            height: "100px",
            border: "2px solid black",
          }}
        >
          <CRow>
            <CCol md={5}>
              <div
                style={{
                  height: "70px",
                  width: "70px",
                  margin: "10px",
                }}
              >
                <QRCode
                  size={256}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  value={this.props.qrValue}
                  viewBox={`0 0 256 256`}
                />
              </div>
            </CCol>
            <CCol md={7} className="mt-2">
              <p>
                {this.props.correctPText(
                  `${data.last_name} ${data.first_name}`
                )}
              </p>
              {data.fields.map((f, i) => (
                <p key={i}>{this.props.correctPText(f)}</p>
              ))}
              <p>{data.number_card}</p>
            </CCol>
          </CRow>
        </div>
      </CCol>
    );
  }
}

export default withRouter(PaymentTicket);
