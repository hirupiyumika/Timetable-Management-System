import React, { Component } from "react";
import { ipcRenderer } from "electron";

const LogContext = React.createContext();
class LogProvider extends Component {
  state = {
    logs: [],
    alert: {
      show: false,
      message: "",
      variant: "success",
    },
  };

  // delete item
  deleteItem(_id) {
    ipcRenderer.send("logs:delete", _id);
    showAlert("Log Removed");
  }

  // add item

  addItem(item) {
    if (item.user === "" || item.text === "" || item.priority === "") {
      showAlert("please enter all fields", "danger");
      return false;
    }

    ipcRenderer.send("logs:add", item);
    showAlert("Log Added");
  }

  // show alert
  showAlert(message, variant = "success", seconds = 3000) {
    this.setState({ alert: { show: true, message, variant } });

    setTimeout(() => {
      this.setState({
        alert: { show: false, message: "", variant: "success" },
      });
    }, seconds);
  }

  // populate logs
  populateLogs() {
    try {
      ipcRenderer.send("logs:load");
      ipcRenderer.on("logs:get", (e, logs) => {
        this.setState({ logs: JSON.parse(logs) });
        // console.log(this.state.logs);
      });
    } catch (ex) {}
  }

  componentDidMount = () => {
    this.populateLogs();
    ipcRenderer.on("logs:clear", () => {
      this.setState({ logs: [] });
      showAlert("Logs Cleared");
    });
  };
  render() {
    return (
      <LogContext.Provider
        value={{
          ...this.state,
          showAlert: this.showAlert,
          deleteItem: this.deleteItem,
          addItem: this.addItem,
        }}
      >
        {this.props.children}
      </LogContext.Provider>
    );
  }
}

const LogConsumer = LogContext.Consumer;
export { LogProvider, LogConsumer, LogContext };
