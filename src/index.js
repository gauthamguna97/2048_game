import React from "react";
import ReactDOM from "react-dom";
import Game from "./component/playingbox.js";

import "./styles.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      start: false,
      type: [
        { id: "3 x 3", length: 3 },
        { id: "4 x 4", length: 4 },
        { id: "5 x 5", length: 5 }
      ],
      length: 0
    };
  }

  setstart(item) {
    this.setState({
      length: item.length,
      start: true
    });
  }
  render() {
    const { start, type, length } = this.state;
    return (
      <div className="App" id="GameArena">
        <h1>2048</h1>
        <div style={{ display: "table" }}>
          {type.map(item => (
            <div
              className="startGame"
              onClick={() => this.setstart(item)}
              id="start"
              style={{ display: "table-cell" }}
            >
              {item.id}
            </div>
          ))}
        </div>
        {start && length && <Game start={start} length={length} />}
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
