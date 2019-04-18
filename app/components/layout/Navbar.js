import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  appBar: {
    position: "relative"
  }
});

class Navbar extends Component {
  // Remove the server-side injected CSS.
  componentDidMount() {
    const jssStyles = document.getElementById("jss-server-side");
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const { classes } = this.props;

    const authLinks = (
      <div>
        <Link className="nav-link" to="/users">
          Users list
        </Link>{" "}
        |{" "}
        <Link className="nav-link" to="/add-user">
          Add new user
        </Link>{" "}
        |{" "}
        <Link className="nav-link" to="/dashboard">
          Dashboard
        </Link>{" "}
        |{" "}
        <button
          onClick={this.onLogoutClick.bind(this)}
          className="btn btn-danger"
        >
          Logout
        </button>
      </div>
    );

    const guestLinks = (
      <div>
        <Link className="nav-link" to="/login">
          Login
        </Link>{" "}
        |{" "}
        <Link className="nav-link" to="/upload">
          Upload
        </Link>
      </div>
    );

    return (
      <React.Fragment>
        {/* Header */}
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              <div>{isAuthenticated ? authLinks : guestLinks}</div>
            </Typography>
          </Toolbar>
        </AppBar>
        {/* Header */}
      </React.Fragment>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(withStyles(styles)(Navbar));
