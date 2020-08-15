import React from "react";
import styled from "styled-components";
import { Dialog, DialogContent } from "@material-ui/core";

const StyledDialog = styled(({ ...props }) => (
  <Dialog contentStyle={{ width: "100%" }} {...props} />
))``;

const StyledDialogContent = styled(DialogContent)`
  width: 100%;
  height: 400px;
  padding: 20px;
  overflow: auto;
`;

export { StyledDialog, StyledDialogContent };
