import fetchData from "../../components/fetchData";
import { addBook, getBook_array } from "./createBook";

const url = "http://localhost:5000/bookForm";
/**add one category of book using post method and then
 * adding multiple books of this category based the
 * quantity entered
 */
export const addBooks = async (bookcat, currentUser, dispatch) => {
  const result = await fetchData(
    { url: url + "/books", body: bookcat, token: currentUser?.token },
    dispatch
  );
  if (result) {
    dispatch({ type: "ADD_BOOK_CATEGORIES", payload: result });
    for (let i = 0; i < parseInt(result.quantity); i++) {
      console.log("index:" + i);
      addBook(
        {
          bookCategoryId: result.bookDBId,
          bookName: result.bookName,
          description: result.description,
        },
        currentUser,
        dispatch
      );
    }
    //refresh the book table by getting all books again after creating
    await getBook_array(dispatch);
    //new books
    //window.location.reload();
  }
};
