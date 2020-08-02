import React from "react";
import { StyledBackground, StyledForm, StyledTextField } from "../styles";
import Button from "../../../../Reusable/Button";
import Typography from "../../../../Reusable/Typography";

const SessionInfo = (props) => {
  const { values, handleChange, nextStep, prevStep } = props;

  return (
    <React.Fragment>
      <StyledBackground>
        <Typography variant="h5">Host a Session:</Typography>
        <StyledForm>
          <StyledTextField
            label="Name"
            onChange={handleChange("roomName")}
            defaultValue={values.roomName}
          />
          <StyledTextField
            label="Description"
            onChange={handleChange("roomDescription")}
            defaultValue={values.roomDescription}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "row",
              marginTop: "30px",
            }}
          >
            <Button
              onClick={(e) => {
                e.preventDefault();
                prevStep();
              }}
            >
              Back
            </Button>
            <Button
              onClick={(e) => {
                e.preventDefault();
                nextStep();
              }}
            >
              Continue
            </Button>
          </div>
        </StyledForm>

        {values.roomExists && (
          <Typography color="error" variant="body1">
            Room Already Exists
          </Typography>
        )}
      </StyledBackground>
    </React.Fragment>
  );
};

export default SessionInfo;
