import { createMuiTheme } from "@material-ui/core/styles";
import teal from "@material-ui/core/colors/teal";

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: teal,
    secondary: { main: "#FFF" }
  },
  typography: {
    useNextVariants: true
  },
  overrides: {
    MuiButton: {
      // Name of the rule
      text: {
        // Some CSS
        background: "#333333",
        borderRadius: 3,
        border: 0,
        color: "white",
        height: 28,
        padding: "0 30px"
      }
    }
  }
});

export default theme;
