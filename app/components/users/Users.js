import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import UserFeed from "./UserFeed";
import Spinner from "../common/Spinner";
import { getUsers } from "../../actions/userActions";

class Users extends Component {
  componentDidMount() {
    this.props.getUsers();
  }
  render() {
    const { users, loading } = this.props.user;
    let userContent;

    if (users === null || loading) {
      userContent = <Spinner />;
    } else {
      userContent = <UserFeed users={users} />;
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{userContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

Users.propTypes = {
  getUsers: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { getUsers }
)(Users);
