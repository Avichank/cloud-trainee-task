import React from "react";
import "./page2.css";

class Block extends React.Component {
  saveData = (e) => {
    const data = {};
    data[e.target.name] = e.target.value;
    this.props.onChange(data);
  };
  setCustomValidity = (e) => {
    
  }
  render() {
    return (
      <div className="number-place2">
        <p className="capitalize">{this.props.name}</p>
        {!("select" in this.props) ? (
          <input
            type={this.props.type || "text"}
            placeholder="Placeholder"
            oninvalid={this.setCustomValidity('Wow')}
            required
            name={this.props.name}
            defaultValue={this.props.defaultValue}
            id={`field-${this.props.name}`}
            onChange={(e) => this.saveData(e)}
            maxLength={this.props.maxLength}
            pattern={this.props.pattern || null}
          />
        ) : (
          <select
            required
            name={this.props.name}
            defaultValue={this.props.defaultValue}
            id={this.props.id}
            onChange={(e) => this.saveData(e)}
            className={this.props.className}
          >
            {this.props.children}
          </select>
        )}
        <p className="tip">Tip</p>
      </div>
    );
  }
}

class Page2 extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.setRoute("/secondStep");
  };
  render() {
    return (
      <div className="main-screen">
        <div className="container">
          <div className="bar">
            <img src="images/progress/bar1.svg" alt="Progress bar" />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p className="blue">1</p>
              <p className="gray">2</p>
              <p className="gray">3</p>
            </div>
          </div>
          <p className="vis760">Second step</p>
          <form onSubmit={this.handleSubmit}>
            <div className="forms">
              <Block
                name="nickname"
                defaultValue={this.props.nickname}
                onChange={this.props.setData}
                maxLength={30}
                pattern="[0-9a-zA-ZА-Яа-я]+"
              />
              <Block
                name="name"
                defaultValue={this.props.name}
                onChange={this.props.setData}
                maxLength={50}
                pattern="[a-zA-ZА-Яа-я]+"
              />
              <Block
                name="sername"
                defaultValue={this.props.sername}
                onChange={this.props.setData}
                maxLength={50}
                pattern="[a-zA-ZА-Яа-я]+"
              />
              <Block
                name="sex"
                defaultValue={this.props.sex}
                onChange={this.props.setData}
                className="sex-list"
                id="field-sex"
                select
              >
                <option selected disabled hidden className="hidden-option">
                  Не выбрано
                </option>
                <option id="field-sex-option-man" className="opt">
                  <div className="opt">
                    <p>man</p>
                  </div>
                </option>
                <option id="field-sex-option-woman" className="opt">
                  woman
                </option>
              </Block>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                id="button-back"
                className="end-button"
                type="submit"
                onClick={() => this.props.setRoute("/initial")}
              >
                Назад
              </button>
              <button
                id="button-next"
                className="start-button"
                type="submit"
              >
                Далее
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Page2;
