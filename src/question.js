import React, { Component } from "react";

export default class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false
    };
  }

  render() {
    return (
      <div>
        <p
          style={{
            marginBottom: 20,
            fontSize: 20,
            fontFamily: "monospace",
            marginLeft: 30,
            marginRight: 30
          }}
          dangerouslySetInnerHTML={{ __html: this.props.question.question }}
        />
        <ul>
          <a
            onClick={this.selectAnswer.bind(this, 1)}
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <li
              className="answer1"
              style={{
                backgroundColor:
                  this.props.question.selected === 1 ? "#3498db" : null,
                color: this.props.question.selected === 1 ? "white" : null
              }}
            >
              Nada
            </li>
          </a>
          <a
            onClick={this.selectAnswer.bind(this, 2)}
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <li
              className="answer2"
              style={{
                backgroundColor:
                  this.props.question.selected === 2 ? "#3498db" : null,
                color: this.props.question.selected === 2 ? "white" : null
              }}
            >
              Muy poco
            </li>
          </a>
          <a
            onClick={this.selectAnswer.bind(this, 3)}
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <li
              className="answer3"
              style={{
                backgroundColor:
                  this.props.question.selected === 3 ? "#3498db" : null,
                color: this.props.question.selected === 3 ? "white" : null
              }}
            >
              Tal vez
            </li>
          </a>
          <a
            onClick={this.selectAnswer.bind(this, 4)}
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <li
              className="answer4"
              style={{
                backgroundColor:
                  this.props.question.selected === 4 ? "#3498db" : null,
                color: this.props.question.selected === 4 ? "white" : null
              }}
            >
              Algo
            </li>
          </a>
          <a
            onClick={this.selectAnswer.bind(this, 5)}
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <li
              className="answer5"
              style={{
                backgroundColor:
                  this.props.question.selected === 5 ? "#3498db" : null,
                color: this.props.question.selected === 5 ? "white" : null
              }}
            >
              Mucho
            </li>
          </a>
        </ul>
        <div className="row" style={{ paddingTop: 20 }}>
          <div className="column">
            <a onClick={() => this.props.back()}>regresar</a>
          </div>
          {this.state.selected && (
            <div className="column">
              <a onClick={() => this.props.next()}>siguiente</a>
            </div>
          )}
        </div>
      </div>
    );
  }

  componentWillReceiveProps(np) {
    if (np.question.selected === 0) {
      this.setState({ selected: false });
    }
  }

  selectAnswer(val) {
    this.props.answer(val);
    if (!this.state.selected) {
      this.setState({ selected: true });
    }
  }
}
