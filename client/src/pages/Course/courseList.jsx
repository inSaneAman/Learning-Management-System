import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import CourseCard from "../../components/courseCard";
import HomeLayout from "../../layouts/homeLayout";
import { getAllCourses } from "../../redux/slices/courseSlice";
function CourseList() {
    const dispatch = useDispatch();

    const { courseData } = useSelector((state) => state.course);
    async function loadCourses() {
        await dispatch(getAllCourses());
    }

    useEffect(() => {
        loadCourses();
    }, []);

    return (
        <HomeLayout>
            <div className="mih-h-[90vh] pt-12 pl-20 flex flex-col gap-10 text-white">
                <h1 className="text-center text-3xl font-semibold mb-5">
                    Explore courses made by
                    <span className="font-bold text-yellow-500">
                        Industry Experts
                    </span>
                </h1>
                <div className="mb-10 flex flex-wrap gap-14">
                    {courseData?.map((element) => {
                        return (
                            <CourseCard
                                key={element._id}
                                data={element}
                            ></CourseCard>
                        );
                    })}
                </div>
            </div>
        </HomeLayout>
    );
}

export default CourseList;
