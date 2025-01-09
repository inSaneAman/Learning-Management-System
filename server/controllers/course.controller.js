import Course from "../models/course.model.js";
import AppError from "../utils/error.util.js";
import cloudinary from "cloudinary";
import fs from "fs/promises";
import asyncHandler from "../middlewares/asyncHandler.js";
const getAllCourses = asyncHandler(async function (req, res, next) {
    const courses = await Course.find({}).select("-lectures");

    res.status(200).json({
        success: true,
        message: "All courses",
        courses,
    });
});

const getLecturesByCourseId = asyncHandler(async function (req, res, next) {
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
});

const createCourse = asyncHandler(async function (req, res, next) {
    const { title, description, category, createdBy } = req.body;

    if (!title || !description || !category || !createdBy) {
        return next(new AppError("All fields are required", 400));
    }

    const course = await Course.create({
        title,
        description,
        category,
        createdBy,
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
            for (const file of await fs.readdir("uploads/")) {
                await fs.unlink(path.join("uploads/", file));
            }
            return next(
                new AppError(
                    JSON.stringify(error) ||
                        "File not uploaded, please try again",
                    400
                )
            );
        }
    }

    await course.save();

    res.status(201).json({
        success: true,
        message: "Course created successfully",
        course,
    });
});

const updateCourse = asyncHandler(async function (req, res, next) {
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
        return next(new AppError("Course with given ID does not exist", 500));
    }

    await course.save();
    res.status(200).json({
        success: true,
        message: "Course updated successfully",
        course,
    });
});

const removeCourse = asyncHandler(async function (req, res, next) {
    const { id } = req.params;
    const course = await Course.findById(id);

    if (!course) {
        return next(new AppError("Course with given id does not exist", 500));
    }

    await Course.findByIdAndDelete(id);

    res.status(200).json({
        success: true,
        message: "Course deleted successfully",
    });
});

const addLectureToCourseById = asyncHandler(async (req, res, next) => {
    const { title, description } = req.body;
    const { id } = req.params;

    // Validate required fields
    if (!id) {
        return next(new AppError("Course ID is required", 400));
    }

    let lectureData = {};

    if (!title || !description) {
        return next(new AppError("Title and description are required", 400));
    }

    const course = await Course.findById(id);
    if (!course) {
        return next(new AppError("Course does not exist", 404));
    }

    if (req.file) {
        try {
            const result = await cloudinary.v2.uploader.upload(req.file.path, {
                folder: "lms",
                chunk_size: 50000000,
                resource_type: "video",
            });

            if (result) {
                lectureData.public_id = result.public_id;
                lectureData.secure_url = result.secure_url;
            }

            // Remove the uploaded file from the local server
            await fs.rm(`uploads/${req.file.filename}`);
        } catch (error) {
            for (const file of await fs.readdir("uploads/")) {
                await fs.unlink(path.join("uploads/", file));
            }
            return next(
                new AppError(error.message || "File upload failed", 500)
            );
        }
    }

    if (!lectureData.lecture.public_id || !lectureData.lecture.secure_url) {
        return next(
            new AppError("Thumbnail upload failed. Please try again.", 500)
        );
    }

    course.lectures.push({ title, description, lecture: lectureData });
    course.numberOfLectures = course.lectures.length;

    await course.save();

    res.status(200).json({
        success: true,
        message: "Lecture added successfully",
        course,
    });
});

export {
    getAllCourses,
    getLecturesByCourseId,
    createCourse,
    updateCourse,
    removeCourse,
    addLectureToCourseById,
};
