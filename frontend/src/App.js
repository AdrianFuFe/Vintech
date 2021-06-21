import { React } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { TokenContextProvider } from "./components/TokenContextProvider";
import RegisterPage from "./pages/RegisterPage";
import WelcomePage from "./pages/WelcomePage";
import LoginPage from "./pages/LoginPage";
import CategoriesPage from "./pages/CategoriesPage";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import EditUserPage from "./pages/EditUserPage";
import MyRatingPage from "./pages/MyRatingPage";
import MyProductsPage from "./pages/MyProductsPage";
import MyHistoryPage from "./pages/MyHistoryPage";
import MyConfigPage from "./pages/MyConfigPage";
import ChangePwdPage from "./pages/ChangePwdPage";
import UserProductsPage from "./pages/UserProductsPage"
import UploadProductPage from "./pages/UploadProductPage";
import ProductPage from "./pages/ProductPage";
import SearchPage from "./pages/SearchPage";
import EditProductPage from "./pages/EditProductPage";

function App() {
  return (
    <div className="App">
      <Router>
        <TokenContextProvider>
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route exact path="/products">
              <SearchPage />
            </Route>
            <Route exact path="/product/:id/edit-product">
              <EditProductPage />
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
            <Route exact path="/user/:id">
              <UserPage />
            </Route>
            <Route exact path="/user/:id/onsale-products">
              <UserProductsPage />
            </Route>
            <Route exact path="/user/:id/edit-profile">
              <EditUserPage />
            </Route>
            <Route exact path="/user/:id/my-ratings">
              <MyRatingPage />
            </Route>
            <Route exact path="/user/:id/my-products">
              <MyProductsPage />
            </Route>
            <Route exact path="/user/:id/my-history">
              <MyHistoryPage />
            </Route>
            <Route exact path="/user/:id/my-config">
              <MyConfigPage />
            </Route>
            <Route exact path="/user/:id/pwd">
              <ChangePwdPage />
            </Route>
            <Route exact path="/upload-product">
              <UploadProductPage />
            </Route>
            <Route exact path="/product/:id">
              <ProductPage />
            </Route>
          </Switch>
        </TokenContextProvider>
      </Router>
    </div>
  );
}

export default App;
