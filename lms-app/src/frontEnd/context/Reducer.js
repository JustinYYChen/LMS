//take different action according to the state changes
const bookReducer = (state, action) => {
  switch (action.type) {
    case "ADD_BOOK_CATEGORIES":
      return {
        ...state,
        currentBookCategory: action.payload,
        fetchBooksRequestChecker: true,
      };
    case "ADD_RECORDS":
      return { ...state, currentRecords: action.payload };
    case "GET_RECORDS_ARRAY":
      return {
        ...state,
        records: action.payload,
      };
    case "ADD_BOOK":
      return { ...state, currentBook: action.payload };
    case "GET_BOOK_ARRAY":
      return { ...state, book_array: action.payload };
    case "LOG_IN":
      console.log("at log in");
      localStorage.setItem("currentUser", JSON.stringify(action.payload));
      return {
        ...state,
        currentUser: action.payload,
        checkLogin: true,
      };
    case "UPDATE_USER":
      localStorage.setItem("currentUser", JSON.stringify(action.payload));
      return { ...state, currentUser: action.payload };
    case "UPDATE_USERS":
      return { ...state, users: action.payload };
    default:
      throw new Error("No matched!");
  }
};

export default bookReducer;
