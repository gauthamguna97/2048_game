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
  }
  render() {
    const { buttonList, tableList } = this.state;
    return (
      <div>
        {buttonList.map(item => (
          <button id={item.txt}>{item.txt}</button>
        ))}
        {
          <table>
            {tableList.map(item => (
              <tr>
                {item.map(_item => (
                  <td>{_item}</td>
                ))}
              </tr>
            ))}
          </table>
        }
      </div>
    );
  }
}
