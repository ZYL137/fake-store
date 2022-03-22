import { createSlice } from "@reduxjs/toolkit";
import { db } from "../firebase";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
    isChanged: false,
  },
  reducers: {
    addItemToCart(state, action) {
      state.isChanged = true;
      state.totalAmount = (
        state.totalAmount * 1 +
        action.payload.price * action.payload.quantity
      ).toFixed(2);
      state.totalQuantity += action.payload.quantity;

      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (!existingItem) {
        state.items.push(action.payload);
      } else {
        // If product is added then update product quantity
        existingItem.quantity += action.payload.quantity;
      }
    },

    deleteItemFromCart(state, action) {
      state.isChanged = true;
      const existingItem = state.items.find(
        (item) => item.id === action.payload
      );
      state.totalQuantity -= existingItem.quantity;
      state.totalAmount = (
        state.totalAmount * 1 -
        existingItem.price * existingItem.quantity
      ).toFixed(2);

      state.items = state.items.filter((item) => item.id !== existingItem.id);
    },

    decreaseItemQuantity(state, action) {
      state.isChanged = true;
      const existingItem = state.items.find(
        (item) => item.id === action.payload
      );

      state.totalAmount = (state.totalAmount * 1 - existingItem.price).toFixed(
        2
      );
      state.totalQuantity--;

      if (existingItem.quantity === 1) {
        // Remove product from cart if quantity is qual to  1
        state.items = state.items.filter((item) => item.id !== existingItem.id);
      } else {
        existingItem.quantity--;
      }
    },

    emptyCart(state) {
      state.isChanged = true;
      state.items = [];
      state.totalAmount = 0;
      state.totalQuantity = 0;
    },

    setCartState(state, action) {
      state.isChanged = false;
      state.items = action.payload.items;
      state.totalAmount = action.payload.totalAmount;
      state.totalQuantity = action.payload.totalQuantity;
    },
  },
});

export const cartActions = cartSlice.actions;

export const setUserCart = (authUser) => {
  return (dispatch) => {
    // Get cart data
    db.collection("users")
      .doc(authUser.uid)
      .collection("cart")
      .onSnapshot((snapshot) => {
        snapshot.forEach((doc) => {
          // Update cart data
          dispatch(
            cartActions.setCartState({
              items: doc.data().items || [],
              totalAmount: doc.data().totalAmount || 0,
              totalQuantity: doc.data().totalQuantity || 0,
            })
          );
        });
      });
  };
};

export default cartSlice.reducer;
