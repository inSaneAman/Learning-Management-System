import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import HomeLayout from "../../layouts/homeLayout";
import { addCourseLectures } from "../../redux/slices/lectureSlice";

function AddLecture() {
    const courseDetails = useLocation().state;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [userInput, setUserInput] = useState({
        id: courseDetails._id,
        lecture: undefined,
        title: "",
        description: "",
        videoSrc: "",
    });

    function handleInputChange(e) {
        const { name, value } = e.target;
        setUserInput({
            ...userInput,
            [name]: value,
        });
    }

    function handleVideo(e) {
        const video = e.target.files[0];
        const source = window.URL.createObjectURL(video);
        setUserInput({
            ...userInput,
            lecture: video,
            videoSrc: source,
        });
    }

    async function onFormSubmit(e) {
        e.preventDefault();
        if (!userInput.lecture || !userInput.title || !userInput.description) {
            toast.error("All fields are mandatory");
            return;
        }

        const response = await dispatch(addCourseLectures(userInput));
        if (response?.payload?.success) {
            navigate(-1);
            setUserInput({
                id: courseDetails._id,
                lecture: undefined,
                title: "",
                description: "",
                videoSrc: "",
            });
        }
    }

    useEffect(() => {
        if (!courseDetails) navigate("/courses");
    }, []);

    return (
        <HomeLayout>
            <div className="min-h-[90vh] flex flex-col items-center justify-center text-white mx-16 gap-10">
                <div className="flex flex-col gap-5 p-2 shadow-[0_0_10px_black] w-96 rounded-lg">
                    <header className="flex items-center justify-center relative">
                        <button
                            className="absolute left-2 text-xl text-green-500"
                            onClick={() => navigate(-1)}
                        >
                            <AiOutlineArrowLeft />
                        </button>
                        <h1 className="text-xl text-yellow-500 font-semibold">
                            Add new lecture
                        </h1>
                    </header>
                    <form
                        onSubmit={onFormSubmit}
                        className="flex flex-col gap-3"
                    >
                        <input
                            type="text"
                            name="title"
                            placeholder="Enter lecture title"
                            onChange={handleInputChange}
                            className="bg-transparent px-3 py-1 border"
                            value={userInput.title}
                        />
                        <textarea
                            type="text"
                            name="description"
                            placeholder="Enter lecture description"
                            onChange={handleInputChange}
                            className="bg-transparent px-3 py-1 border resize-none overflow-y-scroll h-24 "
                            value={userInput.description}
                        />
                        {userInput.videoSrc ? (
                            <video
                                muted
                                src={userInput.videoSrc}
                                controls
                                controlsList="nodownload nofullscreen"
                                disablePictureInPicture
                                className="object-fill rounded-tl-lg rounded-tr-lg w-full"
                            ></video>
                        ) : (
                            <div className="h-48 border flex items-center justify-center cursor-pointer">
                                <label
                                    htmlFor="lecture"
                                    className="font-semibold text-xl cursor-pointer"
                                >
                                    Choose video lecture
                                </label>
                                <input
                                    type="file"
                                    name="lecture"
                                    id="lecture"
                                    onChange={handleVideo}
                                    className="hidden"
                                    accept="video/mp4, video/*, image/png, image/jpeg, image/jpg"
                                />
                            </div>
                        )}
                        <button
                            type="submit"
                            className="btn btn-primary py-1 font-semibold text-lg"
                        >
                            Add lecture
                        </button>
                    </form>
                </div>
            </div>
        </HomeLayout>
    );
}

export default AddLecture;
