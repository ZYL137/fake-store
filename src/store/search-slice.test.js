import searchReducer, { searchActions } from "./search-slice";

const initialState = {
  query: "",
  results: null,
};

describe("Search reducer", () => {
  test("should return initial state", () => {
    expect(searchReducer(undefined, {})).toEqual(initialState);
  });

  test("should handle search data", () => {
    expect(
      searchReducer(
        initialState,
        searchActions.getSearchData({
          query: "test",
          results: ["test"],
        })
      )
    ).toEqual({ query: "test", results: ["test"] });
  });
});
