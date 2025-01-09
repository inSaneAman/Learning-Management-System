import AppError from "../utils/error.util.js";
import jwt from "jsonwebtoken";

const isLoggedIn = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return next(new AppError("Unauthenticated, please login again", 401));
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
        return next(
            new AppError("Unauthorized, please login to continue", 401)
        );
    }
    req.user = decoded;

    next();
};

const authorizedRoles =
    (...roles) =>
    async (req, res, next) => {
        const currentUserRole = req.user.role;
        if (!roles.includes(currentUserRole)) {
            return next(new AppError("Access permission denied", 403));
        }
        next();
    };

const authorizedSubscriber = async (req, res, next) => {
    const subscription = req.user.subscription;
    const currentUserRole = req.user.role;

    if (currentUserRole !== "ADMIN" && subscription.status !== "active") {
        return next(
            new AppError("Please subscribe to access this course", 403)
        );
    }
    next();
};

export { isLoggedIn, authorizedRoles, authorizedSubscriber };
