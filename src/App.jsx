import React, { lazy, Suspense, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

// Pages----------
import Header from "./component/header/Header";
import SignInOutPage from "./pages/sign-in-out-page/Sign-in-out-page";
//課程----------
import Courses from "./pages/courses-page/Courses";
import Coaches from "./pages/coaches-page/Coaches";
//教練中心-----------
import EmployeeFormPage from "./pages/employee-form-page/EmployeeFormPage";
import EmployeeCenterPage from "./pages/employee-center-page/EmployeeCenterPage";
import EmployeeSignInOutPage from "./pages/employee-sign-in-out-page/employee-sign-in-out-page";
//討論區-----------
import Articles from "./pages/articles-page/Articles";
import ArticlesAdd from "./pages/articles-add-page/ArticlesAdd";
import ArticlesPreview from "./pages/articles-preview-page/ArticlesPreview";
import ArticlesEdit from "./pages/articles-edit-page/ArticlesEdit";
import ArticlesUpdate from "./pages/articles-update-page/ArticlesUpdate";

// 訂單----------
import OrderList from "./pages/orders-list-page/OrderList";
import OrderListDetail from "./component/OrderList/OrderListDetail";
import CartList from "./component/Order-CartList/CartList";
import CheckOutPage from "./component/Order-CheckOutPage/CheckOutPage";
import OrderCompleted from "./component/OrderCompleted/OrderCompleted";

import HomePage from "./pages/HomePage/Home";
// Component------
import LoadingSpinner from "./component/loading-spinner/LoadingSpinner";
import ErrorBoundary from "./component/error-boundary/ErrorBoundary";

// Redux
import { userListStart } from "./redux/user/user-action";
import { employeeListStart } from "./redux/employee/employee-action";

import "./App.scss";

// react lazy
const ShopPage = lazy(() => import("./pages/shop-page/ShopPage"));
const ShopCollectionPage = lazy(() =>
  import("./pages/shop-collection-page/ShopCollectionPage")
);
const ShopItemPage = lazy(() => import("./pages/shop-item-page/ShopItemPage"));
// -----------

// APP component
const App = ({ userListStart, employeeListStart }) => {
  useEffect(() => {
    userListStart();
    employeeListStart();
  }, [userListStart, employeeListStart]);

  return (
    <div>
      <Header />
      <div className="space" />
      <main>
        <Switch>
          <ErrorBoundary>
            <Suspense fallback={<LoadingSpinner />}>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/shopping" component={ShopPage} />
              <Route
                exact
                path="/shop/:collection?/:itemType?"
                component={ShopCollectionPage}
              />
              <Route
                path="/shopitem/:collection/:itemId"
                component={ShopItemPage}
              />
              <Route path="/login" component={SignInOutPage} />

              {/* lora */}
              <Route path="/employeeform" component={EmployeeFormPage} />
              <Route
                path={`/employeecenter/:employeeId`}
                component={EmployeeCenterPage}
              />
              <Route path="/employeelogin" component={EmployeeSignInOutPage} />

              {/* 玉玲 */}
              <Route path="/coaches" component={Coaches} />
              <Route path="/courses" component={Courses} />

              {/* ＣhrisLin */}
              <Route exact path="/articles" component={Articles} />
              <Route path="/articles/:articleId" component={ArticlesPreview} />
              <Route path="/articlesAdd" component={ArticlesAdd} />
              <Route path="/articlesEdit" component={ArticlesEdit} />
              <Route path="/articlesUpdate/:articleId" component={ArticlesUpdate} />
              



              {/* Darren測試用 */}
              <Route path="/OrderList" component={OrderList} />
              <Route path="/CartList" component={CartList} />
              <Route path="/OrderListDetail" component={OrderListDetail} />
              <Route path="/CheckOutPage" component={CheckOutPage} />
              <Route path="/OrderCompleted" component={OrderCompleted} />
            </Suspense>
          </ErrorBoundary>
        </Switch>
      </main>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  userListStart: () => dispatch(userListStart()),
  employeeListStart: () => dispatch(employeeListStart()),
});

export default connect(null, mapDispatchToProps)(App);
