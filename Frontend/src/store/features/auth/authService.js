import axios from "axios";

// use this function in authSlice.js => createAsyncThunk
const RegisterUser = async (inputValues) => {
  try {
    const axiosResponse = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/regisrer`,
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

const loginUser = async (inputValues) => {
  try {
    const axiosResponse = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/login`,
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
//logout
const logoutUser = async () => {
  try {
    const axiosResponse = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/users/logout`,

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

const authService = { loginUser, RegisterUser, logoutUser };
export default authService;
