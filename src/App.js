import React, { Component } from "react";
import "./App.css";
import questions from "./preguntas";
import Welcome from "./welcome";
import Question from "./question";
import Result from "./result";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 1,
      width: 1,
      actual: -1,
      final: [],
      questions,
      route: []
    };
  }
  componentWillMount() {
    var tmp = [];
    for (var i = 0; i < this.state.questions.length; i++) {
      tmp.push(i);
    }
    tmp.sort((a, b) => Math.random() - 0.5);
    this.setState({ route: tmp });
  }
  render() {
    return (
      <div
        style={{
          flex: 1,
          textAlign: "center",
          backgroundColor: "#34495e",
          position: "relative"
        }}
      >
        <div
          ref={input => {
            this.card = input;
          }}
          style={{
            width: "60%",
            backgroundColor: "white",
            borderRadius: 10,
            margin: "0 auto",
            position: "absolute",
            top: "50%",
            left: "50%",
            marginLeft: -(this.state.width / 2),
            marginTop: -(this.state.height / 2),
            paddingTop: 20,
            paddingBottom: 20
          }}
          className="shadow"
        >
          {this.state.actual === -1 && (
            <Welcome
              start={() => this.setState({ actual: this.state.route[0] })}
            />
          )}
          {this.state.actual > -1 && (
            <Question
              question={this.state.questions[this.state.actual]}
              answer={val => this.storeAnswer(val)}
              back={() => this.regresar()}
              next={() => this.siguiente()}
            />
          )}
          {this.state.actual === -2 && (
            <Result questions={this.state.questions} />
          )}
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.changeCard();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.actual !== this.state.actual) {
      this.changeCard();
    }
  }

  changeCard() {
    var height = this.card.clientHeight;
    var width = this.card.clientWidth;
    this.setState({ width, height });
  }

  storeAnswer(val) {
    var tmp = this.state.questions;
    tmp[this.state.actual].selected = val;
    this.setState({ questions: tmp });
  }

  siguiente() {
    if (this.state.actual !== this.state.route[this.state.route.length - 1]) {
      var i = this.state.route.indexOf(this.state.actual);
      this.setState({ actual: this.state.route[i + 1] });
    } else if (
      this.state.actual === this.state.route[this.state.route.length - 1]
    ) {
      this.setState({ actual: -2 });
    }
  }
  regresar() {
    if (this.state.actual !== this.state.route[0]) {
      var i = this.state.route.indexOf(this.state.actual);
      this.setState({ actual: this.state.route[i - 1] });
    }
  }
}

export default App;
