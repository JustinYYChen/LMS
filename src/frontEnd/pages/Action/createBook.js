import fetchData from "../../components/fetchData";
import { addRecords } from "./createRecord";

const url = process.env.REACT_APP_SERVER_URL+"/bookForm";
/**add single book of one category by fetching
 * data to the back end server
 */
export const addBook = async (book, currentUser, dispatch) => {
  const result = await fetchData(
    { url: url + "/addBook", body: book, token: currentUser?.token },
    dispatch
  );
  if (result) {
    dispatch({ type: "ADD_BOOK", payload: result });
    console.log(result);
  }
};

/**get all books from the database with get request */
export const getBook_array = async (dispatch) => {
  const result = await fetchData({ url, method: "GET" }, dispatch);
  if (result) {
    dispatch({ type: "GET_BOOK_ARRAY", payload: result });
  }
};

/**update the status or other coloumn information eg: description in the
 * book table with patch method
 */
export const updateStatus = async (updatedCols, bookId, dispatch) => {
  const result = await fetchData(
    {
      url: `${url}/updateStatus/${bookId}`,
      method: "PATCH",
      body: updatedCols,
      //token: currentUser?.token,
    },
    dispatch
  );
  if (updatedCols.type === "Available") {
    addRecords(
      {
        bookId: bookId,
        itemName: updatedCols.bookName,
        customerName: "none",
        phoneNumber: "00000",
        type: "status changed to " + updatedCols.type,
      },
      dispatch
    );
  } else if (updatedCols.type === "Lost") {
    addRecords(
      {
        bookId: bookId,
        itemName: updatedCols.bookName,
        customerName: "none",
        phoneNumber: "00000",
        type: "status changed to " + updatedCols.type,
      },
      dispatch
    );
  }
  //window.location.reload();
  //await getBook_array(dispatch);
};
