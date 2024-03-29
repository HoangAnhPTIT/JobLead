import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

const initialState = {
	today: dayjs().toString(),
};

export const timeSlice = createSlice({
	name: "time",
	initialState,
});

export default timeSlice.reducer;
