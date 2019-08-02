import React from "react";
import Typography from "../../../node_modules/@material-ui/core/Typography";
import Link from "../../../node_modules/react-router-dom/Link";
import Button from "../../../node_modules/@material-ui/core/Button";

const styles = {
  button: {
    margin: 15
  }
};

const Success = () => (
  <div>
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Typography color="textSecondary" variant="h4">
        Success! Redirecting...
      </Typography>
    </div>
  </div>
);

export default Success;
