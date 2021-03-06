import axios from "../../axios-orders";
import { setAlert } from "./alert";

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE,
  // UPDATE_LIKES,
  UPDATE_FAVORITE,
  FAVORITES_ERROR,
} from "./actionTypes";
import { setAuthToken } from "../utility";

// Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.getItem("token")) {
    setAuthToken(localStorage.getItem("token"));

    try {
      const res = await axios.get("/api/users");

      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
        payload: err,
      });
    }
  } else
    dispatch({
      type: AUTH_ERROR,
      payload: "auto_signin_error",
    });
};
// REGISTER USER
export const register = ({ name, email, password }) => async (dispatch) => {
  try {
    const newUser = { name, email, password };
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify(newUser);
    const res = await axios.post("/api/users/signUp", body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (error) {
    const err = error.response.data.errors;
    console.log(err);
    if (err) {
      err.forEach((e) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({ type: REGISTER_FAIL, err: err[0].msg });
  }
};
// LOGIN USER
export const login = ({ email, password }) => async (dispatch) => {
  try {
    const user = { email, password };
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify(user);
    const res = await axios.post("/api/users/signIn", body, config);
    console.log(res.data);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (error) {
    console.log(error);
    const err = error.response.data.errors;
    console.log(err[0].msg);
    if (err) {
      err.forEach((e) => dispatch(setAlert(error.msg, "danger")));
      // dispatch(setAlert(err.msg, "danger"));
    }

    dispatch({ type: LOGIN_FAIL, err: err[0].msg });
  }
};

// LOGOUT / Clear Profile
export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
  dispatch({
    type: CLEAR_PROFILE,
  });
};

// Add to favorite
export const addToFavorite = (movie) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/users/favorite/${movie._id}`);

    dispatch({
      type: UPDATE_FAVORITE,
      payload: { id: movie._id, favorites: res.data },
    });
  } catch (err) {
    dispatch({
      type: FAVORITES_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
