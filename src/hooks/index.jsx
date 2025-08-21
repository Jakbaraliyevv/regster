import axios from "axios";

export const useAxios = () => {
  const response = async ({ url, method = "GET", data, headers, params }) => {
    try {
      const res = await axios({
        url: `${import.meta.env.VITE_BASE_URL}${url}`,
        method,
        data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
          ...headers,
        },
        params: {
          access_token: localStorage.getItem("token"),
          ...params,
        },
      });

      return res.data;
    } catch (error) {
      console.error("Axios xatolik:", error);
      throw error;
    }
  };

  return response;
};
