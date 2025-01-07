function CarouselSlide({
    image,
    title,
    description,
    slideNumber,
    totalSlides,
}) {
    return (
        <div
            id={`slide${slideNumber}`}
            className="carousel-item relative w-full flex justify-center"
        >
            <div className="flex flex-col items-center justify-center gap-4 px-[15%] text-center">
                <img
                    src={image}
                    className="w-40 h-40 rounded-full border-2 border-gray-400 object-cover"
                    alt={title || "Carousel Image"}
                />
                {description && (
                    <p className="text-xl text-gray-200">{description}</p>
                )}
                {title && <h3 className="text-2xl font-semibold">{title}</h3>}
            </div>
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a
                    href={`#slide${
                        slideNumber === 1 ? totalSlides : slideNumber - 1
                    }`}
                    className="btn btn-circle"
                    aria-label="Previous Slide"
                >
                    ❮
                </a>
                <a
                    href={`#slide${(slideNumber % totalSlides) + 1}`}
                    className="btn btn-circle"
                    aria-label="Next Slide"
                >
                    ❯
                </a>
            </div>
        </div>
    );
}

export default CarouselSlide;
