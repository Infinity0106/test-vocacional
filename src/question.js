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
        {/*
          tag para mostrar la informacion de la preugnta se uitlizo dangerously
          para poder renderear la coas de NOTA: en bold ya que por si solo el texto no funcionaria
          pero no es recomendable utilizarlo (por pedos de optimizacion)
        */}
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
          {/*
            este <a> es para poder dar click y amdnar llamar la funcion de selct anser
            y toma como parametro el 1,2 3,4,5 que es la ponderacion cada preugnta
            (se hace bind(this)) por que si no se ejecutaria muchas veces (es un
            pero mas complejo de contextos y si quuieres despues te lo explico)
          */}
          <a
            onClick={this.selectAnswer.bind(this, 1)}
            style={{ color: "inherit", textDecoration: "none" }}
          >
            {/*
            todo lo de style es un if en una sola linea que camiba su color
            en caso de ser selccionada y eso se repite en todos los
            li
          */}
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
          {/*
            es lo que te decia del boton si no esta seleccionado
            no lo muestra y si si lo muestra
            es un if que se puede hacer en una linea seria lo mistmo que
            {if(this.tate.selcted){
              <div>....</div>
            }else{
              null
            }}
          */}
          {this.state.selected && (
            <div className="column">
              <a onClick={() => this.props.next()}>siguiente</a>
            </div>
          )}
        </div>
      </div>
    );
  }

  /**
   *
   * @param {object} np son las nuevas props que te manda el padre ose app.js cuando
   * se hace un cambio en el state y poder mostrar la nueva preunta
   * lo que hace esta funcio es solamente ver si ya se contesto la preugnta en la que estas
   * (se utilizara para mostar o esconder el boton de siguiente)
   */
  componentWillReceiveProps(np) {
    if (np.question.selected === 0) {
      this.setState({ selected: false });
    } else {
      this.setState({ selected: true });
    }
  }

  /**
   *
   * @param {int} val es la funcion prop que se mando como porop del padre (App.js)
   * lo que ahce es mandar llamar esa funcion para que guarde el valor
   * y cambiar el estado a seleccionada para pode rmostra rel botaon de siguiente
   */
  selectAnswer(val) {
    this.props.answer(val);
    if (!this.state.selected) {
      this.setState({ selected: true });
    }
  }
}
