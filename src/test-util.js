import { render as rtlRender } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import userReducer from "./store/user-slice";
import cartReducer from "./store/cart-slice";
import searchReducer from "./store/search-slice";
import { MemoryRouter } from "react-router-dom";


const reducer = {
  user: userReducer,
  cart: cartReducer,
  search: searchReducer,
};

const store = configureStore({
  reducer,
});


const MemoryRouterWithInitialRoutes = ({ children, initialRoutes }) => (
  <MemoryRouter initialEntries={initialRoutes}>
    <Provider store={store}>{children}</Provider>
  </MemoryRouter>
);

const render = (ui, options) => {
  const initialRoutes =
    options && options.initialRoutes ? options.initialRoutes : ["/"];
  return rtlRender(ui, {
    wrapper: (args) =>
      MemoryRouterWithInitialRoutes({
        ...args,
        initialRoutes,
      }),
    ...options,
  });
};

// re-export everything
export * from "@testing-library/react";
// override render method
export { render };
