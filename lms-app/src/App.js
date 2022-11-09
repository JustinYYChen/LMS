import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignIn from "./frontEnd/pages/MainPage/SignIn/SignIn";
import AllRecord from "./frontEnd/pages/MainPage/Record/RecordTablePage";
import StatusModifier from "./frontEnd/pages/MainPage/Record/StatusModifier";
import AddBookForm from "./frontEnd/pages/MainPage/Book/addBookForm";
import Homepage from "./frontEnd/pages/Homepage/index";
import BorrowBookPage from "./frontEnd/pages/MainPage/Book/BookTablePage";
import BookInfoPages from "./frontEnd/pages/bookInfo/bookinfo";

function App() {
  //all routers for nevigating the pages
  return (
    <Router>
      <nav></nav>
      <Routes>
        <Route path="/" element={<SignIn />}></Route>
        <Route path="/allRecord" element={<AllRecord />}></Route>
        <Route path="/allBook" element={<BorrowBookPage />}></Route>
        <Route path="/addRecordPage" element={<StatusModifier />}></Route>
        <Route path="/addBookPage" element={<AddBookForm />}></Route>
        <Route path="/homepage" element={<Homepage />}></Route>
        <Route path="/bookInfo" element={<BookInfoPages />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
