import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart-slice";
import userReducer from "./user-slice";
import searchReducer from "./search-slice";

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    search: searchReducer,
  },
});

export default store;
