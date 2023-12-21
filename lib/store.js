import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import entityReducer from "./features/entitySlice";

export const makeStore = () => {
	return configureStore({
		reducer: {
			user: userReducer,
			entity: entityReducer,
		},
	});
};
