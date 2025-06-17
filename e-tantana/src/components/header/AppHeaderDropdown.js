import React, { Component } from 'react'
import {
  CAvatar,
  // CBadge,
  CDropdown,
  // CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilLockLocked,
  // cilBell,
  // cilCreditCard,
  // cilCommentSquare,
  // cilEnvelopeOpen,
  // cilFile,
  // cilLockLocked,
  // cilSettings,
  // cilTask,
  // cilUser,
  cilUserX,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar8 from './../../assets/images/avatars/8.jpg'
import { withRouter } from 'react-router'

class AppHeaderDropdown extends Component {

  logout() {
    sessionStorage.removeItem("jwtToken");
    sessionStorage.removeItem("member");
    sessionStorage.removeItem("memberActivity");
    sessionStorage.removeItem("user");
    this.props.history.push("/");
  }

  updatePassword() {
    this.props.history.push("/updatePassword");
  }

  render() {
    return (
      <CDropdown variant="nav-item">
        <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
          <CAvatar src={avatar8} size="md" />
        </CDropdownToggle>
        <CDropdownMenu className="pt-0" placement="bottom-end">
          <CDropdownHeader className="bg-light fw-semibold py-2">Compte</CDropdownHeader>
          <CDropdownItem onClick={() => this.updatePassword()}
            style={{cursor: 'pointer'}}
          >
            <CIcon icon={cilLockLocked} className="me-2" />
            Changer mot de passe
          </CDropdownItem>
          <CDropdownItem onClick={() => this.logout()}
            style={{cursor: 'pointer'}}
          >
            <CIcon icon={cilUserX} className="me-2" />
            Se déconnecter
          </CDropdownItem>
          {/* <CDropdownItem href="#">
            <CIcon icon={cilEnvelopeOpen} className="me-2" />
            Messages
            <CBadge color="success" className="ms-2">
              42
            </CBadge>
          </CDropdownItem>
          <CDropdownItem href="#">
            <CIcon icon={cilTask} className="me-2" />
            Tasks
            <CBadge color="danger" className="ms-2">
              42
            </CBadge>
          </CDropdownItem>
          <CDropdownItem href="#">
            <CIcon icon={cilCommentSquare} className="me-2" />
            Comments
            <CBadge color="warning" className="ms-2">
              42
            </CBadge>
          </CDropdownItem>
          <CDropdownHeader className="bg-light fw-semibold py-2">Settings</CDropdownHeader>
          <CDropdownItem href="#">
            <CIcon icon={cilUser} className="me-2" />
            Profile
          </CDropdownItem>
          <CDropdownItem href="#">
            <CIcon icon={cilSettings} className="me-2" />
            Settings
          </CDropdownItem>
          <CDropdownItem href="#">
            <CIcon icon={cilCreditCard} className="me-2" />
            Payments
            <CBadge color="secondary" className="ms-2">
              42
            </CBadge>
          </CDropdownItem>
          <CDropdownItem href="#">
            <CIcon icon={cilFile} className="me-2" />
            Projects
            <CBadge color="primary" className="ms-2">
              42
            </CBadge>
          </CDropdownItem>
          <CDropdownDivider />
          <CDropdownItem href="#">
            <CIcon icon={cilLockLocked} className="me-2" />
            Lock Account
          </CDropdownItem> */}
        </CDropdownMenu>
      </CDropdown>
    )
  }
}

export default withRouter(AppHeaderDropdown)