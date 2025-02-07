import { createAsyncThunk } from "@reduxjs/toolkit";
import { Notify } from "notiflix";
import { workspaceApiClient } from "../../services/apiClient";

// axios.defaults.baseURL = 'https://667320036ca902ae11b333e3.mockapi.io/api/';

export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      const { data, status } = await workspaceApiClient.post(
        "users/signup",
        user
      );

      if (status !== 201) {
        Notify.failure("Registration failed");
        return null;
      }

      Notify.success("Registration successful!");
      return data;
    } catch (error) {
      if (error.response && error.response.status === 409) {
        Notify.failure("Email is already in use");
      } else {
        Notify.failure("Something went wrong. Please try again later.");
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const { data, status } = await workspaceApiClient.post("users/signin", {
        email: credentials.email,
        password: credentials.password,
      });

      if (status === 200) {
        return data;
      } else {
        Notify.failure("Invalid email or password");
        return null;
      }
    } catch (e) {
      Notify.failure("An error occurred. Please try again.");
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const statusUpdate = createAsyncThunk(
  "auth/statusUpdate",
  async (newStatus, thunkAPI) => {
    try {
      const response = await workspaceApiClient.patch(
        "users/status",
        { status: newStatus },
        { withCredentials: true }
      );

      return response.data;
    } catch (e) {
      Notify.failure("Failed to update status. Please try again.");
      return thunkAPI.rejectWithValue(e.response?.data?.message || e.message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await workspaceApiClient.post(
      "users/signout",
      {},
      { withCredentials: true }
    );

    return null;
  } catch (e) {
    console.log(e);
    return thunkAPI.rejectWithValue(e.message);
  }
});

export const refresh = createAsyncThunk("auth/refresh", async (_, thunkAPI) => {
  try {
    const { data } = await workspaceApiClient.get("users/current", {
      withCredentials: true,
    });

    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
  }
});
