import App from "../components/App";
import Dashboard from "../components/dashboard/Dashboard";
import Login from "../components/auth/Login";
import Users from "../components/users/Users";
import User from "../components/users/User";
import UserForm from "../components/users/UserForm";

const routes = [
  {
    component: App,
    routes: [
      { path: "/dashboard", exact: true, component: Dashboard },
      { path: "/login", exact: true, component: Login },
      { path: "/users", exact: true, component: Users },
      { path: "/user/:id", exact: true, component: User },
      { path: "/add-user", exact: true, component: UserForm }
    ]
  }
];

export default routes;
