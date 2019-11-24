import React from "react";
import "./App.css";
import AppRouter from "./utils/routers"

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <AppRouter  />
      </div>
    );
  }
}

export default App;
