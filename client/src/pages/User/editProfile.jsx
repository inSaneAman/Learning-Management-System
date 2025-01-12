import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BsPersonCircle } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import HomeLayout from "../../layouts/homeLayout";
import { getUserData, updateProfile } from "../../redux/slices/authSlice";

function EditProfile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [data, setData] = useState({
        previewImage: "",
        fullname: "",
        avatar: undefined,
        userId: useSelector((state) => state?.auth?.data?._id),
    });

    function handleImageUpload(e) {
        e.preventDefault();
        const uploadedImage = e.target.files[0];
        if (uploadedImage) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener("load", function () {
                setData({
                    ...data,
                    previewImage: this.result,
                    avatar: uploadedImage,
                });
            });
        }
    }

    function handleInputChange(e) {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value,
        });
    }

    async function onFormSubmit(e) {
        e.preventDefault();
        if (!data.fullname || !data.avatar) {
            toast.error("All fields are mandatory");
            return;
        }

        if (data.fullname.length < 4) {
            toast.error("Name must be at least 4 characters");
        }

        const formData = new FormData();
        formData.append("fullname", data.fullname);
        formData.append("avatar", data.avatar);

        await dispatch(updateProfile([data.userId, formData]));
        await dispatch(getUserData());
        navigate("/user/profile");
    }

    return (
        <HomeLayout>
            <div className="flex items-center justify-center h-[90vh] bg-gradient-to-r from-gray-800 to-gray-900">
                <form
                    onSubmit={onFormSubmit}
                    className="flex flex-col justify-center gap-6 rounded-lg p-6 text-white w-96 min-h-[28rem] 
                               bg-gray-950 shadow-lg border border-gray-800 backdrop-blur-lg"
                >
                    {/* Title */}
                    <h1 className="text-center text-2xl font-bold text-yellow-400 tracking-wide">
                        Edit Profile
                    </h1>

                    {/* Profile Image Upload */}
                    <label
                        className="cursor-pointer flex flex-col items-center"
                        htmlFor="image_uploads"
                    >
                        {data.previewImage ? (
                            <img
                                src={data.previewImage}
                                className="w-28 h-28 rounded-full border-4 border-yellow-500 shadow-md 
                                           transition-all duration-300 hover:scale-105"
                            />
                        ) : (
                            <BsPersonCircle className="w-28 h-28 text-gray-400 transition-all duration-300 hover:scale-105" />
                        )}
                    </label>
                    <input
                        onChange={handleImageUpload}
                        className="hidden"
                        type="file"
                        id="image_uploads"
                        name="image_uploads"
                        accept=".jpg, .jpeg, .png, .svg"
                    />

                    {/* Full Name Input */}
                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor="fullname"
                            className="text-lg font-semibold text-gray-300"
                        >
                            Full Name
                        </label>
                        <input
                            type="text"
                            required
                            name="fullname"
                            id="fullname"
                            placeholder="Enter your name"
                            className="px-3 py-2 border border-gray-700 rounded-md bg-transparent 
                                       text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 
                                       transition-all duration-200"
                            value={data.fullname}
                            onChange={handleInputChange}
                        />
                    </div>

                    {/* Update Profile Button */}
                    <button
                        type="submit"
                        className="w-full py-2 text-lg font-semibold rounded-md cursor-pointer 
                                   bg-yellow-600 hover:bg-yellow-500 transition-all duration-300 ease-in-out"
                    >
                        Update Profile
                    </button>

                    {/* Go Back Link */}
                    <Link to="/user/profile">
                        <p
                            className="flex items-center justify-center gap-2 text-yellow-400 cursor-pointer 
                                      transition-all duration-300 hover:text-yellow-300"
                        >
                            <AiOutlineArrowLeft />
                            Go back to profile
                        </p>
                    </Link>
                </form>
            </div>
        </HomeLayout>
    );
}

export default EditProfile;
