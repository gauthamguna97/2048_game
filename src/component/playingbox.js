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
    this.color = ["white", "blue", "orange", "pink"];
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

  calculatenewRow(row, i, j, next) {
    if (i !== 0) {
      let _row = row;
      let _next = next;
      if (row[i - 1] === row[j] && row[i - 1] !== 0 && next) {
        _row[i - 1] = 2 * row[j];
        _row[j] = 0;
        _next = false;
      } else if (row[i - 1] === 0) {
        row[i - 1] = row[j];
        row[j] = 0;
      }
      this.calculatenewRow(_row, i - 1, j - 1, _next);
    }
    console.log(row, i, j);
    return row;
  }
  settable(button) {
    let { tableList } = this.state;
    let newList = tableList;
    console.log(tableList, button);
    if (button === "Left") {
      for (var i = 0; i < tableList.length; i++) {
        newList[i] = this.calculatenewRow(tableList[i], 2, 2, true);
      }
    } else if (button === "Right") {
    } else if (button === "Up") {
    } else {
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
                      backgroundColor: this.color[_item / 2],
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
