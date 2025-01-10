import { useNavigate } from "react-router-dom";

function CourseCard({ data }) {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate("/course/description")}
            className="text-white w-full sm:w-[22rem] h-[430px] shadow-lg rounded-2xl cursor-pointer group overflow-hidden bg-gradient-to-b from-zinc-700 to-zinc-800 hover:from-zinc-600 hover:to-zinc-700 transition-all duration-300"
        >
            <div className="overflow-hidden">
                <img
                    className="h-48 w-full rounded-tl-lg rounded-tr-lg group-hover:scale-110 transition-all duration-300 ease-in-out"
                    src={data?.thumbnail?.secure_url}
                    alt="Course Thumbnail"
                />
                <div className="p-4 space-y-2 text-white">
                    <h2 className="text-xl font-bold text-yellow-500 line-clamp-1 tracking-wide">
                        {data?.title}
                    </h2>
                    <p className="line-clamp-3 text-sm text-gray-300">
                        {data?.description}
                    </p>
                    <p className="font-semibold text-sm">
                        <span className="text-yellow-500 font-bold">
                            Category:
                        </span>{" "}
                        {data?.category}
                    </p>
                    <p className="font-semibold text-sm">
                        <span className="text-yellow-500 font-bold">
                            Total lectures:
                        </span>{" "}
                        {data?.numberOfLectures}
                    </p>
                    <p className="font-semibold text-sm">
                        <span className="text-yellow-500 font-bold">
                            Instructor:
                        </span>{" "}
                        &nbsp;{data?.createdBy}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default CourseCard;
