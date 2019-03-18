import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import UserItem from "./UserItem";
import Spinner from "../common/Spinner";
import { getUser } from "../../actions/userActions";

class User extends Component {
  componentDidMount() {
    this.props.getUser(this.props.match.params.id);
  }

  render() {
    const { user, loading } = this.props.user;
    let userContent;

    if (user === null || loading || Object.keys(user).length === 0) {
      userContent = <Spinner />;
    } else {
      userContent = (
        <div>
          <UserItem user={user} showActions={false} />
        </div>
      );
    }

    return (
      <div className="user">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/users" className="btn btn-light mb-3">
                Back To Dashboard
              </Link>
              {userContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

User.propTypes = {
  getUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { getUser }
)(User);
