import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fileUploadSingle } from "../../actions/uploadActions";
import { fileUploadMultiple } from "../../actions/uploadActions";

class Upload extends Component {
  constructor() {
    super();
    this.singleFileChangedHandler = this.singleFileChangedHandler.bind(this);
    this.singleFileUploadHandler = this.singleFileUploadHandler.bind(this);

    this.multipleFileChangedHandler = this.multipleFileChangedHandler.bind(
      this
    );
    this.multipleFileUploadHandler = this.multipleFileUploadHandler.bind(this);
  }

  singleFileChangedHandler(event) {
    this.setState({
      selectedFile: event.target.files[0]
    });
  }

  singleFileUploadHandler() {
    const data = new FormData();
    if (this.state.selectedFile) {
      data.append(
        "image",
        this.state.selectedFile,
        this.state.selectedFile.name
      );
    }
    this.props.fileUploadSingle(data, this.props.history);
  }

  multipleFileChangedHandler(event) {
    this.setState({
      selectedFiles: event.target.files
    });
  }

  multipleFileUploadHandler() {
    const data = new FormData();
    if (this.state.selectedFiles) {
      for (let i = 0; i < this.state.selectedFiles.length; i++) {
        data.append(
          "images",
          this.state.selectedFiles[i],
          this.state.selectedFiles[i].name
        );
      }
    }
    this.props.fileUploadMultiple(data, this.props.history);
  }

  render() {
    const { image } = this.props.uploadReducer;
    return (
      <div className="container">
        <img src={image.imageUrl} />
        {/* For Alert box*/}
        <div id="oc-alert-container" />
        {/* Single File Upload*/}
        <div
          className="card border-light mb-3 mt-5"
          style={{ boxShadow: "0 5px 10px 2px rgba(195,192,192,.5)" }}
        >
          <div className="card-header">
            <h3 style={{ color: "#555", marginLeft: "12px" }}>
              Single Image Upload
            </h3>
            <p className="text-muted" style={{ marginLeft: "12px" }}>
              Upload Size: 250px x 250px ( Max 2MB )
            </p>
          </div>
          <div className="card-body">
            <p className="card-text">Please upload an image for your profile</p>
            <input type="file" onChange={this.singleFileChangedHandler} />
            <div className="mt-5">
              <button
                className="btn btn-info"
                onClick={this.singleFileUploadHandler}
              >
                Upload!
              </button>
            </div>
          </div>
        </div>
        {/* Multiple File Upload */}
        <div
          className="card border-light mb-3"
          style={{ boxShadow: "0 5px 10px 2px rgba(195,192,192,.5)" }}
        >
          <div className="card-header">
            <h3 style={{ color: "#555", marginLeft: "12px" }}>
              Upload Muliple Images
            </h3>
            <p className="text-muted" style={{ marginLeft: "12px" }}>
              Upload Size: 400px x 400px ( Max 2MB )
            </p>
          </div>
          <div className="card-body">
            <p className="card-text">
              Please upload the Gallery Images for your gallery
            </p>
            <input
              type="file"
              multiple
              onChange={this.multipleFileChangedHandler}
            />
            <div className="mt-5">
              <button
                className="btn btn-info"
                onClick={this.multipleFileUploadHandler}
              >
                Upload!
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Upload.propTypes = {
  fileUploadSingle: PropTypes.func.isRequired,
  fileUploadMultiple: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  uploadReducer: state.uploadReducer,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { fileUploadSingle, fileUploadMultiple }
)(withRouter(Upload));
