import { useState } from "react";
import { toast } from "react-hot-toast";
import { BsPersonCircle } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import HomeLayout from "../layouts/homeLayout";
import { createNewAccount } from "../redux/slices/authSlice";
function SignUp() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [previewImage, setPreviewImage] = useState("");
    const [signUpData, setSignUpData] = useState({
        fullname: "",
        email: "",
        password: "",
        avatar: "",
    });

    function handleInput(e) {
        const { name, value } = e.target;
        setSignUpData({ ...signUpData, [name]: value });
    }

    function getImage(event) {
        event.preventDefault();
        const uploadedImage = event.target.files[0];

        if (uploadedImage) {
            setSignUpData({
                ...signUpData,
                avatar: uploadedImage,
            });

            const fileReader = new FileReader(uploadedImage);
            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener("load", function () {
                setPreviewImage(this.result);
                console.log(this.result);
            });
        }
    }

    async function createAccount(event) {
        event.preventDefault();
        if (
            !signUpData.email ||
            !signUpData.password ||
            !signUpData.fullname ||
            !signUpData.avatar
        ) {
            toast.error("Please fill in all the details");
            return;
        }

        if (signUpData.fullname.length < 5) {
            toast.error("Name must be atleast 5 characters long");
            return;
        }

        if (
            !signUpData.email.match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
        ) {
            toast.error("Invalid email");
            return;
        }

        if (
            !signUpData.password.match(
                /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
            )
        ) {
            toast.error(
                "Password should be 6-16 characters long with atleast 1 number and 1 character"
            );
            return;
        }

        const formData = new FormData();
        formData.append("fullname", signUpData.fullname);
        formData.append("email", signUpData.email);
        formData.append("password", signUpData.password);
        formData.append("avatar", signUpData.avatar);

        const response = await dispatch(createNewAccount(formData));
        console.log(response);
        if (response?.payload?.success) navigate("/");

        setSignUpData({
            fullname: "",
            email: "",
            password: "",
            avatar: "",
        });
    }
    return (
        <HomeLayout>
            <div className="flex items-center justify-center h-[90vh] w-full">
                <form
                    noValidate
                    onSubmit={createAccount}
                    className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]"
                >
                    <h1 className="text-center text-2xl font-bold">Register</h1>
                    <label htmlFor="image_uploads" className="cursor-pointer">
                        {previewImage ? (
                            <img
                                className="w-24 h-24 rounded-full m-auto"
                                src={previewImage}
                            ></img>
                        ) : (
                            <BsPersonCircle className="w-24 h-24 rounded-full m-auto" />
                        )}
                    </label>
                    <input
                        onChange={getImage}
                        className="hidden"
                        type="file"
                        name="image_uploads"
                        id="image_uploads"
                        accept=".jpg, .jpeg, .png, .svg"
                    />
                    <div className="flex flex-col gap-1">
                        <label htmlFor="fullname" className="font-semibold">
                            Name
                        </label>
                        <input
                            type="fullname"
                            required
                            name="fullname"
                            placeholder="Enter your full name"
                            className="bg-transparent px-2 py-1 border"
                            onChange={handleInput}
                            value={signUpData.fullname}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="font-semibold">
                            Email
                        </label>
                        <input
                            type="email"
                            required
                            name="email"
                            placeholder="Enter your email"
                            className="bg-transparent px-2 py-1 border"
                            onChange={handleInput}
                            value={signUpData.email}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="password" className="font-semibold">
                            Password
                        </label>
                        <input
                            type="password"
                            required
                            name="password"
                            placeholder="Enter your password"
                            className="bg-transparent px-2 py-1 border"
                            onChange={handleInput}
                            value={signUpData.password}
                        />
                    </div>
                    <button
                        className="mt-1 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-md py-2 font-semibold text-lg cursor-pointer"
                        type="submit"
                    >
                        Submit
                    </button>
                    <p className="text-center">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="link text-accent cursor-pointer"
                        >
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </HomeLayout>
    );
}

export default SignUp;
