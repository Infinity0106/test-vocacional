import React, { Component } from "react";

export default class Welcome extends Component {
  render() {
    return (
      <div>
        <p style={{ marginBottom: 20, fontSize: 20, fontFamily: "monospace" }}>
          Bienvenido al mejor test vocacional de tu vida
        </p>
        <a
          onClick={() => this.props.start()}
          style={{
            color: "inherit",
            textDecoration: "none"
          }}
        >
          <ul>
            <li className="answer5">empezar</li>
          </ul>
        </a>
      </div>
    );
  }
}
