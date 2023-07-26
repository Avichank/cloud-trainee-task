import React from "react";
import "./page1.css";
import ReactInputMask from "react-input-mask";

class Page1 extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.setRoute("/create");
  };

  saveData = (e) => {
    const data = {};
    data[e.target.name] = e.target.value;
    this.props.setData(data);
  };

  render() {
    const name = "Павел Баженов",
      icon = <img src="images/folder.svg" alt="Folder Icon" />;

    return (
      <div className="main-screen page-1">
        <div style={{ display: "flex" }}>
          <div className="circle">{name.split(" ").map((word) => word[0])}</div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div className="text-about">
              <p className="name-text">{name}</p>
              <nav className="nav">
                <div className="link">
                  {icon}
                  <a href="https://t.me/Avichank">Telegram</a>
                </div>
                <div className="link">
                  {icon}
                  <a href="https://github.com/Avichank">GitHub</a>
                </div>
                <div className="link">
                  {icon}
                  <a href="https://hh.ru/applicant/resumes/view?resume=264965f3ff0b38a5600039ed1f7638516f6149">Resume</a>
                </div>
              </nav>
            </div>
          </div>
        </div>
        <div className="line"></div>
        <form onSubmit={this.handleSubmit}>
          <div className="form">
            <div className="number-place">
              <p>Номер телефона</p>
              <ReactInputMask
                type="tel"
                name="phone"
                placeholder="+7 999 999-99-99"
                mask="+7 (999) 999-99-99"
                pattern="\+7 \([0-9]{3}\) [0-9]{3}-[0-9]{2}-[0-9]{2}"
                minLength={18}
                required
                defaultValue={this.props.phone}
                onChange={(e) => this.saveData(e)}
              />
            </div>
          </div>
          <div className="form">
            <div className="number-place">
              <p>Email</p>
              <input
                type="email"
                placeholder="tim.jennings@example.com"
                required
                name="email"
                defaultValue={this.props.email}
                onChange={(e) => this.saveData(e)}
              />
            </div>
          </div>
          <button
            id="button-start"
            className="start-button button-page1"
            type="submit"
          >
            Начать
          </button>
        </form>
      </div>
    );
  }
}

export default Page1;
