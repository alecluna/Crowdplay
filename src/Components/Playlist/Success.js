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
    <Typography>Success! Send all the props to API</Typography>
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Button
        variant="outlined"
        size="medium"
        color="primary"
        style={styles.button}
      >
        <Link
          style={{ textDecoration: "none" }}
          to={{
            pathname: "/inviteusers"
          }}
        >
          <Typography>Invite Users</Typography>
        </Link>
      </Button>
    </div>
  </div>
);

export default Success;
