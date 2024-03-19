import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import entityReducer from "./features/entitySlice";
import loadingReducer from "./features/loadingSlice";
import timeReducer from "./features/timeSlice";

export const makeStore = () => {
	return configureStore({
		reducer: {
			user: userReducer,
			entity: entityReducer,
			loading: loadingReducer,
			time: timeReducer,
		},
	});
};
