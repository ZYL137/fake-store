import { screen } from "@testing-library/react";
import { render } from "./test-util";
import App from "./App";

describe("<App/>", () => {
  test("renders home page", async () => {
    render(<App />, { initialRoutes: ["/"] });
    expect(await screen.findAllByText(/shop now/i)).toHaveLength(3);
  });

  test("renders products by category", async () => {
    render(<App />, { initialRoutes: ["/products/category/test"] });
    expect(await screen.findByText(/test product/i)).toBeInTheDocument();
  });

  test("renders product details page", async () => {
    render(<App />, { initialRoutes: ["/products/1"] });
    expect(
      await screen.findByText("This is a test product")
    ).toBeInTheDocument();
  });

  test("renders search results page", async () => {
    render(<App />, { initialRoutes: ["/search/test"] });
    expect(await screen.findByText(/1 results for/i)).toBeInTheDocument();
    expect(await screen.findByText(/test product/i)).toBeInTheDocument();
  });

  test("renders checkout page", () => {
    render(<App />, { initialRoutes: ["/checkout"] });
    expect(screen.getByText(/cart/i)).toBeInTheDocument();
  });

  test("renders login page", async () => {
    render(<App />, { initialRoutes: ["/login"] });
    expect(screen.getByText("Log in")).toBeInTheDocument();
  });

  test("renders register page", async () => {
    render(<App />, { initialRoutes: ["/register"] });
    expect(screen.getByText(/create account/i)).toBeInTheDocument();
  });

  test("renders not found page if path is not defined", () => {
    render(<App />, { initialRoutes: ["/something-that-does-not-match"] });
    expect(
      screen.getByText(`Sorry, we couldn't found the page.`)
    ).toBeInTheDocument();
  });
});
