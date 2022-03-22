import { lazy, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useLocation } from "react-router-dom";
import { auth } from "./firebase";
import Checkout from "./pages/Checkout";
import Header from "./components/Layout/Header";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import NotFound from "./pages/NotFound";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Footer from "./components/Layout/Footer";
import Loader from "./components/UI/Loader";
import {
  userActions,
  setUserOrders,
  sendUserCartData,
} from "./store/user-slice";
import { cartActions, setUserCart } from "./store/cart-slice";
import "./App.scss";
import ScrollToTop from "./components/ScrollToTop";

const stripePromise = loadStripe(
  "pk_test_51KJv1gGy4ZQV36EXZJq2RCuZZK8bq7LFGKJHPvg90uBMhUdbFKUYCQoozds0utcFmNvmgzXXjdSSOwaU8y8C2jAT00BevdgEZo"
);
let initial = true;

function App() {
  // lazy loading
  const Orders = lazy(() => import("./pages/Orders"));
  const OrderDetail = lazy(() => import("./pages/OrderDetail"));
  const SearchResults = lazy(() => import("./pages/SearchResults"));
  const Payment = lazy(() => import("./pages/Payment"));
  ///////////////////////////////////////////////////////////////////////
  const location = useLocation();
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  // Check if user is logged in when app starts
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // User is signed IN
        dispatch(
          userActions.setUser({
            uid: authUser.uid,
            username: authUser.displayName,
            email: authUser.email,
          })
        );
        dispatch(setUserCart(authUser));
        dispatch(setUserOrders(authUser));
      } else {
        // User is signed OUT
        dispatch(userActions.setUser(null));
        dispatch(userActions.setOrders([]));
        dispatch(
          cartActions.setCartState({
            items: [],
            totalAmount: 0,
            totalQuantity: 0,
          })
        );
      }
    });
  }, [dispatch]);

  useEffect(() => {
    // Only send cart data to firestore after
    // the app isinitialized & the cart state has changed
    if (initial) {
      initial = false;
      return;
    }

    if (user && cartState.isChanged) {
      dispatch(
        sendUserCartData(user, {
          items: cartState.items,
          totalAmount: cartState.totalAmount,
          totalQuantity: cartState.totalQuantity,
        })
      );
    }
  }, [dispatch, cartState, user]);

  return (
    <div className="app">
      <div className="content">
        {location.pathname !== "/register" &&
          location.pathname !== "/login" &&
          location.pathname !== "/payment" && <Header />}
        <ScrollToTop />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/products/category/:selectedCategory" exact>
            <Products />
          </Route>
          <Route path="/products/:productId" exact>
            <ProductDetail />
          </Route>
          <Route path="/search/:query" exact>
            <Suspense fallback={<Loader />}>
              <SearchResults />
            </Suspense>
          </Route>
          <Route path="/checkout" exact>
            <Checkout />
          </Route>
          <Route path="/orders" exact>
            <Suspense fallback={<Loader />}>
              <Orders />
            </Suspense>
          </Route>
          <Route path="/orders/:orderId" exact>
            <Suspense fallback={<Loader />}>
              <OrderDetail />
            </Suspense>
          </Route>
          <Route path="/payment" exact>
            <Suspense fallback={<Loader />}>
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            </Suspense>
          </Route>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/register" exact>
            <Register />
          </Route>
          <Route paht="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
      {location.pathname !== "/register" &&
        location.pathname !== "/login" &&
        location.pathname !== "/payment" && <Footer className="footer" />}
    </div>
  );
}

export default App;
