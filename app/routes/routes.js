import App from "../components/App";
import Dashboard from "../components/dashboard/Dashboard";
import Landing from "../components/layout/Landing";
import Register from "../components/auth/Register";
import Login from "../components/auth/Login";
import Profiles from "../components/profiles/Profiles";
import Profile from "../components/profile/Profile";
import CreateProfile from "../components/create-profile/CreateProfile";
import EditProfile from "../components/edit-profile/EditProfile";
import AddExperience from "../components/add-credentials/AddExperience";
import AddEducation from "../components/add-credentials/AddEducation";
import Posts from "../components/posts/Posts";
import Post from "../components/post/Post";
import NotFound from "../components/not-found/NotFound";

const routes = [
    {
        component: App,
        routes: [
            { path: "/dashboard", exact: true, component: Dashboard },
            { path: "/login", exact: true, component: Login },
            { path: "/profiles", exact: true, component: Profiles },
            { path: "/profile/:handle", exact: true, component: Profile }
        ]
    }
];

export default routes;
