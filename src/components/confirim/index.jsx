import { useState, useEffect } from "react";
import { useAxios } from "../../hooks";

const PhoneVerification = ({ onVerificationSuccess }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [error, setError] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [telegramInfo, setTelegramInfo] = useState("");

  const axios = useAxios();

  // Hisoblagichni boshqarish
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // Telefon raqamni tasdiqlash kodi yuborish
  const sendVerificationCode = async () => {
    if (!phoneNumber || phoneNumber.length !== 9) {
      setError("Iltimos, to'g'ri telefon raqam kiriting");
      return;
    }

    setLoading(true);
    setError("");
    setTelegramInfo("");

    try {
      // APIga telefon raqamni yuborish
      const response = await axios({
        url: "/send-code/",
        method: "POST",
        data: {
          phone_number: `+998${phoneNumber}`,
        },
      });

      console.log("Tasdiqlash kodi yuborildi:", response.data);

      // Telegram bot orqali kod yuborilganligi haqida ma'lumot
      setTelegramInfo(
        "Tasdiqlash kodi Telegram botingizga yuborildi: @qizlar_raqamliavlod_bot"
      );

      // Kod yuborilganini belgilash
      setIsCodeSent(true);
      setCountdown(60); // 60 soniyalik hisoblagich
    } catch (err) {
      console.error("Xatolik yuz berdi:", err);
      setError(
        err.response?.data?.message || "Kod yuborishda xatolik yuz berdi"
      );
    } finally {
      setLoading(false);
    }
  };

  // Tasdiqlash kodini tekshirish
  const verifyCode = async () => {
    if (verificationCode.length !== 6) {
      setError("Tasdiqlash kodi 6 raqamdan iborat bo'lishi kerak");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // APIga tasdiqlash kodini yuborish
      const response = await axios({
        url: "/check-code/",
        method: "POST",
        data: {
          phone_number: `+998${phoneNumber}`,
          code: verificationCode,
        },
      });

      console.log("Kod tasdiqlandi:", response.data);
      onVerificationSuccess(phoneNumber);
    } catch (err) {
      console.error("Xatolik yuz berdi:", err);
      setError(
        err.response?.data?.message || "Kod noto'g'ri yoki muddati o'tgan"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl bg-white rounded-xl shadow-lg overflow-hidden p-4 md:p-6 flex flex-col items-center justify-center">
        <div className="text-center mb-4 md:mb-6 w-full px-2 md:px-0 md:w-4/5 lg:w-3/4">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">
            Ro'yxatdan o'tish
          </h1>
          <p className="text-gray-600 mt-2 text-sm md:text-base">
            Telefon raqamingizni kiriting va Telegram bot orqali tasdiqlash
            kodini oling
          </p>
        </div>

        <div className="space-y-4 w-full px-4 md:px-0 md:w-4/5 lg:w-3/4">
          {/* Telefon raqami kiritish */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Telefon raqami
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 text-sm rounded-l-lg border border-r-0 border-gray-300 bg-gray-100 text-gray-600">
                +998
              </span>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => {
                  const onlyNums = e.target.value.replace(/\D/g, "");
                  if (onlyNums.length <= 9) {
                    setPhoneNumber(onlyNums);
                  }
                }}
                placeholder="90 123 45 67"
                className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isCodeSent || loading}
              />
            </div>
          </div>

          {!isCodeSent ? (
            <>
              <button
                onClick={sendVerificationCode}
                disabled={loading}
                className="w-full bg-[#9333ea] text-white py-2 px-4 rounded-lg hover:bg-[#8b2ce0] focus:outline-none focus:ring-2 focus:ring-[#9333ea] focus:ring-offset-2 transition duration-200 disabled:opacity-50"
              >
                {loading ? "Yuborilmoqda..." : "Kodni yuborish"}
              </button>

              {/* Telegram bot haqida ma'lumot */}
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                <p className="text-xs md:text-sm text-blue-700">
                  <strong>Eslatma:</strong> Tasdiqlash kodi Telegram botingizga
                  yuboriladi. Iltimos,{" "}
                  <a
                    href="https://t.me/qizlar_raqamliavlod_bot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-blue-800 hover:underline"
                  >
                    @qizlar_raqamliavlod_bot
                  </a>{" "}
                  ga obuna bo'ling.
                </p>
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tasdiqlash kodi
                </label>
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => {
                    const onlyNums = e.target.value.replace(/\D/g, "");
                    if (onlyNums.length <= 6) {
                      setVerificationCode(onlyNums);
                    }
                  }}
                  placeholder="XXXXXX"
                  className="w-full px-3 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center tracking-widest"
                  disabled={loading}
                />
                <p className="text-xs text-gray-500 mt-1">
                  +998 {phoneNumber} raqamiga Telegram orqali yuborilgan kodni
                  kiriting
                </p>
              </div>

              {telegramInfo && (
                <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                  <p className="text-xs md:text-sm text-green-700">
                    {telegramInfo}
                  </p>
                </div>
              )}

              <div className="flex flex-col md:flex-row gap-3">
                <button
                  onClick={verifyCode}
                  disabled={loading}
                  className="w-full bg-[#9333ea] text-white py-2 px-4 rounded-lg hover:bg-[#8b2ce0] focus:outline-none focus:ring-2 focus:ring-[#9333ea] focus:ring-offset-2 transition duration-200 disabled:opacity-50"
                >
                  {loading ? "Tekshirilmoqda..." : "Tasdiqlash"}
                </button>
              </div>
            </>
          )}

          {error && (
            <div className="bg-red-50 p-3 rounded-lg border border-red-200">
              <p className="text-xs md:text-sm text-red-700">{error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhoneVerification;
