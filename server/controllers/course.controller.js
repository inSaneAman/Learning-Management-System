import Course from "../models/course.model.js";
import AppError from "../utils/error.util.js";
import cloudinary from "cloudinary";
import fs from "fs/promises";

const getAllCourses = async function (req, res, next) {
    try {
        const courses = await Course.find({}).select("-lectures");

        res.status(200).json({
            success: true,
            message: "All courses",
            courses,
        });
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
};

const getLecturesByCourseId = async function (req, res, next) {
    try {
        const { id } = req.params;

        const course = await Course.findById(id);
        if (!course) {
            return next(new AppError("Invalid course id", 400));
        }
        res.status(200).json({
            success: true,
            message: "Course lectures fetched successfully",
            lectures: course.lectures,
        });
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
};

const createCourse = async function (req, res, next) {
    const { title, description, category, createdBy } = req.body;

    if (!title || !description || !category || !createdBy) {
        return next(new AppError("All fields are required", 400));
    }

    const course = await Course.create({
        title,
        description,
        category,
        createdBy,
        thumbnail: {
            public_id: "Dummy",
            secure_url: "Dummy",
        },
    });

    if (!course) {
        return next(new AppError("Course creation failed", 500));
    }

    if (req.file) {
        try {
            const result = await cloudinary.v2.uploader.upload(req.file.path, {
                folder: "lms",
            });

            if (result) {
                course.thumbnail.public_id = result.public_id;
                course.thumbnail.secure_url = result.secure_url;
            }

            fs.rm(`uploads/${req.file.filename}`);
        } catch (error) {
            return next(new AppError(error.message, 500));
        }
    }

    await course.save();

    res.status(200).json({
        success: true,
        message: "Course created successfully",
        course,
    });
};

const updateCourse = async function (req, res, next) {
    try {
        const { id } = req.params;
        const course = await Course.findByIdAndUpdate(
            id,
            {
                $set: req.body,
            },
            {
                runValidators: true,
            }
        );

        if (!course) {
            return next(
                new AppError("Course with given ID does not exist", 500)
            );
        }

        await course.save();
        res.status(200).json({
            success: true,
            message: "Course updated successfully",
            course,
        });
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
};

const removeCourse = async function (req, res, next) {
    try {
        const { id } = req.params;
        const course = await Course.findById(id);

        if (!course) {
            return next(
                new AppError("Course with given id does not exist", 500)
            );
        }

        await Course.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Course deleted successfully",
        });
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
};

const addLectureToCourseById = async (req, res, next) => {
    try {
        const { title, description } = req.body;
        const { id } = req.params;
        console.log(req.body)

        // Validate required fields
        if (!id) {
            return next(new AppError("Course ID is required", 400));
        }
        if (!title || !description) {
            return next(
                new AppError("Title and description are required", 400)
            );
        }
        const course = await Course.findById(id);
        if (!course) {
            return next(new AppError("Course does not exist", 404));
        }

        const lectureData = {
            title,
            description,
            lecture: {
                public_id: "Dummy",
                secure_url: "Dummy",
            },
        };

console.log(lectureData)
        if (req.file) {
            try {
                const result = await cloudinary.v2.uploader.upload(
                    req.file.path,
                    {
                        folder: "lms",
                    }
                );
                console.log(result)
                
                if (result) {
                    lectureData.lecture.public_id = result.public_id;
                    lectureData.lecture.secure_url = result.secure_url;
                }
                console.log(result)

                // Remove the uploaded file from the local server
                await fs.rm(`uploads/${req.file.filename}`);
            } catch (error) {
                return next(
                    new AppError(error.message || "File upload failed", 500)
                );
            }
        }

        if (
            !lectureData.lecture.public_id ||
            !lectureData.lecture.secure_url
        ) {
            return next(
                new AppError("Thumbnail upload failed. Please try again.", 500)
            );
        }

        course.lectures.push(lectureData);
        course.numberOfLectures = course.lectures.length;

        await course.save();

        res.status(200).json({
            success: true,
            message: "Lecture added successfully",
            course,
        });
    } catch (error) {
        return next(new AppError(error.message || "An error occurred", 500));
    }
};

export {
    getAllCourses,
    getLecturesByCourseId,
    createCourse,
    updateCourse,
    removeCourse,
    addLectureToCourseById,
};
