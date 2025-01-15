import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import HomeLayout from "../../layouts/homeLayout";
import { getUserData } from "../../redux/slices/authSlice";
import { cancelSubscription } from "../../redux/slices/razorpaySlice";

function UserProfile() {
    const userData = useSelector((state) => state?.auth?.data);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    console.log("userdata",userData);
    async function handleCancellation() {
        toast("Initiating cancellation");
        await dispatch(cancelSubscription());
        await dispatch(getUserData());

        toast.success("Cancellation completed");
        navigate("/");
    }

    return (
        <HomeLayout>
            <div className="min-h-[90vh] flex items-center justify-center bg-gradient-to-r from-gray-800 to-gray-900">
                <div
                    className="my-10 flex flex-col gap-6 p-6 w-96 bg-gray-950 text-white shadow-xl border border-gray-800 
                      rounded-xl transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl"
                >
                    <div className="relative flex items-center justify-center">
                        <img
                            src={userData?.avatar?.secure_url}
                            className="w-40 rounded-full border-4 border-yellow-500 shadow-lg transition-all duration-300 hover:rotate-3 hover:scale-105"
                        />
                    </div>

                    <h3 className="text-2xl font-bold text-center capitalize text-yellow-400 tracking-wide">
                        {userData?.fullName}
                    </h3>

                    <div className="grid grid-cols-2 gap-2 text-gray-300 text-lg">
                        <p className="font-medium">Email:</p>
                        <p className="truncate">{userData?.email}</p>

                        <p className="font-medium">Role:</p>
                        <p className="capitalize">{userData?.role}</p>

                        <p className="font-medium">Subscription:</p>
                        <p
                            className={`${
                                userData?.subscription?.status === "active"
                                    ? "text-green-400"
                                    : "text-red-400"
                            } font-semibold`}
                        >
                            {userData?.subscription?.status === "active"
                                ? "Active"
                                : "Inactive"}
                        </p>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                        <Link
                            to="/changepassword"
                            className="w-1/2 py-2 rounded-md font-semibold text-center text-white bg-yellow-500 hover:bg-yellow-400 
                              transition-all duration-300 ease-in-out shadow-md hover:shadow-yellow-500/50 hover:-translate-y-1"
                        >
                            Change Password
                        </Link>
                        <Link
                            to="/user/editprofile"
                            className="w-1/2 py-2 rounded-md font-semibold text-center text-white bg-yellow-500 hover:bg-yellow-400 
                              transition-all duration-300 ease-in-out shadow-md hover:shadow-yellow-500/50 hover:-translate-y-1"
                        >
                            Edit Profile
                        </Link>
                    </div>

                    {userData?.subscription?.status === "active" && (
                        <button
                            onClick={handleCancellation}
                            className="w-full py-2 rounded-md font-semibold bg-red-600 text-white hover:bg-red-500 
                               transition-all duration-300 ease-in-out shadow-md hover:shadow-red-500/50 hover:-translate-y-1"
                        >
                            Cancel Subscription
                        </button>
                    )}
                </div>
            </div>
        </HomeLayout>
    );
}

export default UserProfile;
