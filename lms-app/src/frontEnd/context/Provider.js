//Provide context for state change
import { createContext, useContext, useEffect, useReducer } from "react";
import bookReducer from "./Reducer";

const initialState = {
  currentBookCategory: null,
  currentRecords: null,
  currentBook: null,
  fetchBooksRequestChecker: false,
  records: [],
  book_array: [],
  currentUser: null,
  checkLogin: false,
  users: [],
};

const BookContext = createContext(initialState);

export const useValue = () => {
  return useContext(BookContext);
};

const BookProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bookReducer, initialState);
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      dispatch({ type: "UPDATE_USER", payload: currentUser });
    }
  }, []);
  return (
    <BookContext.Provider value={{ state, dispatch }}>
      {children}
    </BookContext.Provider>
  );
};

export default BookProvider;
