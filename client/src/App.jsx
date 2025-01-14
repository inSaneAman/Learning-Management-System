import "./App.css";

import { Route, Routes } from "react-router-dom";

import RequireAuth from "./components/auth/requireAuth.jsx";
import AboutUs from "./pages/aboutUs.jsx";
import ContactUs from "./pages/contactUs.jsx";
import CourseDescription from "./pages/Course/courseDescription.jsx";
import CourseList from "./pages/Course/courseList.jsx";
import CreateCourse from "./pages/Course/createCourse.jsx";
import Denied from "./pages/denied.jsx";
import HomePage from "./pages/homePage.jsx";
import Login from "./pages/login.jsx";
import NotFound from "./pages/notFound.jsx";
import Checkout from "./pages/Payment/checkout.jsx";
import CheckoutSuccess from "./pages/Payment/checkoutSuccess.jsx";
import SignUp from "./pages/signUp.jsx";
import EditProfile from "./pages/User/editProfile.jsx";
import UserProfile from "./pages/User/userProfile.jsx";
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
                <Route
                    path="/course/description"
                    element={<CourseDescription />}
                ></Route>

                <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
                    <Route
                        path="/course/create"
                        element={<CreateCourse />}
                    ></Route>
                </Route>
                <Route
                    element={<RequireAuth allowedRoles={["ADMIN", "USER"]} />}
                >
                    <Route path="/user/profile" element={<UserProfile />} />
                    <Route path="/user/editprofile" element={<EditProfile />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route
                        path="/checkout/success"
                        element={<CheckoutSuccess />}
                    />
                </Route>

                <Route path="*" element={<NotFound />}></Route>
            </Routes>
        </>
    );
}

export default App;
