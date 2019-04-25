import React, { Component } from "react";
import PropTypes, { exact } from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import { Field, SubmissionError, reduxForm } from "redux-form";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import SelectField from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import RadioButton from "@material-ui/core/Radio";
import RadioButtonGroup from "@material-ui/core/RadioGroup";
import asyncValidate from "./asyncValidate";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});

const validate = values => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = "Required";
  } else if (values.firstName.length > 15) {
    errors.firstName = "Must be 15 characters or less";
  }
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.age) {
    errors.age = "Required";
  } else if (isNaN(Number(values.age))) {
    errors.age = "Must be a number";
  } else if (Number(values.age) < 2) {
    errors.age = "Sorry, you must be at least 3 years old";
  }
  return errors;
};

const warn = values => {
  const warnings = {};
  if (values.age < 3) {
    warnings.age = "Hmm, you seem a bit young...";
  }
  return warnings;
};

const renderTextField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
  <TextField
    error={touched && error ? true : false}
    helperText={touched && error ? error : ""}
    {...input}
  />
);

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

class ContactForm extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  handleSubmit(values) {
    return sleep(1000) // simulate server latency
      .then(() => {
        if (!["john", "paul", "george", "ringo"].includes(values.firstName)) {
          throw new SubmissionError({
            firstName: "FirstName does not exist",
            _error: "Login failed!"
          });
        } else if (values.email !== "a@a.com") {
          throw new SubmissionError({
            email: "Wrong email 123",
            _error: "Login failed!"
          });
        } else {
          window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
        }
      });
  }

  render() {
    const {
      fields: { firstName, lastName, email },
      handleSubmit,
      pristine,
      submitting,
      reset
    } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleSubmit)}>
        <div>
          <Field
            name="firstName"
            component={renderTextField}
            type="text"
            label="First Name"
          />
        </div>
        <div>
          <Field name="email" component={renderTextField} label="Email" />
        </div>
        <div>
          <Field
            name="age"
            type="number"
            component={renderTextField}
            label="Age"
          />
        </div>

        <button type="submit" disabled={pristine || submitting}>
          Submit
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </form>
    );
  }
}

ContactForm.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

ContactForm = reduxForm({
  form: "contact",
  fields: ["firstName", "email", "age"],
  validate,
  warn
})(ContactForm);

export default connect(
  mapStateToProps,
  { loginUser }
)(withStyles(styles)(ContactForm));
