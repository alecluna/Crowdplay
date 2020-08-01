import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

export default createMuiTheme({
  mixins: {
    toolbar: {
      minHeight: "64px",
      "@media (min-width: 0px)": {
        minHeight: "56px",
      },
      "@media (min-width: 960px)": {
        minHeight: "64px",
      },
    },
    drawer: {
      width: "240px",
    },
    combinedDrawers: {
      width: "540px",
    },
  },
});
