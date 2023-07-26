import React from "react";
import "./page4.css";

class Page4 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 200,
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.sendData();
  };

  handleText = (value) => {
    this.setState({ count: 200 - value.replaceAll(" ", "").length });
    this.props.setData({ textarea: value });
  };

  componentDidMount = () => {
    this.handleText(document.getElementById("field-about").value);
  };

  autoResize = (e) => {
    const el = e.target;
    el.setAttribute(
      "style",
      "height:" + el.scrollHeight + "px;overflow-y:hidden;"
    );
  };

  render() {
    return (
      <div className="main-screen">
        <div className="container">
        <div className="bar bar-page4">
            <img src="images/progress/bar3.svg" alt="Progress bar" />
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <p className="blue">1</p>
              <p className="blue">2</p>
              <p className="blue">3</p>
            </div>
          </div>
          <p className="vis760">Third step</p>
          <div>
            <form onSubmit={this.handleSubmit}>
              <p>About</p>
              <textarea
                contenteditable
                name="textArea"
                id="field-about"
                placeholder="Placeholder"
                maxLength={(this.state.count === 0 ? 0 : 1000)}
                onChange={(e) => {
                  this.handleText(e.target.value);
                  this.autoResize(e);
                }}
                defaultValue={this.props.textarea}
                required
              ></textarea>
              <div className="footerTextarea">
                <p>Tip</p>
                <h2>{this.state.count}</h2>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button
                  id="button-back"
                  className="end-button"
                  type="submit"
                  onClick={() => this.props.setRoute("/secondStep")}
                >
                  Назад
                </button>
                <button id="button-send" className="start-button" type="submit">
                  Отправить
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Page4;
