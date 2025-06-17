import React from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from "@coreui/react";
import api from "../../const/api";
import PaymentTicket from "../../components/PaymentTicket";
import jsPDF from "jspdf";
import Loading from "../pages/Loading";
import CIcon from "@coreui/icons-react";
import { cilPrint } from "@coreui/icons";
import BackButton from "../../components/BackButton";

export default class PaymentTickets extends React.Component {
  constructor() {
    super();
    this.state = {
      payments: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.getTickets();
  }

  correctPText = (text = "") => {
    const size = 24;
    if (text.length > size) return text.substring(0, size);
    return text;
  };

  getTickets = () => {
    this.setState({ loading: true });
    let payments = this.props.match.params.tickets;
    payments = payments.split(",");
    fetch(api("payments/paymentTickets"), {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        payments,
      }),
    }).then((res) => {
      if (res.ok)
        res.json().then((data) => {
          this.setState({
            payments: data.payments,
            loading: false,
          });
        });
    });
  };

  createPdf = () => {
    const doc = new jsPDF("pt", "px");
    doc.setFontSize(6);

    const x = 38;
    const y = 38;
    const width = 110;
    const height = 55;
    const marginX = 20;
    const marginY = 20;
    let count = 0;
    let row = 0;

    const all = this.state.payments.map((p) => {
      return new Promise((res, rej) => {
        const X = x + (width + marginX) * count;
        const Y = y + (height + marginY) * row;
        doc.rect(X, Y, width, height, "S");
        doc.addImage(
          `data:image/png;base64,${p.qr}`,
          "PNG",
          X + 5,
          Y + 5,
          45,
          45
        );
        doc.text(
          this.correctPText(`${p.last_name} ${p.first_name}`),
          X + 55,
          Y + 10
        );
        let pos = 20;
        p.fields.forEach((f) => {
          doc.text(this.correctPText(f), X + 55, Y + pos);
          pos += 10;
        });
        doc.text(p.number_card, X + 55, Y + pos);
        count++;
        if (count === 3) {
          row++;
          count = 0;
        }
        if (row === 8) {
          doc.addPage();
          count = 0;
          row = 0;
        }
        res();
      });
    });
    Promise.all(all).then(() => {
      doc.save("tickets-paiments.pdf");
    });
  };

  render() {
    if (this.state.loading) {
      return <Loading />;
    }
    return (
      <div className="m-5">
      <BackButton to={"/payment"} />
        <CRow>
          <CCol xs={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <strong>Tickets de paiements</strong>
                <span className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <CButton onClick={() => this.createPdf()}><CIcon icon={cilPrint} /> Imprimer</CButton>
                </span>
              </CCardHeader>
              <CCardBody>
                <div>
                  <CRow>
                    {this.state.payments.map((p, i) => (
                      <PaymentTicket
                        correctPText={this.correctPText}
                        key={i}
                        qrValue={`${p.paymentDetailId}`}
                        data={p}
                      />
                    ))}
                  </CRow>
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </div>
    );
  }
}
