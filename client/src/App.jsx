import "./App.css";

import { Route, Routes } from "react-router-dom";

import AboutUs from "./pages/aboutUs.jsx";
import ContactUs from "./pages/contactUs.jsx";
import CourseList from "./pages/Course/courseList.jsx";
import Denied from "./pages/denied.jsx";
import HomePage from "./pages/homePage.jsx";
import Login from "./pages/login.jsx";
import NotFound from "./pages/notFound.jsx";
import SignUp from "./pages/signUp.jsx";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage />}></Route>
                <Route path="/about" element={<AboutUs />}></Route>
                <Route path="/signup" element={<SignUp />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/courses" element={<CourseList />}></Route>
                <Route path="/contact" element={<ContactUs />}></Route>
                <Route path="/denied" element={<Denied />}></Route>

                <Route path="*" element={<NotFound />}></Route>
            </Routes>
        </>
    );
}

export default App;
