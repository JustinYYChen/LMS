import fetchData from "../../components/fetchData";

const url = process.env.REACT_APP_SERVER_URL+"/recordForm";
/**add records of changing the status of the book,
 * such as borrow, returned or lost to the record
 * table
 */
export const addRecords = async (record, currentUser, dispatch) => {
  const result = await fetchData(
    { url: url + "/records", body: record, token: currentUser?.token },
    dispatch
  );
  if (result) {
    dispatch({ type: "ADD_RECORDS", payload: result });
    getRecords(dispatch);
  }
};

/**get all records from the database with GET method */
export const getRecords = async (dispatch) => {
  const result = await fetchData({ url, method: "GET" }, dispatch);
  if (result) {
    dispatch({ type: "GET_RECORDS_ARRAY", payload: result });
  }
};
