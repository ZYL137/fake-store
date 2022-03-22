import userReducer, { userActions } from "./user-slice";

const initialState = { user: null, orders: [] };

describe("User reducer", () => {
  test("should return initial state", () => {
    expect(userReducer(undefined, {})).toEqual(initialState);
  });

  test("should handle user data if user logged in", () => {
    expect(
      userReducer(
        initialState,
        userActions.setUser({
          uid: 111,
          username: "test",
          email: "test@example.com",
        })
      )
    ).toEqual({
      user: {
        uid: 111,
        username: "test",
        email: "test@example.com",
      },
      orders: [],
    });
  });

  test("should handle user orders if user logged in", () => {
    const previousState = {
      user: {
        uid: 111,
        username: "test",
        email: "test@example.com",
      },
      orders: [],
    };

    expect(
      userReducer(
        previousState,
        userActions.setUserOrders([
          {
            id: "123",
            data: { items: ["apple"], amount: 10 },
          },
          {
            id: "111",
            data: { items: ["orange"], amount: 20 },
          },
        ])
      )
    ).toEqual({
      ...previousState,
      orders: [
        {
          id: "123",
          data: { items: ["apple"], amount: 10 },
        },
        {
          id: "111",
          data: { items: ["orange"], amount: 20 },
        },
      ],
    });
  });
});
