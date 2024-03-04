import { createSlice } from "@reduxjs/toolkit";
import { deleteAllCookies } from "src/helper/common";

const initialState = {
	isLogin: null,
	userInfo: null,
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
	},
});

export const { setIsLogin, setUserInfo } = userSlice.actions;

export default userSlice.reducer;
