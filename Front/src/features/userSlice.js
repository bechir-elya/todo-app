import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = 'http://localhost:1520'

const initialState = {
    user: {},
    status: 'idle',
    message: ''
}


export const updateUser = createAsyncThunk(
    'user/updateUser',
    async ({id, formData}) => {
        try {
            const response = await axios.put(`${BASE_URL}/updateuser/${id}`, formData, { withCredentials: true });
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
)



const userSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers(builder) {
        builder


            .addCase(updateUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.message = action.payload;
            })
            .addCase(updateUser.rejected, (state) => {
                state.status = 'failed';
            })
    }
})


export const userInfo = (state) => state.user.user;
export const message = (state) => state.user.message;

export default userSlice.reducer;


