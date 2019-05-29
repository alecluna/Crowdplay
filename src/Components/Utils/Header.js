import React from "react";
import AppBar from "../../../node_modules/@material-ui/core/AppBar";
import Toolbar from "../../../node_modules/@material-ui/core/Toolbar";
import Typography from "../../../node_modules/@material-ui/core/Typography";
import Link from "../../../node_modules/react-router-dom/Link";
import cplogo from "../../assets/crowdplaylogo.png";

export default function Header() {
  return (
    <div>
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
                paddingRight: "20px"
              }}
              alt="CrowdPlay"
            />
          </Link>
          <Typography variant="h6" color="default">
            Crowdplay
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
