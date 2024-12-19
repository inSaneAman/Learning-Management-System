import { model, Schema } from "mongoose";

const courseSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            minLength: [5, "Title must be atleast 8 characters"],
            maxLength: [59, "Title should be ess than 60 characters"],
        },
        description: {
            type: String,
            required: [true, "Description is required"],
            minLength: [8, "Description must be atleast 8 characters"],
            maxLength: [200, "Description should be ess than 200 characters"],
        },
        category: {
            type: String,
            required: [true, "Category is required"],
        },
        thumbnail: {
            public_id: {
                type: String,
                required: true,
            },
            secure_url: {
                type: String,
                required: true,
            },
        },
        lectures: [
            {
                title: String,
                description: String,
                lecture: {
                    public_id: {
                        type: String,
                        required: true,
                    },
                    secure_url: {
                        type: String,
                        required: true,
                    },
                },
            },
        ],
        numberOfLectures: {
            type: Number,
            default: 0,
        },
        createdBy: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Course = model("Cousre", courseSchema);

export default Course;
