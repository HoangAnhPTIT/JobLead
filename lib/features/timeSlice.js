import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

const initialState = {
	today: dayjs().format("DD/MM/YYYY"),
};

export const timeSlice = createSlice({
	name: "time",
	initialState,
});

export default timeSlice.reducer;
