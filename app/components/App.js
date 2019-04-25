import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "../components/common/PrivateRoute";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import Login from "../components/auth/Login";
import Dashboard from "../components/dashboard/Dashboard";
import NotFound from "../components/not-found/NotFound";

import Upload from "../components/upload/Upload";
import Users from "./users/Users";
import User from "./users/User";
import UserForm from "./users/UserForm";

import CssBaseline from "@material-ui/core/CssBaseline";

import ContactForm from "../components/auth/ContactForm";

export default function App() {
  return (
    <div>
      <CssBaseline />
      <Navbar />
      <Switch>
        <PrivateRoute exact path="/add-user" component={UserForm} />
        <PrivateRoute exact path="/users" component={Users} />
        <PrivateRoute exact path="/user/:id" component={User} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/contact" component={ContactForm} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/upload" component={Upload} />
        <Route exact path="/" component={Dashboard} />
        <Route exact component={NotFound} />
      </Switch>
      <Footer />
    </div>
  );
}
