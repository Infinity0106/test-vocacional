import React, { Component } from "react";
import career from "./carreras";

export default class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {
      career,
      result: {}
    };
  }

  componentWillMount() {
    var actual_career = this.props.questions[0].career;
    var matrix = [];
    var tmp = [];

    this.props.questions.forEach((element, index) => {
      if (actual_career === element.career) {
        tmp.push(element);
      } else {
        actual_career = element.career;
        matrix.push(tmp);
        tmp = [];
        tmp.push(element);
      }
    });
    matrix.push(tmp);

    tmp = this.state.career;
    matrix.forEach(ele => {
      var score = 0;
      ele.forEach(ele => (score += ele.selected));
      tmp[ele[0].career].score = score;
    });
    console.log(tmp);
    this.setState({ career: tmp });
  }

  render() {
    return (
      <div>
        <p>final</p>
      </div>
    );
  }
}
