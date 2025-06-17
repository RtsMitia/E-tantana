import React from 'react'
import { CFooter } from '@coreui/react'

class  AppFooter extends React.Component {
  render(){
  return (
    <CFooter>
      <div>
        <a href="https://coreui.io" target="_blank" rel="noopener noreferrer">
          CoreUI
        </a>
        <span className="ms-1">&copy; 2022 V.{process.env.REACT_APP_VERSION}</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <a href="https://coreui.io/react" target="_blank" rel="noopener noreferrer">
          Misaina 
        </a> 
      </div>
    </CFooter>
  )}
}

export default React.memo(AppFooter)
