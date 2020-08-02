import React from "react";
import { AppBar, Toolbar } from "@material-ui/core";
import Typography from "../Typography";
import Link from "react-router-dom/Link";
import cplogo from "../../../assets/crowdplaylogo.png";

const Header = () => (
  <React.Fragment>
    <AppBar
      position="static"
      color="primary"
      style={{ width: "100%", backgroundColor: "white" }}
    >
      <Toolbar>
        <Link to="/home">
          <img
            src={cplogo}
            style={{
              float: "left",
              height: "3em",
              paddingRight: "20px",
            }}
            alt="CrowdPlay"
          />
        </Link>
        <Typography variant="h6">Crowdplay</Typography>
      </Toolbar>
    </AppBar>
  </React.Fragment>
);

export default Header;
