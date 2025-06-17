import React from "react";

class AdminLayout extends React.Component {
    constructor(props) {
        super(props);
        this.user = JSON.parse(sessionStorage.getItem("user"));
        if(this.user.accountType < 1) props.history.push('/');
    }
}

export default AdminLayout;
