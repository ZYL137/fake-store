import { createSlice } from "@reduxjs/toolkit";
import { db } from "../firebase";

const userSlice = createSlice({
  name: "user",
  initialState: { user: null, orders: [] },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setOrders(state, action) {
      state.orders = action.payload;
    },
  },
});

export const userActions = userSlice.actions;

export const setUserOrders = (authUser) => {
  return (dispatch) => {
    db.collection("users")
      .doc(authUser.uid)
      .collection("orders")
      .orderBy("created", "desc")
      .onSnapshot((snapshot) =>
        dispatch(
          userActions.setOrders(
            snapshot &&
              snapshot.docs.map(
                (doc) =>
                  ({
                    id: doc.id,
                    data: doc.data(),
                  } || [])
              )
          )
        )
      );
  };
};

export const sendUserOrdersData = (authUser, paymentIntent, items) => {
  return () =>
    db
      .collection("users")
      .doc(authUser?.uid)
      .collection("orders")
      .doc(paymentIntent.id)
      .set({
        items,
        amount: paymentIntent.amount,
        created: paymentIntent.created,
      });
};

export const sendUserCartData = (authUser, cartState) => {
  return () =>
    db
      .collection("users")
      .doc(authUser?.uid)
      .collection("cart")
      .doc("details")
      .set(cartState, { merge: true });
};

export const deleteUserOrder = (authUser, orderId) => {
  return (dispatch) =>
    db
      .collection("users")
      .doc(authUser?.uid)
      .collection("orders")
      .doc(orderId)
      .delete()
      .then(() => {
        dispatch(setUserOrders);
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
};

export default userSlice.reducer;
