import { configureStore } from "@reduxjs/toolkit";
import { Action, applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
const baseUrl = "http://localhost:3000";

class DogsAPI {
  url = `${baseUrl}/dogs`;

  constructor() {}

  //`${this.url}?_page=${page}&_limit=${limit}`

  getAll(page = 1, limit = 100) {
    return fetch(this.url).then(this.checkStatus).then(this.parseJSON);
  }

  static translateStatusToErrorMessage(status: number) {
    switch (status) {
      case 401:
        return "Please login again.";
      case 403:
        return "You do not have permission to view the photos.";
      default:
        return "There was an error retrieving the photos. Please try again.";
    }
  }

  checkStatus(response: Response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      const httpErrorInfo = {
        status: response.status,
        statusText: response.statusText,
        url: response.url,
      };
      console.log(
        `logging http details for debugging: ${JSON.stringify(httpErrorInfo)}`,
      );

      let errorMessage = DogsAPI.translateStatusToErrorMessage(
        httpErrorInfo.status,
      );
      throw new Error(errorMessage);
    }
  }

  parseJSON(response: Response) {
    return response.json();
  }
}

const LOAD_DOGS_REQUEST = "LOAD_DOGS_REQUEST";
const LOAD_DOGS_SUCCESS = "LOAD_DOGS_SUCCESS";
const LOAD_DOGS_FAILURE = "LOAD_DOGS_FAILURE";

const initialState = {
  dogs: [],
  processing: false,
  error: null,
};

const store = createStore(reducer, applyMiddleware(thunk));

function reducer(state = initialState, action: any) {
  switch (action.type) {
    case LOAD_DOGS_REQUEST:
      return { ...state, processing: true };
    case LOAD_DOGS_SUCCESS:
      return { ...state, processing: false, dogs: action.payload };
    case LOAD_DOGS_FAILURE:
      return { ...state, processing: false, error: action.payload.message };
    default:
      return state;
  }
}

function loadDogs() {
  //   return { type: LOAD_DOGS_REQUEST };
  return function thunk(dispatch: any, getState: any) {
    let dogsAPI = new DogsAPI();
    dispatch({ type: LOAD_DOGS_REQUEST });
    return dogsAPI
      .getAll(1)
      .then((data) => {
        dispatch({ type: LOAD_DOGS_SUCCESS, payload: data });
      })
      .catch((error) => {
        dispatch({ type: LOAD_DOGS_FAILURE, payload: error });
      });
  };
}

function logState() {
  console.log(JSON.stringify(store.getState(), null, " "));
}

store.subscribe(logState);

async function test() {
  await store.dispatch(loadDogs());
  console.log("loaded photos");
}

test();
