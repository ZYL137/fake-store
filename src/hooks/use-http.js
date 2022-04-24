import { useCallback, useReducer } from "react";
import { mainAxios } from "../axios";

const initialHttpState = { loading: false, error: null, data: null };

const httpReducer = (httpState, action) => {
  switch (action.type) {
    case "SEND": {
      return {
        loading: true,
        error: null,
        data: null,
      };
    }

    case "RESPONSE": {
      return {
        ...httpState,
        loading: false,
        data: action.data,
      };
    }

    case "ERROR": {
      return { loading: false, error: action.errorMessage };
    }

    default: {
      throw new Error("Invalid action");
    }
  }
};

const useHttp = () => {
  const [httpState, dispatchHttp] = useReducer(httpReducer, initialHttpState);

  const sendRequest = useCallback(async (url) => {
    try {
      dispatchHttp({ type: "SEND" });
      const res = await mainAxios.get(url);
      const data = res.data;

      dispatchHttp({ type: "RESPONSE", data });
    } catch (err) {
      dispatchHttp({ type: "ERROR", errorMessage: err.message });
    }
  }, []);

  return {
    httpState,
    sendRequest,
  };
};

export default useHttp;
