import { createSlice } from "@reduxjs/toolkit";
//THIS IS ALL FOR LOCAL STORAGE
const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.userInfo = null; //give it null
      localStorage.removeItem("userInfo"); //remove from local storage
    },
  },
});
export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
