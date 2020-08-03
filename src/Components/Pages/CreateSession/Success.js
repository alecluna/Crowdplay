import React from "react";
import Typography from "@material-ui/core/Typography";

const Success = () => (
  <div>
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Typography
        style={{ marginTop: 30 }}
        color="textSecondary"
        variant="h4"
        align="center"
      >
        Success! Redirecting...
      </Typography>
    </div>
  </div>
);

export default Success;
