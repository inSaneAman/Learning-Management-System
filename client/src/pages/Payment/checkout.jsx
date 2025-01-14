import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiRupee } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import {
    getRazorpayId,
    purchaseCourseBundle,
    verifyUserPayment,
} from "../../Redux/Slices/RazorpaySlice";

function Checkout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false);

    const razorpayKey = useSelector((state) => state?.razorpay?.key);
    const subscription_id = useSelector(
        (state) => state?.razorpay?.subscription_id
    );

    useEffect(() => {
        async function loadRazorpay() {
            if (!window.Razorpay) {
                const script = document.createElement("script");
                script.src = "https://checkout.razorpay.com/v1/checkout.js";
                script.async = true;
                script.onload = () => {
                    setIsRazorpayLoaded(true);
                };
                script.onerror = () => {
                    toast.error("Failed to load Razorpay. Please refresh.");
                };
                document.body.appendChild(script);
            } else {
                setIsRazorpayLoaded(true);
            }
        }

        async function fetchPaymentDetails() {
            await dispatch(getRazorpayId());
            await dispatch(purchaseCourseBundle());
        }

        loadRazorpay();
        fetchPaymentDetails();
    }, [dispatch]);

    async function handleSubscription(e) {
        e.preventDefault();

        if (!isRazorpayLoaded) {
            toast.error("Razorpay is not loaded. Please wait...");
            return;
        }

        if (!razorpayKey || !subscription_id) {
            toast.error("Payment error. Please try again.");
            return;
        }

        const options = {
            key: razorpayKey,
            subscription_id: subscription_id,
            name: "Coursify Pvt. Ltd.",
            description: "Subscription",
            theme: { color: "#F37254" },

            handler: async function (response) {
                const paymentDetails = {
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature,
                    razorpay_subscription_id: response.razorpay_subscription_id,
                };

                toast.success("Payment successful!");

                try {
                    const res = await dispatch(
                        verifyUserPayment(paymentDetails)
                    );
                    res?.payload?.success
                        ? navigate("/checkout/success")
                        : navigate("/checkout/fail");
                } catch (error) {
                    toast.error(error || "Payment verification failed.");
                    navigate("/checkout/fail");
                }
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }

    return (
        <HomeLayout>
            <form
                onSubmit={handleSubscription}
                className="min-h-[90vh] flex items-center justify-center text-white"
            >
                <div className="w-80 h-[26rem] flex flex-col justify-center items-center shadow-[0_0_10px_black] rounded-lg relative bg-gray-900">
                    <h1 className="bg-yellow-500 absolute top-0 w-full text-center py-4 text-2xl font-bold rounded-t-lg">
                        Subscription Bundle
                    </h1>

                    <div className="px-4 pt-16 space-y-6 text-center relative">
                        <p className="text-[17px] leading-relaxed">
                            This purchase grants you
                            <span className="font-bold text-yellow-500">
                                {" "}
                                full access{" "}
                            </span>
                            to all courses on our platform for
                            <span className="text-yellow-500 font-bold block mt-1">
                                1 Year Duration
                            </span>
                            including all existing and newly launched courses.
                        </p>

                        <p className="flex items-center justify-center gap-1 text-2xl font-bold text-yellow-500">
                            <BiRupee />
                            <span>499</span> only
                        </p>

                        <div className="text-gray-200 text-sm space-y-1">
                            <p>100% refund on cancellation</p>
                            <p>*Terms and conditions apply*</p>
                        </div>

                        <button
                            type="submit"
                            className="bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 w-full text-xl font-bold rounded-lg py-2"
                            disabled={!isRazorpayLoaded}
                        >
                            {isRazorpayLoaded ? "Buy Now" : "Loading..."}
                        </button>
                    </div>
                </div>
            </form>
        </HomeLayout>
    );
}

export default Checkout;
