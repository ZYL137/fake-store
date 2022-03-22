import { render as rtlRender } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import userReducer from "./store/user-slice";
import cartReducer from "./store/cart-slice";
import searchReducer from "./store/search-slice";
import { MemoryRouter, BrowserRouter } from "react-router-dom";

// test utils file

// function render(
//   ui,
//   {
//     preloadedState,
//     store = configureStore({
//       reducer: {
//         user: userReducer,
//         cart: cartReducer,
//         search: searchReducer,
//       },
//       preloadedState,
//     }),
//     ...renderOptions
//   } = {}
// ) {
//   function Wrapper({ children }) {
//     return (
//       <Provider store={store}>
//         <MemoryRouter>{children}</MemoryRouter>
//       </Provider>
//     );
//   }

//   return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
// }

// function render(
//   ui,
//   {
//     preloadedState,
//     store = configureStore({
//       reducer: {
//         user: userReducer,
//         cart: cartReducer,
//         search: searchReducer,
//       },
//       preloadedState,
//     }),
//     route = "/",
//     ...renderOptions
//   } = {}
// ) {
//   window.history.pushState({}, "Test page", route);

//   function Wrapper({ children }) {
//     return (
//       <Provider store={store}>
//         <MemoryRouter>{children}</MemoryRouter>
//       </Provider>
//     );
//   }

//   return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
// }

const reducer = {
  user: userReducer,
  cart: cartReducer,
  search: searchReducer,
};

const store = configureStore({
  reducer,
});
// export function getStoreWithState(preloadedState) {
//   return configureStore({ reducer, preloadedState });
// }

// export function renderWithContext(element, state) {
//   const store = getStoreWithState(state);
//   const utils = render(<Provider store={store}>{element}</Provider>);
//   return { store, ...utils };
// }

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
