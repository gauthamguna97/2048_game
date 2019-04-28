import React from "react";
import ReactDOM from "react-dom";
import Game from "./component/playingbox.js";

import "./styles.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      start: false
    };
  }

  setstart() {
    this.setState({
      start: true
    });
  }
  render() {
    const { start } = this.state;
    return (
      <div className="App">
        <h1>2048</h1>
        <div className="startGame" onClick={() => this.setstart()} id="start">
          Start
        </div>
        <Game start={start} />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
