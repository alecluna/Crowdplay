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
      main: "#1db954",
      hover: "#19d45b",
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
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});
