import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from "../test-util";
import ProductDetail from "./ProductDetail";

test("should update cart", async () => {
  render(<ProductDetail />);
  const btn = await screen.findByRole("button", { name: "Add to Basket" });
  userEvent.click(btn);
});
