import { Button } from "antd";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#eff6ff] flex flex-col justify-center items-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
        <div className="text-6xl font-bold text-error mb-4">404</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Sahifa topilmadi
        </h1>
        <p className="text-gray-600 mb-6">
          Kechirasiz, siz qidirgan sahifa mavjud emas yoki o'chirilgan.
        </p>
        <Link to="/">
          <button className="bg-[#8b2ce0] hover:bg-[#8b2ce0] text-white font-medium py-2 px-6 rounded-lg transition duration-300">
            Bosh sahifaga qaytish
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
