import React, { Component } from "react";
import { connect } from "react-redux";

class Dashboard extends Component {
  componentDidMount() {}

  onDeleteClick(e) {}

  render() {
    const { user } = this.props.auth;
    let dashbordType = "";
    if (this.props.auth.isAuthenticated) {
      if (user.admin) {
        dashbordType = "admin - show users list";
      } else {
        dashbordType = "client";
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard {dashbordType}</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Dashboard);
