//fetch data to the back end server
const fetchData = async (
  { url, method = "POST", token = "", body = null },
  dispatch
) => {
  const headers = token
    ? { "Content-Type": "application/json", authorization: `Bearer ${token}` }
    : { "Content-Type": "application/json" };
  body = body ? { body: JSON.stringify(body) } : {};
  console.log(body);
  try {
    const response = await fetch(url, { method, headers, ...body });

    const data = await response.json();
    console.log(data);
    console.log("next");

    if (!data.success) {
      console.log("meet an error");
      throw new Error(data.message);
    }
    return data.result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default fetchData;
