import fetchData from "../../components/fetchData";
const url = "http://localhost:5000/admin";
//register a new account for the user
export const register = async (user, dispatch) => {
  const result = await fetchData(
    { url: url + "/initialise", body: user },
    dispatch
  );
  if (result) {
    dispatch({ type: "UPDATE_USER", payload: result });
  }
};

//send data to the backend using fetch data for user login and redirect to
//homepage
export const login = async (user, dispatch, navigate, setShowAlret) => {
  const result = await fetchData(
    { url: url + "/signin", body: user },
    dispatch
  );
  if (result) {
    console.log(result);
    dispatch({ type: "LOG_IN", payload: result });
    navigate("homepage");
  } else {
    setShowAlret(true);
    //return null;
  }
};

export const logout = (dispatch, navigate) => {
  dispatch({ type: "UPDATE_USER", payload: null });
  navigate("/");
};
