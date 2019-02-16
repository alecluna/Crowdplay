import React, { Component } from "react";
import TextField from "../../../node_modules/@material-ui/core/TextField";
import Button from "../../../node_modules/@material-ui/core/Button";

export default class ChatMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };
  }

  changeText = e => {
    this.setState({
      text: e.target.value
    });
  };

  handleAdd = event => {
    const { addMessage } = this.props;
    addMessage(this.state.text);
    this.setState({ text: "" });
    event.preventDefault();
  };

  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.handleAdd.bind(this)}>
          <TextField
            label="Add Message"
            onChange={this.changeText.bind(this)}
            defaultValue={this.state.text}
          />
          <Button type="submit">add</Button>
        </form>
      </React.Fragment>
    );
  }
}
