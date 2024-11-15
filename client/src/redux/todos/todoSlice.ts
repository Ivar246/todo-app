// import { createSlice } from "@reduxjs/toolkit";

// interface todoState {
//   id: number;
//   title: string;
//   descirpiton: string;
// }

// const initialState: userState = {
//   isLoggedIn: false,
//   token: null,
//   currentUser: null,
// };

// export const todoSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     logInSuccess: (state, action) => {
//       state.currentUser = action.payload;
//       state.token = action.payload.token;
//       state.isLoggedIn = true;
//     },

//     logOutSuccess: (state) => {
//       state.currentUser = null;
//       state.isLoggedIn = false;
//       state.token = null;
//     },
//   },
// });

// // used in components
// export const { logInSuccess, logOutSuccess } = todoSlice.actions;
// export default todoSlice.reducer; // for configuring with store
