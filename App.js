import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Users from "./user/pages/users";
import MainNavigation from "./shared/components/Navigation/MainNavigation";


const App = () => {
  return (
    <Router>
      <MainNavigation />
        <main>
        <Switch>
          <Route path="/" exact>
            <Users />
          </Route>
          <Redirect to="/" />
        </Switch>
        </main>
    </Router>
  );
};

export default App;
