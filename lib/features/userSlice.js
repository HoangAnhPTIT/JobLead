import { createSlice } from "@reduxjs/toolkit";
import { deleteAllCookies } from "src/helper/common";

const initialState = {
	isLogin: null,
	useInfo: null,
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setIsLogin: (state, action) => {
			state.isLogin = action.payload;
		},
		setUserInfo: (state, action) => {
			state.userInfo = action.payload;
		},
		logout: (state) => {
			state.isLogin = false;
			deleteAllCookies();
		},
	},
});

export const { setIsLogin, setUserInfo, logout } = userSlice.actions;

export default userSlice.reducer;
