import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteUser } from "../../actions/userActions";

class UserItem extends Component {
  onDeleteClick(id) {
    this.props.deleteUser(id);
  }

  render() {
    const { user, auth, showActions } = this.props;

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <p className="text-center">{user.name}</p>
            {showActions ? (
              <Link to={`/user/${user._id}`} className="btn btn-info mr-1">
                Details
              </Link>
            ) : null}

            {!user.admin ? (
              <button
                onClick={this.onDeleteClick.bind(this, user._id)}
                type="button"
                className="btn btn-danger mr-1"
              >
                DELETE USER
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

UserItem.defaultProps = {
  showActions: true
};

UserItem.propTypes = {
  deleteUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteUser }
)(UserItem);
