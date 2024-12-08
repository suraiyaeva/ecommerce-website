import axios from "axios";

// use this function in authSlice.js => createAsyncThunk
const createCat = async (inputValues) => {
  try {
    const axiosResponse = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/categories`,
      inputValues,
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

const getAllCat = async () => {
  try {
    const axiosResponse = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/categories`,
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
//get single category
const getSingleCat = async (slug) => {
  try {
    const axiosResponse = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/categories/${slug}`,
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

const updateCat = async ({ name, slug }) => {
  try {
    const axiosResponse = await axios.put(
      `${import.meta.env.VITE_BASE_URL}/categories/${slug}`,
      { name },
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
//delete category code
const deleteCat = async (slug) => {
  try {
    const axiosResponse = await axios.delete(
      `${import.meta.env.VITE_BASE_URL}/categories/${slug}`,

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

const categoryService = {
  createCat,
  getAllCat,
  deleteCat,
  getSingleCat,
  updateCat,
};
export default categoryService;
