import React, { Component } from "react";
import "./App.css";
import questions from "./preguntas"; // el arhciov de preugnats almacenadas
import Welcome from "./welcome"; //clase para pode mostrar la patnalla inicial
import Question from "./question"; //clase para poder mostrar las preugnatas
import Result from "./result"; //clase para mostar resultados

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 1, //se neceista para centrar la tarjeta en la vista
      width: 1, //se necesita pra centar la tarjeta en la vista
      actual: -1, //determina la pregunta actual a mostar en pantalla
      questions, //todas las preguntas del archivo pretuntas.js
      route: [] //ruta que debe de tomas las preutnar siempre es random
    };
  }
  componentWillMount() {
    /** inicializamos el estado de routes random
     * primero creamos un arreglo temporal que contendra nmeros
     * de 0 al numero de preguntas en questions
     * despues el sort lo ordena de manera random
     * y al ultimo lo almacenamso en el estado
     */
    var tmp = [];
    for (var i = 0; i < this.state.questions.length; i++) {
      tmp.push(i);
    }
    tmp.sort((a, b) => Math.random() - 0.5);
    this.setState({ route: tmp });
  }

  /** funcion para mostrar la infomrmacion en html
   * es una funcion estander de react.js
   */
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
            paddingBottom: 20,
            paddingRight: 20,
            paddingLeft: 20,
            maxHeight: 500,
            overflow: "scroll"
          }}
          className="shadow"
        >
          {/* 
          el estado actual si es -1 muestra la pantalla de bienvenida 
          y la parte de start se llaman props, que se pueden utilizar dentro
          de la clase de welcome, (welcome es una clase igualita a esta de app.js)
          pero le podemos cambiar cosas el programa se compone de varias clases
          para seccionar el coidgo si no te quedaria un archivo mamastros,
          la props start se utiliza pra cambiar el valor acutal de esta clase
          y poder mostrar una pregunta
           (cada ves que llames this.setstate(), se vuelve a ejecutar esta funcion
           de render en automatico y muesra lo nuevo con el valor actualizado)
        */}
          {this.state.actual === -1 && (
            <Welcome
              start={() => this.setState({ actual: this.state.route[0] })}
            />
          )}
          {/*
            en caso de que esl estado sea mayor a -1 esque ya esta denodro de
            routes para generar las preguntas random y tiene ocmor porps
            question que es lainfomacion de la pregutna a mostrara
            answere esa se corre al momento de dar click en alguna de las 5 respuestas
            back que es una funcion para poder utilizar el boton de regresar
            y next eque es para la pregunta siguiente
          */}
          {this.state.actual > -1 && (
            <Question
              question={this.state.questions[this.state.actual]}
              answer={val => this.storeAnswer(val)}
              back={() => this.regresar()}
              next={() => this.siguiente()}
            />
          )}
          {/*
            en caso de estado acutal sea -2 significa que ya termino las preugntas
            y estas te muestarn el resultado final de lo obtenido que pasa todas las preugntas 
            para poder en la clase de result calcular el resultado final.
          */}
          {this.state.actual === -2 && (
            <Result questions={this.state.questions} />
          )}
        </div>
      </div>
    );
  }

  /**
   * funcion standar de react.js que se corre depsues de mostara ya todo el contenido
   * solo una ves que ya este montado en pantalla, lo que hace esta funcion
   * es acutlaizar el tamano de la patnalla para centra las tarjetas (1 ves)
   */
  componentDidMount() {
    this.changeCard();
  }

  /**
   * funcion standar de react.js que se corre depsues de mostara ya todo el contenido
   * solo una ves que ya este montado en pantalla, lo que hace esta funcion
   * es acutlaizar el tamano de la patnalla para centra las tarjetas (varias veces)
   */
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

  /**
   *
   * @param {int} val lo que almacena es la respuesta seleccionada de la preugnta
   * es la funcion porp que se le pasa a la clase Question
   */
  storeAnswer(val) {
    var tmp = this.state.questions;
    tmp[this.state.actual].selected = val;
    this.setState({ questions: tmp });
  }

  /**
   * lo que hace es que renderar la siguiente pregunta tiene 2 ifs
   * el piremo es para detectar si no es la ultima preugnta de la ruta
   * asi que sigue con si camino normal incrementa la ruta +1 para poder
   * mostar la siguente preugnta
   * el segundo if es paradetectar si es la ultima preunta asi que
   * cambai el valor acutal a -2 para poder mostar el mensaje final en el siguente click
   */
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

  /**
   * la funcion regresa utiliza un if que si es diferente de la primera ruta no hace nada
   * no lo deja regresar a la pantalla de welcome y si no es la primera sigue regresando
   * a la pregunta anterior
   */
  regresar() {
    if (this.state.actual !== this.state.route[0]) {
      var i = this.state.route.indexOf(this.state.actual);
      this.setState({ actual: this.state.route[i - 1] });
    }
  }
}

export default App;
