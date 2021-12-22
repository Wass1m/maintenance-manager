import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <header className="App-header">Hello World</header>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
