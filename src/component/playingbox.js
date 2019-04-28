import React from "react";

export default class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      buttonList: [
        { txt: "Left" },
        { txt: "Right" },
        { txt: "Up" },
        { txt: "Down" }
      ],
      tableList: [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
    };
    this.randomRow = "";
    this.randomColumn = "";
    this.color = [
      "white",
      "Yellow",
      "GreenYellow",
      "Orange",
      "IndianRed",
      "Blue",
      "Indigo",
      "Brown",
      "Black"
    ];
    this.marktable = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    this.randrow = [];
  }

  componentWillReceiveProps(np) {
    console.log(np);
    if (np.start) {
      this.randomRow = Math.ceil(Math.random() * 3);
      this.randomColumn = Math.ceil(Math.random() * 3);
      let { tableList } = this.state;
      tableList = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
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
      if (row[i + 1] === row[i] && row[i + 1] !== 0 && next) {
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
      } else if (row[i + 1] === 0) {
        _row[i + 1] = row[i];
        if (i - 1 >= 0) {
          for (var j = i; j > 0; j--) {
            _row[j] = _row[j - 1];
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
      if (row[i - 1] === row[i] && row[i - 1] !== 0 && next) {
        _row[i - 1] = 2 * row[i];
        if (i + 1 <= row.length - 1) {
          for (var j = i; j < row.length - 1; j++) {
            _row[j] = _row[j + 1];
          }
          _row[row.length - 1] = 0;
        } else {
          _row[i] = 0;
        }
        _next = false;
      } else if (row[i - 1] === 0) {
        _row[i - 1] = row[i];
        if (i + 1 <= row.length - 1) {
          for (var j = i; j < row.length - 1; j++) {
            _row[j] = _row[j + 1];
          }
          _row[row.length - 1] = 0;
        } else {
          _row[i] = 0;
        }
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

  settable(button) {
    let { tableList } = this.state;
    let newList = tableList;
    console.log(tableList, button);
    if (button === "Left") {
      for (var i = 0; i < tableList.length; i++) {
        newList[i] = this.calculatenewRow(tableList[i], 2, true);
      }
    } else if (button === "Right") {
      for (var i = 0; i < tableList.length; i++) {
        newList[i] = this.calculatenewRowRight(tableList[i], 0, true);
      }
    } else if (button === "Up") {
      tableList = this.transpose(tableList);
      for (var i = 0; i < tableList.length; i++) {
        newList[i] = this.calculatenewRow(tableList[i], 2, true);
      }
      newList = this.transpose(newList);
    } else {
      tableList = this.transpose(tableList);
      for (var i = 0; i < tableList.length; i++) {
        newList[i] = this.calculatenewRowRight(tableList[i], 0, true);
      }
      newList = this.transpose(newList);
    }
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
  }
  render() {
    const { buttonList, tableList } = this.state;
    return (
      <div>
        {buttonList.map(item => (
          <button id={item.txt} onClick={() => this.settable(item.txt)}>
            {item.txt}
          </button>
        ))}
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
    );
  }
}
