import { useState } from "react";
import { Upload, User, Book, FileText, Send, ChevronDown } from "lucide-react";

import provinces from "../data/provinces.json";
import districts from "../data/districts.json";
import { useAxios } from "../../hooks";

const DavlatXizmatlariForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    surename: "",
    middle_name: "",
    phone_number: "",
    b_day: "",
    tg_username: "",
    email: "",
    place_of_study: "",
    direction: "",
    project_file: null,
    file: null,
    province: "",
    district: "",
    about: "",
  });

  const [projectFileName, setProjectFileName] = useState("");
  const [recommendationFileName, setRecommendationFileName] = useState("");
  const [isProvinceOpen, setIsProvinceOpen] = useState(false);
  const [isDistrictOpen, setIsDistrictOpen] = useState(false);
  const axios = useAxios();
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const selectedFile = files[0];
      setFormData({ ...formData, [name]: selectedFile });

      if (name === "project_file") {
        setProjectFileName(selectedFile ? selectedFile.name : "");
      } else if (name === "file") {
        setRecommendationFileName(selectedFile ? selectedFile.name : "");
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleProvinceSelect = (province) => {
    setFormData({ ...formData, province, district: "" });
    setIsProvinceOpen(false);
  };

  const handleDistrictSelect = (district) => {
    setFormData({ ...formData, district });
    setIsDistrictOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form maʼlumotlari:", formData);
    alert("Maʼlumotlar muvaffaqiyatli yuborildi! Konsolga qarang.");
  };

  const provinceOptions = provinces.map((province) => ({
    id: province.id,
    name: province.name_uz || province.name,
  }));
  const getDistrictOptions = () => {
    if (!formData.province) return [];

    const selectedProvince = provinceOptions.find(
      (p) => p.name === formData.province
    );
    if (!selectedProvince) return [];

    const provinceDistricts = districts.filter(
      (d) => d.region_id === selectedProvince.id
    );
    return provinceDistricts.map((district) => ({
      id: district.id,
      name: district.name_uz || district.name,
    }));
  };

  axios({
    url: "/register/",
    method: "POST",
    data: formData,
  })
    .then((data) => console.log(data))
    .catch((error) => console.log(error));

  return (
    <div className="min-h-screen  bg-gradient-to-br from-blue-50 to-indigo-100 py-4 px-2 sm:py-8 sm:px-4">
      <div className="max-w-2xl  mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-400 to-purple-600 p-4 sm:p-6 text-white">
          <h1 className="text-xl text-center sm:text-2xl font-bold mb-2">
            Ro'yxatdan o'tish
          </h1>
          <p className="text-sm text-center sm:text-base opacity-90">
            Barcha ma'lumotlarni to'liq kiriting:
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-4 sm:p-6 space-y-4 sm:space-y-6"
        >
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Ism
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Ismingizni kiriting:"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Familiya
                </label>
                <input
                  type="text"
                  placeholder="Familiyangizni kiriting:"
                  name="surename"
                  value={formData.surename}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Otasining ismi
                </label>
                <input
                  type="text"
                  placeholder="Sharafingizni kiriting:"
                  name="middle_name"
                  value={formData.middle_name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Tug'ilgan yili
                </label>
                <input
                  type="date"
                  name="b_day"
                  value={formData.b_day}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Telefon raqami
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-2 sm:px-3 text-xs sm:text-sm rounded-l-lg border border-r-0 border-gray-300 bg-gray-100 text-gray-600">
                    +998
                  </span>
                  <input
                    type="tel"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={(e) => {
                      const onlyNums = e.target.value.replace(/\D/g, "");
                      if (onlyNums.length <= 9) {
                        setFormData({ ...formData, phone_number: onlyNums });
                      }
                    }}
                    placeholder="90 200 64 69"
                    className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="sm:col-span-1">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Telegram username
                </label>
                <input
                  type="text"
                  name="tg_username"
                  value={formData.tg_username}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="@username"
                />
              </div>
            </div>
          </div>

          {/* Viloyat va tuman qismi (o'zgarmagan) */}
          <div className="border-t border-gray-200 pt-4 sm:pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="relative">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Viloyat
                </label>
                <div
                  className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent flex justify-between items-center cursor-pointer bg-white"
                  onClick={() => setIsProvinceOpen(!isProvinceOpen)}
                >
                  <span>{formData.province || "Viloyatni tanlang"}</span>
                  <ChevronDown className="w-4 h-4" />
                </div>
                {isProvinceOpen && (
                  <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {provinceOptions.map((province) => (
                      <div
                        key={province.id}
                        className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-sm sm:text-base"
                        onClick={() => handleProvinceSelect(province.name)}
                      >
                        {province.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Tuman
                </label>
                <div
                  className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent flex justify-between items-center cursor-pointer bg-white"
                  onClick={() =>
                    formData.province && setIsDistrictOpen(!isDistrictOpen)
                  }
                  style={{ opacity: formData.province ? 1 : 0.7 }}
                >
                  <span>{formData.district || "Tumanni tanlang"}</span>
                  <ChevronDown className="w-4 h-4" />
                </div>
                {isDistrictOpen && formData.province && (
                  <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {getDistrictOptions().map((district) => (
                      <div
                        key={district.id}
                        className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-sm sm:text-base"
                        onClick={() => handleDistrictSelect(district.name)}
                      >
                        {district.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  O'qish/Ta'lim joyi
                </label>
                <input
                  type="text"
                  placeholder="Misol: Toshkent, Amir Temur shox ko'chasi 17"
                  name="place_of_study"
                  value={formData.place_of_study}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Yo'nalish
                </label>
                <input
                  type="text"
                  name="direction"
                  placeholder="Kasbingizni kiriting:"
                  value={formData.direction}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4 sm:pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Example@gmail.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
          </div>

          {/* Fayl yuklash qismi - TO'G'RILANDI */}
          <div className="flex items-center justify-between gap-4">
            <div className="border-t border-gray-200 pt-4 sm:pt-6 w-[100%]">
              <div className="flex items-center mb-3 sm:mb-4">
                <div className="bg-yellow-100 p-1 sm:p-2 rounded-full mr-2 sm:mr-3">
                  <FileText className="text-yellow-600 w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                  Loyiha
                </h2>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 text-center bg-gray-50">
                <div className="mx-auto w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2 sm:mb-3">
                  <Upload className="text-blue-600 w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                  Loyiha faylini yuklang (PDF, DOC)
                </label>
                <p className="text-xs text-gray-500 mb-3 sm:mb-4">
                  Maksimal hajm: 10MB
                </p>

                <div className="flex items-center justify-center">
                  <label className="cursor-pointer bg-white py-2 px-3 sm:px-4 border border-gray-300 rounded-md shadow-sm text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <span>Fayl tanlash</span>
                    <input
                      type="file"
                      name="project_file"
                      onChange={handleChange}
                      className="sr-only"
                      accept=".pdf,.doc,.docx"
                    />
                  </label>
                </div>

                {projectFileName && (
                  <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-gray-600">
                    Tanlangan fayl:{" "}
                    <span className="font-medium">{projectFileName}</span>
                  </p>
                )}
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4 sm:pt-6 w-full">
              <div className="flex items-center mb-3 sm:mb-4">
                <div className="bg-yellow-100 p-1 sm:p-2 rounded-full mr-2 sm:mr-3">
                  <FileText className="text-yellow-600 w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                  Tavsiyanoma
                </h2>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 text-center bg-gray-50">
                <div className="mx-auto w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2 sm:mb-3">
                  <Upload className="text-blue-600 w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                  Tavsiyanoma faylini yuklang (PDF, DOC)
                </label>
                <p className="text-xs text-gray-500 mb-3 sm:mb-4">
                  Maksimal hajm: 10MB
                </p>

                <div className="flex items-center justify-center">
                  <label className="cursor-pointer bg-white py-2 px-3 sm:px-4 border border-gray-300 rounded-md shadow-sm text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <span>Fayl tanlash</span>
                    <input
                      type="file"
                      name="file"
                      onChange={handleChange}
                      className="sr-only"
                      accept=".pdf,.doc,.docx"
                    />
                  </label>
                </div>

                {recommendationFileName && (
                  <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-gray-600">
                    Tanlangan fayl:{" "}
                    <span className="font-medium">
                      {recommendationFileName}
                    </span>
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Qolgan qismlar (o'zgarmagan) */}
          <div className="border-t border-gray-200 pt-4 sm:pt-6">
            <div className="mb-3 sm:mb-4">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                Nima uchun sizni tanlashimiz kerak?
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                O'zingiz haqingizda va nima uchun aynan sizni tanlashimiz kerak
                degan savolga javob bering...
              </p>
            </div>

            <textarea
              name="about"
              value={formData.about}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Qisqacha izoh yozing..."
            ></textarea>
          </div>

          <div className="pt-3 sm:pt-4">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-700 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 flex items-center justify-center text-sm sm:text-base"
            >
              <Send size={16} className="mr-2" />
              Ro'yxatdan o'tish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DavlatXizmatlariForm;
