import React, { Component } from "react";
import career from "./carreras";

export default class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {
      career //arreglo donde se almacenan las carreras dadas de alta
    };
  }

  /**
   * estaa funcon sirve para cacular el resultado mayor y mostar la
   * carrera final por asi decirlo
   */
  componentWillMount() {
    var actual_career = this.props.questions[0].career;
    var matrix = [];
    var tmp = [];

    /**
     * converitmos el arreglo de 1 dimension que pasaron como porp
     * a un arreglo de 2 dimensiones apr poder hacer un for anidado
     */
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

    /**
     * for anidado para poder encontrar un arreglo temporal de valores
     */
    tmp = this.state.career;
    matrix.forEach(ele => {
      var score = 0;
      ele.forEach(ele => (score += ele.selected));
      tmp[ele[0].career].score = score;
    });

    //recorremos el arreglo para poder obtner las carreras con mayor score
    var highest = [];
    var highest_score = 0;
    for (var key in tmp) {
      if (tmp[key].score > highest_score && highest.length === 0) {
        highest_score = tmp[key].score;
        highest.push(tmp[key]);
      } else if (tmp[key].score > highest_score && highest.length > 0) {
        highest = [tmp[key]];
        highest_score = tmp[key].score;
      } else if (tmp[key].score === highest_score) {
        highest.push(tmp[key]);
      }
    }

    this.setState({ career: tmp, results: highest });
  }

  /**
   * funcion estandear que meustar los resultados
   */
  render() {
    return <div>{this.results()}</div>;
  }

  /**
   * muestar cada una de las carreras que fuerion las de mayor puntaje
   */
  results() {
    if (this.state.results !== undefined) {
      return this.state.results.map((item, index) => {
        console.log(item);
        return (
          <div key={index}>
            <h1
              style={{
                fontFamily: "monospace",
                fontSize: 30,
                marginBottom: 20
              }}
            >
              {item.titulo}
            </h1>
            <div className="row">
              <div className="column">
              <a href={item.link} target={"_blank"}>
                <img  
                  key={index}
                  src={item.image}
                  alt=""
                  style={{ height: "70%", width: "70%"  }}
                />
              </a>
              </div>
              <div
                className="column"
                style={{ textAlign: "left" }}
                dangerouslySetInnerHTML={{ __html: item.body }}
              />
            </div>
          </div>
        );
      });
    } else {
      return <p>loading...</p>;
    }
  }
}
