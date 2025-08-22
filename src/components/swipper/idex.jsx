import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SimpleImageSwiper = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // 10 ta rasm uchun sample data
  const images = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop",
      alt: "Image 1",
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop",
      alt: "Image 2",
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=400&h=300&fit=crop",
      alt: "Image 3",
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400&h=300&fit=crop",
      alt: "Image 4",
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=400&h=300&fit=crop",
      alt: "Image 6",
    },
    {
      id: 7,
      src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=300&fit=crop",
      alt: "Image 7",
    },
    {
      id: 8,
      src: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop",
      alt: "Image 8",
    },
    {
      id: 9,
      src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop",
      alt: "Image 9",
    },
    {
      id: 10,
      src: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400&h=300&fit=crop",
      alt: "Image 10",
    },
  ];

  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, images.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const getVisibleImages = () => {
    const visibleImages = [];
    for (let i = -1; i <= 1; i++) {
      const index = (currentIndex + i + images.length) % images.length;
      visibleImages.push({
        ...images[index],
        position: i,
      });
    }
    return visibleImages;
  };

  const fullText =
    "aAgar bir erkakni o'qitsangiz – bir insonni o'qitgansiz, agar bir ayolni o'qitsangiz – butun bir oilani, jamiyatni o'qitgansiz";
  const author = " Mahmudxo'ja Behbudiy";

  const [text, setText] = useState("");
  const [authorText, setAuthorText] = useState("");
  const [showAuthor, setShowAuthor] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const textRef = useRef(null);

  // Intersection Observer for scroll-based typing
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          startTyping();
        }
      },
      {
        threshold: 0.3, // 30% ko'rinishda boshlash
        rootMargin: "0px",
      }
    );

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => {
      if (textRef.current) {
        observer.unobserve(textRef.current);
      }
    };
  }, [hasStarted]);

  const startTyping = () => {
    setText("");
    setAuthorText("");
    setShowAuthor(false);

    let index = 0;
    const interval = setInterval(() => {
      setText((prev) => prev + fullText.charAt(index));
      index++;
      if (index === fullText.length) {
        clearInterval(interval);
        setTimeout(() => setShowAuthor(true), 800);
      }
    }, 50);
  };

  // Author typing effect
  useEffect(() => {
    if (showAuthor && typeof author === "string") {
      let index = 0;
      const interval = setInterval(() => {
        if (index < author.length - 1) {
          setAuthorText((prev) => prev + author[index]);
          index++;
        } else {
          clearInterval(interval);
        }
      }, 80);

      return () => clearInterval(interval);
    }
  }, [showAuthor, author]);

  return (
    <div className="w-full mx-auto p-3 sm:p-4 md:p-6 bg-gradient-to-br from-indigo-40 to-purple-100 rounded-xl sm:rounded-2xl md:rounded-3xl shadow-2xl">
      <div
        className="flex items-center justify-center px-4 sm:px-6 lg:px-0"
        ref={textRef}
      >
        <div className="text-[#000] w-full sm:w-[85%] md:w-[70%] lg:w-[60%] xl:w-[50%] text-sm sm:text-base md:text-lg lg:text-xl flex flex-col gap-3 sm:gap-4">
          <p className="text-center font-medium font-serif italic leading-relaxed px-2 sm:px-0">
            {text}
            {text && text.length < fullText.length && (
              <span className="inline-block w-0.5 h-4 sm:h-5 md:h-6 bg-gray-600 ml-1 animate-pulse"></span>
            )}
          </p>

          <h4 className="text-sm sm:text-base md:text-lg font-bold font-serif text-end mt-2 px-2 sm:px-0">
            {authorText}
            {showAuthor && authorText.length < author.length && (
              <span className="inline-block w-0.5 h-4 sm:h-5 bg-gray-600 ml-1 animate-pulse"></span>
            )}
          </h4>
        </div>
      </div>

      {/* Swiper Container */}
      <div className="relative">
        {/* Main Image Display */}
        <div className="relative h-60 sm:h-72 md:h-80 lg:h-96 overflow-hidden rounded-xl sm:rounded-2xl mb-4 sm:mb-6">
          <div className="flex items-center justify-center h-full">
            {getVisibleImages().map((image) => (
              <div
                key={`${image.id}-${image.position}`}
                className={`absolute transition-all duration-700 ease-in-out transform ${
                  image.position === -1
                    ? "scale-75 opacity-40 -translate-x-64 rotate-12 z-10"
                    : image.position === 0
                    ? "scale-100 opacity-100 translate-x-0 rotate-0 z-30"
                    : "scale-75 opacity-40 translate-x-64 -rotate-12 z-10"
                }`}
              >
                <div className="relative group cursor-pointer">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-56 sm:w-64 md:w-72 lg:w-80 h-40 sm:h-48 md:h-52 lg:h-60 object-cover rounded-xl sm:rounded-2xl shadow-2xl group-hover:shadow-3xl transition-all duration-500"
                  />

                  {/* Overlay effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-2xl"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white text-gray-800 p-2 sm:p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-40"
          >
            <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white text-gray-800 p-2 sm:p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-40"
          >
            <ChevronRight size={20} className="sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? "w-8 sm:w-10 md:w-12 h-2 sm:h-3 bg-gradient-to-r from-purple-500 to-pink-500"
                  : "w-2 sm:w-3 h-2 sm:h-3 bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>

        {/* Thumbnails */}
        <div className="flex justify-center space-x-1 sm:space-x-2 overflow-x-auto pb-2 px-2">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => goToSlide(index)}
              className={`flex-shrink-0 transition-all duration-300 ${
                index === currentIndex
                  ? "ring-2 sm:ring-4 ring-purple-500 scale-105 sm:scale-110"
                  : "ring-2 ring-transparent hover:ring-purple-300"
              }`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-12 sm:w-14 md:w-16 h-9 sm:h-10 md:h-12 object-cover rounded-md sm:rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              />
            </button>
          ))}
        </div>

        {/* Auto-play Control */}
        <div className="flex justify-center mt-4 sm:mt-6">
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className={`px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base font-medium transition-all duration-300 ${
              isAutoPlaying
                ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg hover:shadow-xl"
                : "bg-gray-200 text-gray-600 hover:bg-gray-300"
            }`}
          >
            {isAutoPlaying ? "⏸️ Pause" : "▶️ Play"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SimpleImageSwiper;
