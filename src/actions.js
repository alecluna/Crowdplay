import { SIGN_IN } from "./constants";

export const signInUser = (accessToken, dispatch) => {
  dispatch({
    type: SIGN_IN,
    accessToken: accessToken,
  });
};
