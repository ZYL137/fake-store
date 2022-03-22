import { screen } from "@testing-library/react";

import { render } from "../test-util";
import { server, rest } from "../testServer";
import Home from "./Home";

describe("<Home/>", () => {
  test("should renders products categories", async () => {
    render(<Home />);
    expect(await screen.findByText(/food/i)).toBeInTheDocument();
    expect(await screen.findByText(/shoes/i)).toBeInTheDocument();
    expect(await screen.findByText(/See All Products/i)).toBeInTheDocument();
    expect(
      await screen.findAllByRole("link", { name: /shop now/i })
    ).toHaveLength(2);
  });

  test("should handle error if failed to fetch data", async () => {
    server.use(
      rest.get(
        `https://fakestoreapi.com/products/categories`,
        (req, res, ctx) => {
          return res(ctx.status(404));
        }
      )
    );
    render(<Home />);
    expect(
      await screen.findByText("Request failed with status code 404")
    ).toBeInTheDocument();
    expect(screen.queryByText(/shoes/i)).not.toBeInTheDocument();
    expect(screen.queryAllByRole("link", { name: /shop now/i })).toHaveLength(
      0
    );
  });
});
