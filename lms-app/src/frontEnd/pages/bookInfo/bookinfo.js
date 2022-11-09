import * as React from "react";
import Box from "@mui/material/Box";
import books from "../../LMS-elements/image.jpeg";
import { useValue } from "../../context/Provider";
import { useNavigate } from "react-router-dom";

// the BookInforPages, when click view book detail then open it
function BookInfoPages(props) {
  const navigate = useNavigate();
  const {
    state: { currentUser },
    dispatch,
  } = useValue();
  React.useEffect(() => {
    if (
      currentUser === null &&
      localStorage.getItem("currentUser") === "null"
    ) {
      navigate("/");
    }
  }, []);
  const { Link, ID, Name, Status, Description } = props;
  return (
    <Box>
      <Box display={"inline-block"}>
        <img src={books} height={328} width={301}></img>
      </Box>
      <Box ml={40} mt={-41}>
        Book Name: {Name}
      </Box>
      <Box ml={40} mt={9}>
        Book ID: {ID}
      </Box>
      <Box ml={40} mt={9}>
        Book status: {Status}
      </Box>
      <Box ml={40} mt={9}>
        description: {Description}
      </Box>
    </Box>
  );
}

export default BookInfoPages;
