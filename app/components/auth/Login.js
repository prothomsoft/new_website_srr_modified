import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import { Field, SubmissionError, reduxForm } from "redux-form";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
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
  if (!values.email) {
    errors.email = "Pole jest wymagane";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Błędny adres email";
  }
  if (!values.password) {
    errors.password = "Pole jest wymagane";
  }
  return errors;
};

const renderTextField = ({ input, label, name, meta: { touched, error } }) => (
  <FormControl
    margin="normal"
    required
    fullWidth
    error={touched && error ? true : false}
  >
    <InputLabel htmlFor={name}>{label}</InputLabel>
    <Input {...input} />
    <FormHelperText id={name}>{touched && error ? error : ""}</FormHelperText>
  </FormControl>
);

class Login extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
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
  }

  handleSubmit(values) {
    this.props.loginUser(values);
  }

  render() {
    const { classes } = this.props;
    const { handleSubmit, pristine, submitting, reset } = this.props;

    return (
      <main className={classes.main}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5">
            Logowanie
          </Typography>
          <form
            onSubmit={handleSubmit(this.handleSubmit)}
            className={classes.form}
          >
            <Field
              name="email"
              component={renderTextField}
              label="Twój adres email"
            />
            <Field
              name="password"
              component={renderTextField}
              label="Twoje hasło"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={pristine || submitting}
              className={classes.submit}
            >
              LOGIN
            </Button>
          </form>
        </Paper>
      </main>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

Login = reduxForm({
  form: "login",
  fields: ["email", "password"],
  validate
})(Login);

export default connect(
  mapStateToProps,
  { loginUser }
)(withStyles(styles)(Login));
