import { renderToString } from "react-dom/server";
import React from "react";
import path from "path";
import express from "express";
import renderFullPage from "./renderFullPage";
import routes from "../routes/routes";
import { StaticRouter } from "react-router-dom";
import { renderRoutes, matchRoutes } from "react-router-config";
import rootReducer from "../reducers";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import passport from "passport";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import users from "../api/users";
import uploadSingle from "../api/uploadSingle";
import uploadMultiple from "../api/uploadMultiple";
import { Helmet } from "react-helmet";
import { SheetsRegistry } from "jss";
import JssProvider from "react-jss/lib/JssProvider";
import {
  MuiThemeProvider,
  createGenerateClassName
} from "@material-ui/core/styles";
import theme from "../theme/theme";

const app = express();
const router = express.Router();

// Body Parser Middleware:
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../")));

// Passport Middleware:
app.use(passport.initialize());

// Passport Config:
import { passportStrategy } from "../config/passport";
passportStrategy(passport);

// Connect To MongoDB:
mongoose.connect(
  "mongodb://localhost/DevSpace",
  { useNewUrlParser: true },
  function(err) {
    if (err) {
      console.log("Error: Mongo Wasnt Connected because of: ", err);
    } else {
      console.log("MongoDB Connected");
    }
  }
);

router.use(users);
router.use(uploadSingle);
router.use(uploadMultiple);

router.get("*", handleRender);

function handleRender(req, res) {
  const store = createStore(rootReducer, applyMiddleware(thunk));
  const promises = matchRoutes(routes, req.originalUrl).map(
    ({ route, match }) => {
      return route.component.fetchData
        ? route.component.fetchData(store, match)
        : Promise.resolve(null);
    }
  );

  return Promise.all(promises).then(data => {
    let context = {};
    // Create a sheetsRegistry instance.
    const sheetsRegistry = new SheetsRegistry();

    // Create a sheetsManager instance.
    const sheetsManager = new Map();

    // Create a new class name generator.
    const generateClassName = createGenerateClassName();
    const html = renderToString(
      <JssProvider
        registry={sheetsRegistry}
        generateClassName={generateClassName}
      >
        <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
          <Provider store={store}>
            <StaticRouter context={context} location={req.url}>
              {renderRoutes(routes)}
            </StaticRouter>
          </Provider>
        </MuiThemeProvider>
      </JssProvider>
    );

    // Grab the CSS from our sheetsRegistry.
    const styles = sheetsRegistry.toString();
    const serializedState = store.getState();
    const helmet = Helmet.renderStatic();

    res.status(200).send(renderFullPage(html, helmet, styles, serializedState));
  });
}

app.use(router);

const port = process.env.PORT || 5000;
app.listen(port);
console.log(`Listening at http://localhost:${port}`);
