import React, { useState } from "react";
import Button from "../../Reusable/Button";
import { StyledInputBar, StyledTextField } from "./styles";
import AddCircle from "@material-ui/icons/AddCircle";
import { withTheme } from "@material-ui/styles";

const InputBar = (props) => {
  const [message, setMessage] = useState("");

  const { toggleSearch, handleSubmitNewMessage } = props;

  const handleSubmit = async (event) => {
    await handleSubmitNewMessage(null, null, null, null, true, message);
    setMessage("");
  };

  const handleKeyPress = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      await handleSubmit();
    } else handleChange(event);
  };

  const handleChange = ({ target: { value } }) => setMessage(value);

  return (
    <StyledInputBar>
      <AddCircle
        style={{
          fontSize: "4em",
          color: `${props.theme.palette.primary.main}`,
        }}
        onClick={() => toggleSearch()}
      />
      <StyledTextField
        type="textarea"
        name="message"
        id="message"
        placeholder="New message or click the plus to add a song"
        value={message}
        onChange={handleKeyPress}
        onKeyPress={handleKeyPress}
        autoFocus
        onSubmit={handleSubmit}
      />
      <Button type="submit" color="primary">
        Send
      </Button>
    </StyledInputBar>
  );
};

export default withTheme(InputBar);
