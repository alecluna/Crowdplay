import React, { Component } from "react";

export default class ChatMessage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: ""
    };

    this.handleAdd = this.handleAdd.bind(this);
    this.changeText = this.changeText.bind(this);
  }

  changeText(e) {
    this.setState({
      text: e.target.value
    });
  }

  handleAdd(event) {
    event.preventDefault();

    // const addInput = this.refs.addInput;
    // const text = addInput.value;
    this.props.addMessage(this.state.text);
    this.setState({ text: "" });
    // this.refs.addInput.value = '';
  }

  render() {
    return (
      <form onSubmit={this.handleAdd}>
        <input
          type="text"
          name="myInput"
          onChange={this.changeText}
          value={this.state.text}
        />
        <button type="submit">add</button>
      </form>
    );
  }
}
