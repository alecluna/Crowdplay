import React, { Component } from "react";
import Button from "../../../node_modules/@material-ui/core/Button";

export default class ChatMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };
  }

  changeText(e) {
    this.setState({
      text: e.target.value
    });
  }

  handleAdd(event) {
    event.preventDefault();
    this.props.addMessage(this.state.text);
    this.setState({ text: "" });
  }

  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.handleAdd.bind(this)}>
          <input
            type="text"
            onChange={this.changeText.bind(this)}
            value={this.state.text}
          />
          <Button type="submit">add</Button>
        </form>
      </React.Fragment>
    );
  }
}
