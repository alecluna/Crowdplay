import React from "react";
import styled from "styled-components";
import Typography from "../../Reusable/Typography";

const StyledChatRoomContainer = styled.div``;

const StyledBarText = styled(({ ...props }) => (
  <Typography variant="h4" align="center" {...props} />
))`
  & {
    margin-bottom: 10px;
    font-weight: 400;
  }
`;
export { StyledChatRoomContainer, StyledBarText };
