import axios from "axios";
const createProduct = async (inputValues) => {
  try {
    const axiosResponse = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/products`,
      inputValues,
      {
        withCredentials: true, // axios sends cookies automatically when this property is set
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return axiosResponse.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "something went wrong.plz Try again";
    return Promise.reject(errorMessage);
  }
};
const getAllProd = async () => {
  try {
    const axiosResponse = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/products`,
      {
        withCredentials: true, // axios sends cookies automatically when this property is set
        headers: { "Content-Type": "application/json" },
      }
    );
    return axiosResponse.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "something went wrong.plz Try again";
    return Promise.reject(errorMessage);
  }
};
const deleteProd = async (productId) => {
  try {
    const axiosResponse = await axios.delete(
      `${import.meta.env.VITE_BASE_URL}/products/${productId}`,

      {
        withCredentials: true, // axios sends cookies automatically when this property is set
        headers: { "Content-Type": "application/json" },
      }
    );
    return axiosResponse.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "something went wrong.plz Try again";
    return Promise.reject(errorMessage);
  }
};

const getSingleProd = async (productId) => {
  try {
    const axiosResponse = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/products/${productId}`,

      {
        withCredentials: true, // axios sends cookies automatically when this property is set
        headers: { "Content-Type": "application/json" },
      }
    );
    return axiosResponse.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "something went wrong.plz Try again";
    return Promise.reject(errorMessage);
  }
};

const updateProd = async ({ inputValues, productId }) => {
  try {
    const axiosResponse = await axios.put(
      `${import.meta.env.VITE_BASE_URL}/products/${productId}`,
      inputValues,
      {
        withCredentials: true, // axios sends cookies automatically when this property is set
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return axiosResponse.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "something went wrong.plz Try again";
    return Promise.reject(errorMessage);
  }
};

const productService = {
  createProduct,
  getAllProd,
  deleteProd,
  getSingleProd,
  updateProd,
};
export default productService;
