import React from "react";
import Typography from "../../node_modules/@material-ui/core/Typography";
import Header from "../Components/Header";

const NotFoundPage = () => (
  <div>
    <Header />
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "40px"
      }}
    >
      <Typography variant="display1">
        Sorry the page you are looking for doesn't exist!
      </Typography>
    </div>
  </div>
);

export default NotFoundPage;
