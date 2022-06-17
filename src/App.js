import logo from "./logo.svg";
import "./App.css";
import { Switch, Route } from "react-router-dom";

// API base level https://www.dnd5eapi.co/
// additional API information https://www.dnd5eapi.co/docs/#get-/api/proficiencies/-index-

function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route>
          <Home />
        </Route>
        <Route>
          <CharcterCreator />
        </Route>
        <Route>
          <CharcterSelection />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
