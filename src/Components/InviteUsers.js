import React from "react";
import Typography from "../../node_modules/@material-ui/core/Typography";
import Header from "../Components/Header";
import Paper from "../../node_modules/@material-ui/core/Paper";

const styles = {
  background: {
    backgroundColor: "#D3D3D3",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  paperStyle: {
    height: "75%",
    width: "60%",
    borderRadius: "5px"
  },
  centerStyling: {
    display: "flex",
    justifyContent: "center",
    marginTop: "30px"
  }
};

const InviteUsers = () => (
  <div>
    <Header />
    <div style={styles.background}>
      <Paper style={styles.paperStyle} elevation={11}>
        <div style={styles.centerStyling}>
          <Typography
            variant="display2"
            style={{ color: "black", fontWeight: "200" }}
          >
            Invite Users
          </Typography>
        </div>
        <div style={styles.centerStyling} />
      </Paper>
    </div>
  </div>
);

export default InviteUsers;
