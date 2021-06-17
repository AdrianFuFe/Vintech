import { React } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { TokenContextProvider } from "./components/TokenContextProvider";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import CategoriesPage from "./pages/CategoriesPage";
import HomePage from "./pages/HomePage";
import MyUserPage from "./pages/MyUserPage";
import MyRatingPage from "./pages/MyRatingPage";

function App() {
  return (
    <div className="App">
      <Router>
        <TokenContextProvider>
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route exact path="/register">
              <RegisterPage />
            </Route>
            <Route exact path="/login">
              <LoginPage />
            </Route>
            <Route exact path="/categories">
              <CategoriesPage />
            </Route>
            <Route exact path="/user/:id/my-profile">
              <MyUserPage />
            </Route>
            <Route exact path="/user/:id/my-rating">
              <MyRatingPage />
            </Route>
          </Switch>
        </TokenContextProvider>
      </Router>
    </div>
  );
}

export default App;
