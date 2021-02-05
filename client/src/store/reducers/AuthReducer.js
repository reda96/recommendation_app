import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  ACCOUNT_DELETED,
  UPDATE_FAVORITE,
  FAVORITES_ERROR,
  // GET_FAVORITES,
} from "../actions/actionTypes";
// const user = localStorage.getItem("user");
const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,

  user: localStorage.getItem("user"),
  favorites: [],
  err: "",
};
export default function (state = { initialState }, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      console.log(payload);
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
        favorites: payload.favorites,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem("token", payload.token);
      localStorage.setItem("user", JSON.stringify(payload));
      return {
        ...state,
        user: payload,
        isAuthenticated: true,
        loading: false,
      };
    case UPDATE_FAVORITE:
      return {
        ...state,
        loading: false,
        favorites: payload.favorites,
      };
    case FAVORITES_ERROR:
      return {
        ...state,
        loading: false,
        err: action.msg,
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
    case ACCOUNT_DELETED:
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("movies");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    default:
      return state;
  }
}
