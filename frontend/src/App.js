import { React } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { TokenContextProvider } from "./components/TokenContextProvider";
import RegisterPage from "./pages/RegisterPage";
import WelcomePage from "./pages/WelcomePage";
import LoginPage from "./pages/LoginPage";
import CategoriesPage from "./pages/CategoriesPage";
import HomePage from "./pages/HomePage";
import MyUserPage from "./pages/MyUserPage";
import EditUserPage from "./pages/EditUserPage";
import UserPage from "./pages/UserPage";
import MyRatingPage from "./pages/MyRatingPage";
import MyProductsPage from "./pages/MyProductsPage";
import MyHistoryPage from "./pages/MyHistoryPage";
import MyConfigPage from "./pages/MyConfigPage";
import UploadProductPage from "./pages/UploadProductPage";

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
            <Route exact path="/welcome">
              <WelcomePage />
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
            <Route exact path="/user/:id/my-profile/edit">
              <EditUserPage />
            </Route>
            <Route exact path="/user/:id">
              <UserPage />
            </Route>
            <Route exact path="/user/:id/my-profile/my-ratings">
              <MyRatingPage />
            </Route>
            <Route exact path="/user/:id/my-profile/my-products">
              <MyProductsPage />
            </Route>
            <Route exact path="/user/:id/my-profile/my-history">
              <MyHistoryPage />
            </Route>
            <Route exact path="/user/:id/my-profile/my-config">
              <MyConfigPage />
            </Route>
            <Route exact path="/upload-product">
              <UploadProductPage />
            </Route>
          </Switch>
        </TokenContextProvider>
      </Router>
    </div>
  );
}

export default App;
