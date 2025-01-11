import { useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import HomeLayout from "../../layouts/homeLayout";
import { createNewCourse } from "../../redux/slices/courseSlice";
function CreateCourse() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [userInput, setUserInput] = useState({
        title: "",
        category: "",
        createdBy: "",
        description: "",
        thumbnail: null,
        previewImage: "",
    });

    function handleImageUpload(e) {
        e.preventDefault();
        const uploadedImage = e.target.files[0];
        if (uploadedImage) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener("load", function () {
                setUserInput({
                    ...userInput,
                    previewImage: this.result,
                    thumbnail: uploadedImage,
                });
            });
        }
    }

    function handleUserInput(e) {
        const { name, value } = e.target;
        setUserInput({
            ...userInput,
            [name]: value,
        });
    }

    async function onFormSubmit(e) {
        e.preventDefault();

        if (
            !userInput.title ||
            !userInput.description ||
            !userInput.createdBy ||
            !userInput.thumbnail ||
            !userInput.category
        ) {
            toast.error("All fields are mandatory");
            return;
        }
        const response = await dispatch(createNewCourse(userInput));

        if (response?.payload?.success) {
            setUserInput({
                title: "",
                category: "",
                createdBy: "",
                description: "",
                thumbnail: null,
                previewImage: "",
            });
        }
        navigate("/courses");
    }

    return (
        <HomeLayout>
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-800 to-gray-900">
                <form
                    onSubmit={onFormSubmit}
                    className="flex flex-col gap-6 bg-gray-950 p-6 rounded-lg w-[700px] shadow-lg border border-gray-800 text-white relative"
                >
                    <Link className="absolute top-6 left-6 text-2xl text-yellow-500 hover:text-yellow-400">
                        <AiOutlineArrowLeft />
                    </Link>
                    <h1 className="text-center text-3xl font-bold text-yellow-400">
                        Create New Course
                    </h1>
                    <main className="grid grid-cols-2 gap-x-10">
                        <div className="gap-y-6">
                            <div>
                                <label
                                    htmlFor="image_uploads"
                                    className="cursor-pointer block"
                                >
                                    {userInput?.previewImage ? (
                                        <img
                                            className="w-full h-44 border border-gray-700 rounded-md"
                                            src={userInput.previewImage}
                                        />
                                    ) : (
                                        <div className="w-full h-44 flex items-center justify-center border border-gray-700 rounded-md bg-gray-800 hover:bg-gray-700 transition-all duration-300">
                                            <h1 className="font-bold text-lg text-gray-400">
                                                Upload your course thumbnail
                                            </h1>
                                        </div>
                                    )}
                                </label>
                                <input
                                    className="hidden"
                                    type="file"
                                    id="image_uploads"
                                    name="image_uploads"
                                    onChange={handleImageUpload}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor="title"
                                    className="text-lg font-semibold text-gray-300"
                                >
                                    Course Title
                                </label>
                                <input
                                    required
                                    type="text"
                                    name="title"
                                    id="title"
                                    placeholder="Enter course title"
                                    className="bg-gray-800 px-3 py-2 border border-gray-700 rounded-md focus:ring-2 focus:ring-yellow-500"
                                    value={userInput.title}
                                    onChange={handleUserInput}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor="createdBy"
                                    className="text-lg font-semibold text-gray-300"
                                >
                                    Instructor
                                </label>
                                <input
                                    required
                                    type="text"
                                    name="createdBy"
                                    id="createdBy"
                                    placeholder="Enter course instructor"
                                    className="bg-gray-800 px-3 py-2 border border-gray-700 rounded-md focus:ring-2 focus:ring-yellow-500"
                                    value={userInput.createdBy}
                                    onChange={handleUserInput}
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor="category"
                                    className="text-lg font-semibold text-gray-300"
                                >
                                    Category
                                </label>
                                <input
                                    required
                                    type="text"
                                    name="category"
                                    id="category"
                                    placeholder="Enter course category"
                                    className="bg-gray-800 px-3 py-2 border border-gray-700 rounded-md focus:ring-2 focus:ring-yellow-500"
                                    value={userInput.category}
                                    onChange={handleUserInput}
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor="description"
                                    className="text-lg font-semibold text-gray-300"
                                >
                                    Description
                                </label>
                                <textarea
                                    required
                                    type="text"
                                    name="description"
                                    id="description"
                                    placeholder="Enter course description"
                                    className="bg-gray-800 px-3 py-2 border border-gray-700 h-24 resize-none rounded-md focus:ring-2 focus:ring-yellow-500"
                                    value={userInput.description}
                                    onChange={handleUserInput}
                                />
                            </div>
                        </div>
                    </main>

                    <button
                        type="submit"
                        className="w-full py-3 font-semibold text-lg text-white bg-yellow-500 hover:bg-yellow-400 transition-all duration-300 rounded-md shadow-md"
                    >
                        Create Course
                    </button>
                </form>
            </div>
        </HomeLayout>
    );
}
export default CreateCourse;
