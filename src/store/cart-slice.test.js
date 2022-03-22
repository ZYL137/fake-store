import cartReducer, { cartActions } from "./cart-slice";

const initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
  isChanged: false,
};

describe("Cart reducer", () => {
  test("should return initial state", () => {
    expect(cartReducer(undefined, {})).toEqual(initialState);
  });

  test("should handle ADD NEW product being added to cart", () => {
    expect(
      cartReducer(
        initialState,
        cartActions.addItemToCart({
          id: 1,
          price: 10,
          quantity: 2,
        })
      )
    ).toEqual({
      items: [
        {
          id: 1,
          price: 10,
          quantity: 2,
        },
      ],
      totalQuantity: 2,
      totalAmount: (20).toFixed(2),
      isChanged: true,
    });
  });

  test("should handle ADD DUPLICATE product being added to cart", () => {
    const previousState = {
      items: [
        {
          id: 1,
          price: 10,
          quantity: 2,
        },
        {
          id: 2,
          price: 5,
          quantity: 1,
        },
      ],
      totalQuantity: 3,
      totalAmount: 25,
      isChanged: true,
    };
    expect(
      cartReducer(
        previousState,
        cartActions.addItemToCart({
          id: 2,
          price: 5,
          quantity: 2,
        })
      )
    ).toEqual({
      items: [
        {
          id: 1,
          price: 10,
          quantity: 2,
        },
        {
          id: 2,
          price: 5,
          quantity: 3,
        },
      ],
      totalQuantity: 5,
      totalAmount: (35).toFixed(2),
      isChanged: true,
    });
  });

  test("should handle DECREASE product quantity", () => {
    const previousState = {
      items: [
        {
          id: 1,
          price: 10,
          quantity: 2,
        },
        {
          id: 2,
          price: 5,
          quantity: 1,
        },
      ],
      totalQuantity: 3,
      totalAmount: 25,
      isChanged: true,
    };
    expect(
      cartReducer(previousState, cartActions.decreaseItemQuantity(1))
    ).toEqual({
      items: [
        {
          id: 1,
          price: 10,
          quantity: 1,
        },
        {
          id: 2,
          price: 5,
          quantity: 1,
        },
      ],
      totalQuantity: 2,
      totalAmount: (15).toFixed(2),
      isChanged: true,
    });
  });

  test("should handle DELETE product from cart", () => {
    const previousState = {
      items: [
        {
          id: 1,
          price: 10,
          quantity: 2,
        },
        {
          id: 2,
          price: 5,
          quantity: 1,
        },
      ],
      totalQuantity: 3,
      totalAmount: 25,
      isChanged: true,
    };
    expect(
      cartReducer(previousState, cartActions.deleteItemFromCart(1))
    ).toEqual({
      items: [
        {
          id: 2,
          price: 5,
          quantity: 1,
        },
      ],
      totalQuantity: 1,
      totalAmount: (5).toFixed(2),
      isChanged: true,
    });
  });
});
