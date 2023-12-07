import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/dashboard/Home";
import Add from "./pages/user/Add";
import Edit from "./pages/user/Edit";
import Profile from "./pages/user/Profile";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
     
       
            <Route path="/" element={<Home />}></Route>
            <Route path="/add/user" element={<Add />}></Route>
            <Route path="/edit/user/:user_id" element={<Edit />}></Route>
            <Route path="/user/profile" element={<Profile />}></Route>
         
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
