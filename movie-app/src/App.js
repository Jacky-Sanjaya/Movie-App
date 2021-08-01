import "./App.css";
import Header from "./components/Header/Header";
import BottomNavigator from "./components/BottomNavigation/BottomNavigator";
import Trending from "./Pages/Trending/Trending";
import Series from "./Pages/Series/Series";
import Movies from "./Pages/Movies/Movies";
import Search from "./Pages/Search/Search";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="index">
      <BrowserRouter>
        <Header />
        <div className="app">
          <div className="grid-container">
            <Switch>
              <Route exact path="/" component={Trending} />
              <Route path="/movies" component={Movies} />
              <Route path="/series" component={Series} />
              <Route path="/search" component={Search} />
            </Switch>
          </div>
        </div>
        <BottomNavigator />
      </BrowserRouter>
    </div>
  );
}

export default App;
