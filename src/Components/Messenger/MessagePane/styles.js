import React from "react";
import styled from "styled-components";
import { List, ListItem } from "@material-ui/core";

const StyledMessageList = styled(({ ...props }) => <List {...props} />)`
  position: relative;
  z-index: 0;
`;

const StyledMessagePaperFlex = styled(ListItem)`
  display: flex;
  justify-content: row;
  align-items: center;
`;

/* 
.bubble {
    width: fit-content;
    position: relative;
    padding: 0.5em 1em;
    word-wrap: break-word;
    border-radius: 25px;
    line-height: 24px;

    &::before,
    &::after {
        content: '';
        height: 20px;
        position: absolute;
        bottom: -2px;
    }

    &::before {
        transform: translate(0, -2px);
    }

    &::after {
        background: $white;
        width: 26px;
        transform: translate(-30px, -2px);
        display: table;
        clear: both;
    }
}
*/

export { StyledMessageList, StyledMessagePaperFlex };
