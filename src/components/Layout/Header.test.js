import { screen } from "@testing-library/react";
import { render } from "../test-util";
import Header from "./Header";

describe("<Header/>", () => {
  test(`should renders "guest" & "Sign in" if user not logged in`, () => {
    render(<Header />);
    const usernameElement = screen.getByText("Hello guest");
    const signElement = screen.getByText("Sign in");
    expect(usernameElement).toBeInTheDocument();
    expect(signElement).toBeInTheDocument();
  });
});
