import React from "react";
import Page1 from "./components/page1/page1";
import Page2 from "./components/page2/page2";
import Page3 from "./components/page3/page3";
import Page4 from "./components/page4/page4";
import "./App.css";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: "/initial",
      phone: undefined,
      email: undefined,
      nickname: undefined,
      name: undefined,
      sername: undefined,
      sex: undefined,
      childrens: [],
      advantages: {},
      selectedCheckboxes: [],
      selectedRadio: 0,
      id: 1,
      textarea: "",
      modal: false,
      success: false,
    };
  }

  setRoute = (route) => {
    if (route == "/fourthStep") {
      this.setState({ modal: true });
    }
    this.setState({
      route: route,
    });
  };

  setData = (data) => {
    this.setState(data);
  };

  addBlock = () => {
    this.setState({
      childrens: [...this.state.childrens, this.state.id],
      id: this.state.id + 1,
    });
  };

  removeBlock = (id) => {
    this.setState({ childrens: this.state.childrens.filter((el) => el != id) });
  };

  sendData = async () => {
    const self = this,
      data = { ...this.state };
    [("id", "modal", "success", "childrens", "route")].map(
      (el) => delete data[el]
    );

    const advantages = this.state.advantages;
    data["advantages"] = Object.keys(advantages).map((key) => advantages[key]);

    Object.keys(data).map((key) => {
      if (key.indexOf("field-advatages") != -1) delete data[key];
    });

    await axios
      .post("https://api.sbercloud.ru/content/v1/bootcamp/frontend", data)
      .then(() => {
        self.setState({ success: true, modal: true });
      })
      .catch(() => {
        self.setState({ modal: true });
      });
  };

  render() {
    let view = (
      <Page1
        setRoute={this.setRoute}
        setData={this.setData}
        phone={this.state.phone}
        email={this.state.email}
      />
    );

    switch (this.state.route) {
      case "/create":
        view = (
          <Page2
            setRoute={this.setRoute}
            setData={this.setData}
            nickname={this.state.nickname}
            name={this.state.name}
            sername={this.state.sername}
            sex={this.state.sex}
          />
        );
        break;
      case "/secondStep":
        view = (
          <Page3
            setRoute={this.setRoute}
            childrens={this.state.childrens}
            addBlock={this.addBlock}
            removeBlock={this.removeBlock}
            setData={this.setData}
            advantages={this.state.advantages}
            selectedCheckboxes={this.state.selectedCheckboxes}
            selectedRadio={this.state.selectedRadio}
          />
        );
        break;
      case "/thirdStep":
        view = (
          <Page4
            setRoute={this.setRoute}
            setData={this.setData}
            sendData={this.sendData}
            textarea={this.state.textarea}
          />
        );
        break;
    }

    return (
      <div>
        {view}
        {this.state.modal ? (
          <div className="main-modal">
            <div className="modal">
              <p>
                {this.state.success ? (
                  "Форма успешно отправлена"
                ) : (
                  <div className="err-text">
                    <p>Ошибка</p>
                  </div>
                )}
              </p>
              <img
                src={
                  this.state.success ? "images/success.svg" : "images/error.svg"
                }
                alt={this.state.success ? "Success" : "Error"}
              />
              <button
                className={this.state.success ? "success-button" : "err-button"}
                id={this.state.success ? "button-to-main" : "button-close"}
                type="button"
                onClick={() => {
                  if (this.state.success) {
                    this.setRoute("/initial");
                  }

                  this.setState({ modal: false });
                }}
              >
                {this.state.success ? "На главную" : "Закрыть"}
              </button>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default App;
