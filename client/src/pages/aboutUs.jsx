import aboutMain from "../assets/Images/aboutMain.png";
import CarouselSlide from "../components/carouselSlide";
import { celebs } from "../constants/celebrityData";
import HomeLayout from "../layouts/homeLayout";

function AboutUs() {
    return (
        <HomeLayout>
            <div className="pl-20 pt-20 flex flex-col text-white">
                <div className="flex items-center gap-5 mx-10">
                    <section className="w-1/2 space-y-10">
                        <h1 className="text-5xl text-yellow-500 font-semibold">
                            Affordable and quality education
                        </h1>
                        <p className="text-xl text-gray-200">
                            Lorem, ipsum dolor sit amet consectetur adipisicing
                            elit. Quam architecto est dolorem voluptatibus quo
                            rerum ea voluptate, eligendi blanditiis quaerat
                            autem quas obcaecati maiores fugit asperiores
                            quisquam labore excepturi repellat.
                        </p>
                    </section>
                    <div className="w-1/2">
                        <img
                            id="test1"
                            style={{
                                filter: "drop-shadow(0px 10px 10px rgb(0,0,0))",
                            }}
                            className="drop-shadow-2xl"
                            src={aboutMain}
                            alt="About Us"
                        />
                    </div>
                </div>
                <div className="carousel w-1/2 my-16 m-auto">
                    {celebs.map((celeb) => (
                        <CarouselSlide
                            key={celeb.slideNumber}
                            {...celeb}
                            totalSlides={celebs.length}
                        />
                    ))}
                </div>
            </div>
        </HomeLayout>
    );
}

export default AboutUs;
