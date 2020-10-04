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

const StyledMessage = styled((props) => {
  return <div {...props} />;
})`
  border-radius: 20px;
  background-color: ${(props) => (props.isMe ? `#0085D1 ` : `#eee`)};
  padding: 10px;

  ${(props) =>
    props.isMe
      ? "background: linear-gradient(to bottom, #00d0ea 0%, #0085d1 100%); background-attachment: fixed; position: relative;"
      : " margin-right: 25%; background-color: #eee; position: relative;"}

  &:before {
    content: "";
    position: absolute;
    z-index: 0;
    bottom: 0;
    ${(props) => (props.isMe ? "right : -8px" : " left: -7px")};
    height: 20px;
    width: 20px;
    ${(props) =>
      props.isMe
        ? "background: linear-gradient(to bottom, #00d0ea 0%, #0085d1 100%);"
        : "background-color: #eee"};

    background-attachment: fixed;
    border-bottom-left-radius: 15px;
  }
  &:after {
    content: "";
    position: absolute;
    z-index: 1;
    bottom: 0;
    ${(props) => (props.isMe ? "right : -10px" : " left: -10px")};
    width: 10px;
    height: 20px;
    background: white;
    border-bottom-left-radius: 10px;
  }
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

export { StyledMessageList, StyledMessagePaperFlex, StyledMessage };
