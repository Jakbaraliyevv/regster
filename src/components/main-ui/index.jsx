import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../../public/logo.png";

import hero1 from "../../../public/heromage1.png";
import hero2 from "../../../public/heromage2.png";
import hero3 from "../../../public/heromage3.png";
import hero4 from "../../../public/heromage4.png";
import hero5 from "../../../public/heromage5.png";

import {
  Play,
  Sparkles,
  ArrowRight,
  Eye,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const DigitalGirlsSanctuary = () => {
  const [activeVideo, setActiveVideo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const videos = [
    {
      id: 1,
      title: "AI va Texnologiya",
      color: "from-pink-500 to-violet-600",
      views: "2.1K",
      duration: "15:42",
      url: "VITFlXXEaqI",
    },
    {
      id: 2,
      title: "3D Dizayn Sirları",
      color: "from-cyan-400 to-blue-600",
      views: "1.8K",
      duration: "12:30",
      url: "dQw4w9WgXcQ",
    },
    {
      id: 3,
      title: "Koding Princess",
      color: "from-emerald-400 to-teal-600",
      views: "3.2K",
      duration: "18:15",
      url: "jNQXAC9IVRw",
    },
    {
      id: 4,
      title: "Digital Art Magic",
      color: "from-rose-400 to-pink-600",
      views: "2.7K",
      duration: "22:08",
      url: "M7lc1UVf-VE",
    },
    {
      id: 5,
      title: "UX/UI Mastery",
      color: "from-purple-500 to-indigo-600",
      views: "1.9K",
      duration: "14:33",
      url: "fJ9rUzIMcZQ",
    },
    {
      id: 6,
      title: "Tech Startup Queen",
      color: "from-yellow-400 to-orange-600",
      views: "2.5K",
      duration: "19:45",
      url: "ZZ5LpwO-An4",
    },
    {
      id: 7,
      title: "VR Dunyo Yaratish",
      color: "from-indigo-500 to-purple-700",
      views: "1.6K",
      duration: "16:20",
      url: "YE7VzlLtp-4",
    },
    {
      id: 8,
      title: "Blockchain Beauty",
      color: "from-teal-400 to-cyan-600",
      views: "2.3K",
      duration: "13:55",
      url: "L_jWHffIx5E",
    },
    {
      id: 9,
      title: "Mobile App Dev",
      color: "from-green-400 to-emerald-600",
      views: "3.5K",
      duration: "25:10",
      url: "ScMzIvxBSi4",
    },
    {
      id: 10,
      title: "Future Tech Trends",
      color: "from-orange-500 to-red-600",
      views: "4.2K",
      duration: "20:30",
      url: "hFZFjoX2cGg",
    },
  ];

  const nextVideo = () => {
    setActiveVideo((prev) => (prev + 1) % videos.length);
  };

  const prevVideo = () => {
    setActiveVideo((prev) => (prev - 1 + videos.length) % videos.length);
  };

  return (
    <div className="min-h-screen bg-[#FFF] text-white relative overflow-hidden">
      {/* Custom cursor - hidden on mobile */}
      {!isMobile && (
        <div
          className="fixed w-6 h-6 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full pointer-events-none z-50 mix-blend-difference transition-all duration-150 ease-out"
          style={{
            left: mousePos.x - 12,
            top: mousePos.y - 12,
            transform: "scale(0.5)",
          }}
        />
      )}

      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(rgba(147, 51, 234, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(147, 51, 234, 0.3) 1px, transparent 1px)
          `,
            backgroundSize: "50px 50px",
            animation: "grid-move 20s linear infinite",
          }}
        ></div>
      </div>

      <div
        className={`relative z-10 ${
          isMobile ? "flex flex-col" : "flex"
        } min-h-screen`}
      >
        <div
          className={`${
            isMobile ? "w-full" : "w-1/2"
          } relative overflow-hidden`}
        >
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-br from-pink-500/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
            <div
              className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-full blur-3xl animate-pulse"
              style={{ animationDelay: "2s" }}
            ></div>
          </div>
          {/* logo2 */}
          <div className="ml-9 max-[768px]:flex max-[768px]:items-center max-[768px]:justify-center max-[768px]:ml-0">
            <Link to={"/"}>
              <img src={logo} className="w-[180px] h-auto" alt="" />
            </Link>
          </div>
          <div
            className={`relative h- flex flex-col justify-center ${
              isMobile ? "p-6 py-8" : "p-12"
            }`}
          >
            {/* logo image */}

            <div className="text-center mb-12">
              <h1
                className={`${
                  isMobile ? "text-4xl" : "text-6xl"
                } font-black mb-4 relative`}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-pink-500 to-cyan-400 bg-clip-text text-transparent animate-pulse">
                  RAQAMLI
                </span>
                <span className="bg-gradient-to-r from-pink-500 to-cyan-400 bg-clip-text text-transparent">
                  RAQAMLI
                </span>
              </h1>
              <div className="relative">
                <h2
                  className={`${
                    isMobile ? "text-2xl" : "text-4xl"
                  } font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent mb-2`}
                >
                  AVLOD QIZLARI
                </h2>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-full"></div>
              </div>
              <p
                className={`${
                  isMobile ? "text-lg" : "text-2xl"
                } font-light text-purple-500 mt-6 tracking-widest`}
              >
                Ilm, innovatsiya va kelajak sari!
              </p>
            </div>

            <div className="flex flex-col gap-[25px]">
              <p
                className={`text-center text-[#3699de] font-medium font-serif italic leading-relaxed ${
                  isMobile ? "text-sm px-2" : "text-[19px]"
                }`}
              >
                Bu tanlov qizlarimizga ta'lim, sun'iy intellekt, yashil
                iqtisodiyot va iqlim o'zgarishi kabi dolzarb yo'nalishlarda o'z
                salohiyatini namoyish etish imkoniyatini beradi.
              </p>
            </div>

            <div className="text-center mt-[40px]">
              <div className="relative group inline-block">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-full blur-lg opacity-70 group-hover:opacity-100 transition-all duration-500"></div>
                <Link to={"/confirim"}>
                  <button
                    className={`relative ${
                      isMobile ? "px-6 py-3 text-base" : "px-8 py-4 text-lg"
                    } bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-full text-white font-bold hover:scale-110 transform transition-all duration-300 shadow-2xl border-2 border-white/20 hover:border-white/40 group flex items-center justify-center gap-3`}
                  >
                    <Sparkles
                      className={`${isMobile ? "w-5 h-5" : "w-6 h-6"}`}
                    />
                    Ro'yxatdan o'tish
                    <ArrowRight
                      className={`${
                        isMobile ? "w-5 h-5" : "w-6 h-6"
                      } group-hover:translate-x-1 transition-transform duration-300`}
                    />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Video Section */}
        <div
          className={`${isMobile ? "w-full" : "w-1/2"} ${
            isMobile ? "p-4" : "p-6"
          } relative`}
        >
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-10 right-10 w-64 h-64 bg-gradient-to-br from-pink-500/10 to-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
            <div
              className="absolute bottom-10 left-10 w-72 h-72 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 rounded-full blur-3xl animate-pulse"
              style={{ animationDelay: "1.5s" }}
            ></div>
            <div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-yellow-500/5 to-orange-600/5 rounded-full blur-3xl animate-pulse"
              style={{ animationDelay: "3s" }}
            ></div>
          </div>

          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(isMobile ? 15 : 25)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-gradient-to-r from-pink-400 to-purple-400 rounded-full opacity-40"
                style={{
                  width: `${2 + Math.random() * 4}px`,
                  height: `${2 + Math.random() * 4}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `floatParticle ${
                    4 + Math.random() * 6
                  }s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 5}s`,
                }}
              />
            ))}
          </div>

          <div className="relative h-full">
            {isMobile ? (
              /* Mobile Video Layout */
              <div className="flex flex-col items-center justify-center min-h-[500px] space-y-6">
                {/* Main Video */}
                <div className="w-full max-w-sm relative group">
                  <div
                    className={`absolute -inset-4 bg-gradient-to-r ${videos[activeVideo].color} rounded-3xl blur-xl opacity-50 group-hover:opacity-80 transition-all duration-500 animate-pulse`}
                  ></div>

                  <div
                    className={`relative w-full aspect-video bg-gradient-to-br ${videos[activeVideo].color} rounded-3xl overflow-hidden shadow-2xl border-2 border-white/30 group-hover:border-white/50 transition-all duration-500`}
                  >
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${videos[activeVideo].url}`}
                      title={videos[activeVideo].title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="w-full h-full rounded-3xl"
                    ></iframe>

                    {/* Video Overlay Info */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4">
                      <h4 className="text-white font-bold text-lg mb-1">
                        {videos[activeVideo].title}
                      </h4>
                      <div className="flex items-center justify-between text-sm text-gray-300">
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {videos[activeVideo].views}
                        </span>
                        <span>{videos[activeVideo].duration}</span>
                      </div>
                    </div>

                    {/* Active Indicator */}
                    <div className="absolute top-4 right-4 w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
                    <div className="absolute top-4 right-4 w-4 h-4 bg-green-500 rounded-full"></div>
                  </div>
                </div>

                {/* Mobile Navigation */}
                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={prevVideo}
                    className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg border border-white/20"
                  >
                    <ChevronLeft className="w-6 h-6 text-white" />
                  </button>

                  <div className="bg-black/60 backdrop-blur-xl rounded-full px-6 py-2 border border-white/20">
                    <span className="text-white font-medium">
                      {activeVideo + 1} / {videos.length}
                    </span>
                  </div>

                  <button
                    onClick={nextVideo}
                    className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg border border-white/20"
                  >
                    <ChevronRight className="w-6 h-6 text-white" />
                  </button>
                </div>

                {/* Mobile Video Title */}
                <div className="text-center px-4">
                  <h3 className="text-xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    {videos[activeVideo].title}
                  </h3>
                </div>

                {/* Mobile Video Thumbnails */}
                <div className="w-full overflow-x-auto pb-4">
                  <div
                    className="flex gap-3 px-4"
                    style={{ width: "max-content" }}
                  >
                    {videos.map((video, index) => (
                      <div
                        key={video.id}
                        className={`flex-shrink-0 cursor-pointer transition-all duration-300 ${
                          index === activeVideo
                            ? "scale-110"
                            : "scale-100 opacity-70"
                        }`}
                        onClick={() => setActiveVideo(index)}
                      >
                        <div
                          className={`w-20 h-14 bg-gradient-to-br ${
                            video.color
                          } rounded-lg overflow-hidden shadow-lg border ${
                            index === activeVideo
                              ? "border-white/50"
                              : "border-white/20"
                          }`}
                        >
                          <div className="absolute inset-0 bg-black/20"></div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Play
                              className="w-3 h-3 text-white"
                              fill="currentColor"
                            />
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-1">
                            <span className="text-white text-xs font-medium truncate block">
                              {video.title.split(" ")[0]}
                            </span>
                          </div>
                        </div>

                        {/* Video number indicator */}
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg">
                          {index + 1}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* Desktop Video Layout - Original circular layout */
              <div className="relative h-full overflow-hidden">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                  <div
                    className="group cursor-pointer"
                    onClick={() => setActiveVideo(0)}
                  >
                    <div
                      className={`absolute -inset-4 bg-gradient-to-r ${videos[activeVideo].color} rounded-3xl blur-xl opacity-50 group-hover:opacity-80 transition-all duration-500 animate-pulse`}
                    ></div>

                    <div
                      className={`relative w-80 h-52 bg-gradient-to-br ${videos[activeVideo].color} rounded-3xl overflow-hidden shadow-2xl border-2 border-white/30 group-hover:border-white/50 transition-all duration-500 group-hover:scale-105`}
                    >
                      <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${videos[activeVideo].url}`}
                        title={videos[activeVideo].title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="w-full h-full rounded-3xl"
                      ></iframe>

                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4">
                        <h4 className="text-white font-bold text-lg mb-1">
                          {videos[activeVideo].title}
                        </h4>
                        <div className="flex items-center justify-between text-sm text-gray-300">
                          {/* <span className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {videos[activeVideo].views}
                          </span> */}
                          <span>{videos[activeVideo].duration}</span>
                        </div>
                      </div>

                      <div className="absolute top-4 right-4 w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
                      <div className="absolute top-4 right-4 w-4 h-4 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                </div>

                {/* Surrounding Smaller Videos - Circular Layout */}
                {videos.slice(1).map((video, index) => {
                  const angle = (index * 360) / 9;
                  const radius = 280;
                  const x = Math.cos((angle * Math.PI) / 180) * radius;
                  const y = Math.sin((angle * Math.PI) / 180) * radius;

                  return (
                    <div
                      key={video.id}
                      className="absolute group cursor-pointer z-10"
                      style={{
                        left: `50%`,
                        top: `50%`,
                        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                      }}
                      onClick={() => setActiveVideo(index + 1)}
                    >
                      <div
                        className={`absolute -inset-2 bg-gradient-to-r ${video.color} rounded-2xl blur-lg opacity-0 group-hover:opacity-60 transition-all duration-500`}
                      ></div>

                      <div
                        className={`relative w-28 h-20 bg-gradient-to-br ${video.color} rounded-2xl overflow-hidden shadow-xl border border-white/20 group-hover:border-white/40 transition-all duration-300 group-hover:scale-110`}
                      >
                        <div className="absolute inset-0 bg-black/20"></div>

                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 group-hover:scale-110 transition-all duration-300">
                            <Play
                              className="w-4 h-4 text-white ml-0.5"
                              fill="currentColor"
                            />
                          </div>
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                          {/* <h5 className="text-white text-xs font-medium truncate">
                            {video.title}
                          </h5> */}
                          <div className="flex items-center justify-between text-xs text-gray-300 mt-1">
                            {/* <span className="flex items-center gap-1">
                              <Eye className="w-2 h-2" />
                              {video.views}
                            </span> */}
                            <span>{video.duration}</span>
                          </div>
                        </div>

                        <div
                          className="absolute w-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                          style={{
                            height: `${radius - 50}px`,
                            left: "50%",
                            top: "50%",
                            transform: `rotate(${angle + 180}deg)`,
                            transformOrigin: "0 0",
                            opacity: "0.3",
                          }}
                        ></div>
                      </div>
                      <h2 className="text-[#ae92c8] font-medium text-[14px] mt-2">
                        {video.title}
                      </h2>

                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg">
                        {index + 2}
                      </div>
                    </div>
                  );
                })}

                {/* Center Video Number */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none">
                  <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-lg">
                    1
                  </div>
                </div>

                {/* Video Counter */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
                  <div className="bg-black/60 backdrop-blur-xl rounded-full px-6 py-2 border border-white/20">
                    <span className="text-white font-medium">
                      {activeVideo + 1} / {videos.length}
                    </span>
                  </div>
                </div>

                {/* Navigation Arrows */}
                <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-30">
                  <button
                    onClick={() =>
                      setActiveVideo(
                        (activeVideo - 1 + videos.length) % videos.length
                      )
                    }
                    className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg border border-white/20"
                  >
                    <ArrowRight className="w-6 h-6 text-white rotate-180" />
                  </button>
                </div>

                <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-30">
                  <button
                    onClick={() =>
                      setActiveVideo((activeVideo + 1) % videos.length)
                    }
                    className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg border border-white/20"
                  >
                    <ArrowRight className="w-6 h-6 text-white" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes grid-move {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(50px, 50px);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
            opacity: 1;
          }
        }

        @keyframes floatParticle {
          0%,
          100% {
            transform: translateY(0px) translateX(0px) scale(1);
            opacity: 0.4;
          }
          25% {
            transform: translateY(-10px) translateX(5px) scale(1.2);
            opacity: 0.8;
          }
          50% {
            transform: translateY(-20px) translateX(-5px) scale(0.8);
            opacity: 1;
          }
          75% {
            transform: translateY(-10px) translateX(10px) scale(1.1);
            opacity: 0.6;
          }
        }
      `}</style>
    </div>
  );
};

export default DigitalGirlsSanctuary;
