import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import entityReducer from "./features/entitySlice";
import loadingReducer from "./features/loadingSlice";

export const makeStore = () => {
	return configureStore({
		reducer: {
			user: userReducer,
			entity: entityReducer,
			loading: loadingReducer,
		},
	});
};
