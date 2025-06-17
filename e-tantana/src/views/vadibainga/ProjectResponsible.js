import { Component } from "react"
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCardTitle,
    CCardText,
  } from "@coreui/react";

export class ProjectResponsible extends Component {

  constructor(props) {
    super(props);
    this.state = {
      responsible: props.data
    }
  }

    render() {
        return <CCard className="text-center mb-3" style={{ width: "15rem", marginRight: "20px", borderRadius: "9px" }}>
        <CCardHeader>{this.state.responsible.role}</CCardHeader>
        <CCardBody>
          <CCardTitle>{this.state.responsible.name}</CCardTitle>
          <CCardText>{this.state.responsible.activity}</CCardText>
        </CCardBody>
      </CCard>
    }
}