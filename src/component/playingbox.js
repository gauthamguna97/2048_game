import React from "react";

export default class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      tableList: [],
      GameOver: false
    };
    this.randomRow = "";
    this.randomColumn = "";
    this.color = [
      "white",
      "#B8D81A",
      "#88B3C3",
      "#F79B11",
      "#FB1478",
      "#1424FB",
      "#0C4C0A",
      "Brown",
      "Black"
    ];
    this.randrow = [];
    this.change = false;
    this.Game = "";
    this.final_X = "";
    this.final_Y = "";
    this.eventData = {};
    this.minDist = 150;
    this.findDirection = this.findDirection.bind(this);
    this.finaltime = "";
    this.starttime = "";
  }

  componentDidMount() {
    const { start, length } = this.props;
    if (start && length) {
      let { tableList } = this.state;
      if (length === 3) {
        tableList = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
      } else if (length === 4) {
        tableList = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
      } else if (length === 5) {
        tableList = [
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0]
        ];
      }
      this.randomRow = Math.ceil(Math.random() * length);
      this.randomColumn = Math.ceil(Math.random() * length);
      tableList[this.randomRow - 1][this.randomColumn - 1] = 2;
      console.log(tableList, this.randomRow, this.randomColumn);
      this.setState(
        {
          tableList
        },
        () => {
          this.Game = document.getElementById("GameArena");
          this.Game.addEventListener(
            "touchstart",
            event => {
              event.preventDefault();
              console.log(event);
              this.eventData = event.changedTouches[0];
              this.startX = this.eventData.pageX;
              this.startY = this.eventData.pageY;
              this.starttime = new Date().getTime();
            },
            false
          );
          this.Game.addEventListener(
            "touchend",
            event => {
              event.preventDefault();
              console.log(event);
              this.eventData = event.changedTouches[0];
              this.finalX = Math.abs(this.eventData.pageX - this.startX);
              this.finalY = Math.abs(this.eventData.pageY - this.startY);
              this.final_X = this.eventData.pageX - this.startX;
              this.final_Y = this.eventData.pageY - this.startY;
              this.finaltime = new Date().getTime() - this.starttime;
              console.log(
                "event",
                this.finalX,
                this.finalY,
                this.final_X,
                this.final_Y,
                this.starttime,
                this.finaltime
              );
              this.findDirection();
            },
            false
          );
        }
      );
    }
  }

  findDirection() {
    console.log("finding direction", this.finalX, this.finalY);
    let dir = "none";
    if (this.finaltime > 1000) return;
    if (this.finalX > this.finalY) {
      if (this.final_X < 0 && Math.abs(this.finalX) > 20) {
        dir = "Left";
      } else if (Math.abs(this.finalX) > 20) {
        dir = "Right";
      }
    } else if (this.finalX < this.finalY) {
      if (this.final_Y < 0 && Math.abs(this.finalY) > 20) {
        dir = "Up";
      } else if (Math.abs(this.finalY) > 20) {
        dir = "Down";
      }
    }
    console.log("dir", dir);
    if (dir === "none") return;
    this.settable(dir);
  }
  componentWillReceiveProps(np) {
    console.log("np", np);
    if (np.start && np.length) {
      let { tableList } = this.state;
      if (np.length === 3) {
        tableList = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
      } else if (np.length === 4) {
        tableList = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
      } else if (np.length === 5) {
        tableList = [
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0]
        ];
      }
      this.randomRow = Math.ceil(Math.random() * np.length);
      this.randomColumn = Math.ceil(Math.random() * np.length);
      tableList[this.randomRow - 1][this.randomColumn - 1] = 2;
      console.log(tableList, this.randomRow, this.randomColumn);
      this.setState({
        tableList
      });
    }
  }

  calculatenewRowRight(row, i, next) {
    if (i !== row.length - 1) {
      console.log("row", row, i, next);
      let _row = row;
      let _next = next;
      if (
        row[i + 1] === row[i] &&
        row[i + 1] !== 0 &&
        next &&
        !(i + 2 < row.length && row[i + 2] === row[i])
      ) {
        _row[i + 1] = 2 * row[i];
        if (i - 1 >= 0) {
          for (var j = i; j > 0; j--) {
            _row[j] = _row[j - 1];
          }
          _row[0] = 0;
        } else {
          _row[i] = 0;
        }
        _next = false;
        this.change = true;
        console.log("this.isChange", this.change);
      } else if (row[i + 1] === 0) {
        _row[i + 1] = row[i];
        if (row[i] !== 0) {
          this.change = true;
        }
        if (i - 1 >= 0) {
          for (var j = i; j > 0; j--) {
            _row[j] = _row[j - 1];
            if (_row[j] !== 0) {
              this.change = true;
            }
          }
          _row[0] = 0;
        } else {
          _row[i] = 0;
        }
      }
      this.calculatenewRowRight(_row, i + 1, _next);
    }
    return row;
  }

  calculatenewRow(row, i, next) {
    if (i !== 0) {
      let _row = row;
      let _next = next;
      if (
        row[i - 1] === row[i] &&
        row[i - 1] !== 0 &&
        next &&
        !(i - 2 >= 0 && row[i] === row[i - 2])
      ) {
        _row[i - 1] = 2 * row[i];
        if (i + 1 <= row.length - 1) {
          for (var j = i; j < row.length - 1; j++) {
            _row[j] = _row[j + 1];
          }
          _row[row.length - 1] = 0;
        } else {
          _row[i] = 0;
        }
        this.change = true;
        console.log("this.isChange", this.change);
        _next = false;
      } else if (row[i - 1] === 0) {
        _row[i - 1] = row[i];
        if (row[i] !== 0) {
          this.change = true;
        }
        if (i + 1 <= row.length - 1) {
          for (var j = i; j < row.length - 1; j++) {
            _row[j] = _row[j + 1];
            if (_row[j]) {
              this.change = true;
            }
          }
          _row[row.length - 1] = 0;
        } else {
          _row[i] = 0;
        }
        console.log("this.isChange", this.change);
      }
      this.calculatenewRow(_row, i - 1, _next);
    }
    for (var i = 1; i < row.length; i++) {}
    return row;
  }

  transpose(input) {
    let newArray = [];
    for (var i = 0; i < input.length; i++) {
      newArray.push([]);
    }
    for (var i = 0; i < input.length; i++) {
      for (var j = 0; j < input.length; j++) {
        newArray[j].push(input[i][j]);
      }
    }
    return newArray;
  }

  checkisGameOver(array) {
    for (var a = 0; a < array.length; a++) {
      for (var b = 0; b < array.length; b++) {
        if (array[a][b] === 0) {
          return false;
        } else if (b + 1 < array.length && array[a][b + 1] === array[a][b]) {
          return false;
        } else if (a + 1 < array.length && array[a + 1][b] === array[a][b]) {
          return false;
        }
      }
    }
    return true;
  }

  settable(button) {
    let { tableList } = this.state;
    let newList = tableList;
    console.log(tableList, button);
    if (button === "Left") {
      for (var i = 0; i < tableList.length; i++) {
        newList[i] = this.calculatenewRow(
          tableList[i],
          tableList.length - 1,
          true
        );
      }
    } else if (button === "Right") {
      for (var i = 0; i < tableList.length; i++) {
        newList[i] = this.calculatenewRowRight(tableList[i], 0, true);
      }
    } else if (button === "Up") {
      tableList = this.transpose(tableList);
      for (var i = 0; i < tableList.length; i++) {
        newList[i] = this.calculatenewRow(
          tableList[i],
          tableList.length - 1,
          true
        );
      }
      newList = this.transpose(newList);
    } else {
      tableList = this.transpose(tableList);
      for (var i = 0; i < tableList.length; i++) {
        newList[i] = this.calculatenewRowRight(tableList[i], 0, true);
      }
      newList = this.transpose(newList);
    }

    if (this.change) {
      newList.forEach((item, index) => {
        item.forEach((_item, _index) => {
          if (_item === 0) {
            this.randrow.push(_index * 10 + index);
          }
        });
      });
      const number = Math.ceil(Math.random() * this.randrow.length);
      const tablerc = this.randrow[number - 1];
      console.log("tblerc", tablerc, this.randrow);
      this.randrow = [];
      newList[tablerc % 10][Math.floor(tablerc / 10)] = 2;
      console.log(tableList);
      this.setState({
        tableList: newList
      });
      this.change = false;
    }
    console.log("this.isGameOver", this.isGameOver);
    if (this.checkisGameOver(newList)) {
      this.setState({
        GameOver: true
      });
    }
  }
  render() {
    const { tableList, GameOver } = this.state;
    return (
      <div>
        <div className="GameOver">{GameOver && <div>Game Over</div>}</div>
        <div className="Game" id="GameArena">
          {
            <table align="center">
              {tableList.map((item, index) => (
                <tr>
                  {item.map((_item, _index) => (
                    <td
                      id={`${index}0${_index}`}
                      style={{
                        backgroundColor: this.color[
                          Math.log(_item) / Math.log(2) < 1
                            ? 0
                            : Math.log(_item) / Math.log(2)
                        ],
                        color: "white"
                      }}
                    >
                      {_item}
                    </td>
                  ))}
                </tr>
              ))}
            </table>
          }
        </div>
      </div>
    );
  }
}
