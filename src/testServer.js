import { rest } from "msw";
import { setupServer } from "msw/node";

const baseUrl = "https://fakestoreapi.com";

const data = [
  {
    category: "test",
    id: 1,
    title: "Test Product",
    image: "",
    description: "This is a test product",
    price: 13,
    rating: { rate: 4.5, count: 111 },
  },
];

const server = setupServer(
  rest.get(`${baseUrl}/products`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(data));
  }),

  rest.get(`${baseUrl}/products/:id`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(...data));
  }),

  rest.get(
    `${baseUrl}/products/category/:selectedCategory`,
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(data));
    }
  ),

  rest.get("*", (req, res, ctx) => {
    console.error(`Please add request handler for ${req.url.toString()}`);
    return res(
      ctx.status(500),
      ctx.json({ error: "Please add request handler" })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

export { server, rest };
