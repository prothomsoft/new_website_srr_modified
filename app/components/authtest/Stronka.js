import React, { Component } from "react";
import { connect } from "react-redux";

class Stronka extends Component {
    componentDidMount() {
        console.log("stronka component did mount");
    }

    render() {
        return <div>To jest stronka</div>;
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Stronka);
