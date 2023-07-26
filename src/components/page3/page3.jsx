import React from "react";
import "./page3.css";

class Checkbox extends React.Component {
  render() {
    return (
      <div className="checkbox">
        <input
          type="checkbox"
          name="checkbox"
          id={`field-checkbox-group-option-${this.props.id}`}
          defaultChecked={this.props.defaultChecked}
          onChange={(e) => {
            if (e.target.checked) {
              if (this.props.selectedCheckboxes.indexOf(this.props.id) == -1) {
                this.props.onChange({
                  selectedCheckboxes: [
                    ...this.props.selectedCheckboxes,
                    this.props.id,
                  ],
                });
              }
            } else {
              this.props.onChange({
                selectedCheckboxes: this.props.selectedCheckboxes.filter(
                  (el) => el != this.props.id
                ),
              });
            }
          }}
        />
        <p>{this.props.id}</p>
      </div>
    );
  }
}

class Radio extends React.Component {
  render() {
    return (
      <div className="radio">
        <input
          type="radio"
          name="radio"
          id={`field-radio-group-option-${this.props.id}`}
          defaultChecked={this.props.defaultChecked}
          onChange={() => this.props.onChange({ selectedRadio: this.props.id })}
        />
        <p>{this.props.id}</p>
      </div>
    );
  }
}

class Block extends React.Component {
  saveData = (e) => {
    const data = this.props.advantages;
    data[e.target.name] = e.target.value;
    this.props.onChange(data);
  };

  render() {
    const id = this.props.id;
    return (
      <div className="advantage" id={`block-${id}`} key={id}>
        <input
          type="text"
          name={`field-advatages-${id}`}
          id={`field-advatages-${id}`}
          onChange={(e) => this.saveData(e)}
          defaultValue={this.props.defaultValue}
          required
        />
        <img
          src="images/recycleBin.svg"
          alt="Recycle Bin"
          style={{ marginLeft: "18.5px" }}
          id={`button-remove-${id}`}
          onClick={() => this.props.removeBlock(id)}
        />
      </div>
    );
  }
}

class Page3 extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.setRoute("/thirdStep");
  };

  render() {
    return (
      <div className="main-screen">
        <div className="container">
        <div className="bar bar-page3">
            <img src="images/progress/bar2.svg" alt="Progress bar" />
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <p className="blue">1</p>
              <p className="blue">2</p>
              <p className="gray">3</p>
            </div>
          </div>
          <p className="vis760">Third step</p>
          <form onSubmit={this.handleSubmit}>
            <div>
              <p>Advantages</p>
              <div id="list-advantages">
                {this.props.childrens.map((id, key) => (
                  <Block
                    key={key}
                    id={id}
                    defaultValue={
                      this.props.advantages
                        ? this.props.advantages[`field-advatages-${id}`]
                        : undefined
                    }
                    advantages={this.props.advantages}
                    onChange={this.props.setData}
                    removeBlock={this.props.removeBlock}
                  />
                ))}
              </div>
              <button id='button-add' className='button-plus' type="button" onClick={() => this.props.addBlock()}>
                <img src="images/plus.svg" alt="Plus" />
              </button>
            </div>
            <div className="checkboxes">
              <p>Checkbox group</p>
              {[1, 2, 3].map((el, i) => (
                <Checkbox
                  key={i}
                  id={el}
                  onChange={this.props.setData}
                  selectedCheckboxes={this.props.selectedCheckboxes}
                  defaultChecked={
                    this.props.selectedCheckboxes.indexOf(el) != -1
                  }
                />
              ))}
            </div>
            <div className="radios">
              <p>Radio group</p>
              {[1, 2, 3].map((el, i) => (
                <Radio
                  key={i}
                  id={el}
                  onChange={this.props.setData}
                  defaultChecked={el == this.props.selectedRadio}
                />
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                id="button-back"
                className="end-button"
                type="submit"
                onClick={() => this.props.setRoute("/create")}
              >
                Назад
              </button>
              <button
                id="button-next"
                className="start-button"
                type="submit"
                //onClick={() => this.props.setRoute("/thirdStep")}
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

export default Page3;
