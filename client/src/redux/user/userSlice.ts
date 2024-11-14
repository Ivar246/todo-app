import { createSlice } from "@reduxjs/toolkit";

export type Role = "ADMIN" | "USER";
export interface User {
  id: number;
  username: string;
  email: string;
  role: Role;
}

interface userState {
  isLoggedIn: boolean;
  token: string | null;
  currentUser: null | User;
}

const initialState: userState = {
  isLoggedIn: false,
  token: null,
  currentUser: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },

    logOutSuccess: (state) => {
      state.currentUser = null;
      state.isLoggedIn = false;
      state.token = null;
    },
  },
});

// used in components
export const { logInSuccess, logOutSuccess } = userSlice.actions;
export default userSlice.reducer; // for configuring with store
