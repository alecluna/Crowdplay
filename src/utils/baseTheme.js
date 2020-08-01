import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import baseLayout from "./baseLayout";

export default createMuiTheme({
  ...baseLayout,
  default: {
    padding: {
      leftAndRight: "12px",
    },
  },
  palette: {
    primary: {
      light: "#EAF9FF",
      main: "rgb(29, 185, 84)",
    },
    gray: {
      lightest: "#f5f5f5",
      lighter: "#eeeeee",
      ghostText: "#b3b3b3",
      light: "#9f9f9f",
      main: "#979797",
      dark: "#5e5e5e",
      darkest: "#232323",
    },
    error: {
      main: "rgba(255,0,0,1)",
    },
    white: {
      main: "rgba(255, 255, 255, 1)",
      greyScaled: "rgba(255, 255, 255, 0.54)",
    },
    black: {
      main: "rgba(0,0,0,1)",
    },
  },
  titlebar: {
    primary: { main: "rgba(255, 255, 255, 1)" },
  },
});
