import React, { useState, useEffect } from "react";
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

  return (
    <div className="w-full  mx-auto p-6 bg-gradient-to-br from-indigo-40 to-purple-100 rounded-3xl shadow-2xl">
      {/* Swiper Container */}
      <div className="relative">
        {/* Main Image Display */}
        <div className="relative h-96 overflow-hidden rounded-2xl mb-6">
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
                    className="w-80 h-60 object-cover rounded-2xl shadow-2xl group-hover:shadow-3xl transition-all duration-500"
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
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white text-gray-800 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-40"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white text-gray-800 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-40"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center space-x-3 mb-4">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? "w-12 h-3 bg-gradient-to-r from-purple-500 to-pink-500"
                  : "w-3 h-3 bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>

        {/* Thumbnails */}
        <div className="flex justify-center space-x-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => goToSlide(index)}
              className={`flex-shrink-0 transition-all duration-300 ${
                index === currentIndex
                  ? "ring-4 ring-purple-500 scale-110"
                  : "ring-2 ring-transparent hover:ring-purple-300"
              }`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-16 h-12 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              />
            </button>
          ))}
        </div>

        {/* Auto-play Control */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
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
