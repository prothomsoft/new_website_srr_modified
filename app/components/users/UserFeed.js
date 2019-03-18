import React, { Component } from "react";
import PropTypes from "prop-types";
import UserItem from "./UserItem";

class UserFeed extends Component {
  render() {
    const { users } = this.props;
    return users.map(user => <UserItem key={user._id} user={user} />);
  }
}

UserFeed.propTypes = {
  users: PropTypes.array.isRequired
};

export default UserFeed;
