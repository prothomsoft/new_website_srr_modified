import React, { Component } from "react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import Helmet from "react-helmet";

class Landing extends Component {
    componentDidMount() {
        console.log("we are in landing component mount");
        /*const { user } = this.props.auth;
        if (this.props.auth.isAuthenticated) {
            if (user.admin) {
                this.props.history.push("/dashboard-admin");
            } else {
                this.props.history.push("/dashboard-client");
            }
        }*/
    }

    render() {
        return (
            <div className="landing">
                <Helmet title="About" meta={[{ property: "og:title", content: "About" }]} />
                <div className="dark-overlay landing-inner text-light">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <h1 className="display-3 mb-4">Client Management System</h1>
                                <p className="lead">Create client profile and manage its properties</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Landing.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Landing);
