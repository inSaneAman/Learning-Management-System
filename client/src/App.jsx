import "./App.css";

import { Route, Routes } from "react-router-dom";

import AboutUs from "./pages/aboutUs.jsx";
import HomePage from "./pages/homePage.jsx";
function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage />}></Route>
                <Route path="/about" element={<AboutUs />}></Route>
            </Routes>
        </>
    );
}

export default App;
