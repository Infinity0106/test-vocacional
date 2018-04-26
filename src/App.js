import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import quiz from "./preguntas.json";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postion: "p1"
    };
  }
  componentWillMount() {}
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        {this.renderQuestion()}
      </div>
    );
  }

  renderQuestion() {
    if (quiz[this.state.postion].result === undefined) {
      var list = quiz[this.state.postion].answers.map(ele => {
        return (
          <li>
            <a href="#" onClick={e => this.changePosition(ele.route)}>
              {ele.text}
            </a>
          </li>
        );
      });
      return (
        <div>
          <div>{quiz[this.state.postion].question}</div>
          <ul>{list}</ul>
        </div>
      );
    } else {
      return (
        <div>
          <p>{quiz[this.state.postion].result}</p>
          <a href="#" onClick={e => this.changePosition("p1")}>
            re-take
          </a>
        </div>
      );
    }
  }

  changePosition(opt) {
    this.setState({ postion: opt });
  }
}

export default App;
