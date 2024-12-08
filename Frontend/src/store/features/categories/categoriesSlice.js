import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import categoryService from "./categoriesService.js";

import Categories from "@/Pages/Admin/Categories.jsx";

// Use this function in Categories
export const AddCategory = createAsyncThunk(
  "categories/AddCategory",
  async (inputValues, thunkAPI) => {
    try {
      const response = await categoryService.createCat(inputValues);

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
//use this function in Categories
export const getAllCategories = createAsyncThunk(
  "categories/getAllCategories",
  async (thunkAPI) => {
    try {
      const response = await categoryService.getAllCat();

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getSingleCategory = createAsyncThunk(
  "categories/getSingleCategory",
  async (slug, thunkAPI) => {
    try {
      const response = await categoryService.getSingleCat(slug);

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async ({ name, slug }, thunkAPI) => {
    try {
      const response = await categoryService.updateCat({ name, slug });

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const DeleteCategory = createAsyncThunk(
  "categories/DeleteCategory",
  async (slug, thunkAPI) => {
    try {
      const response = await categoryService.deleteCat(slug);

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//use this function in loginpage
export const logout = createAsyncThunk("auth/logout", async (thunkAPI) => {
  try {
    const response = await authService.logoutUser();
    window.localStorage.removeItem("user");
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const initialState = {
  categories: {},
  status: "idle",
  error: null,
};

// Use this export in store file, authReducer
export const categoriesSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(AddCategory.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(AddCategory.fulfilled, (state, action) => {
        state.status = "success";
        state.categories = action.payload;
      })
      .addCase(AddCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getAllCategories.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.status = "success";
        state.categories = action.payload;
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getSingleCategory.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getSingleCategory.fulfilled, (state, action) => {
        state.status = "success";
        state.categories = action.payload;
      })
      .addCase(getSingleCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateCategory.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.status = "success";
        state.categories = action.payload;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(DeleteCategory.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(DeleteCategory.fulfilled, (state, action) => {
        state.status = "success";
        state.categories = action.payload;
      })
      .addCase(DeleteCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

//export const { incrementByAmount } = categoriesSlice.actions;
// Export the reducer
export default categoriesSlice.reducer;
