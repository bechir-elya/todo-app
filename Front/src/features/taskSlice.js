import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = 'http://localhost:1520';

const initialState = {
    tasks: [],
    pendingCount: 0,
    completedCount: 0,
    canceledCount: 0,
    overdueCount: 0,
    status: 'idle'
};

export const fetchTask = createAsyncThunk(
    'tasks/fetchTask',
    async (userId) => {
        try {
            const response = await axios.get(`${BASE_URL}/tasks/${userId}`, { withCredentials: true });
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
);


export const fetchDeletedItem = createAsyncThunk(
    'tasks/fetchDeletedItem',
    async () => {
        try {
            const response = await axios.get(`${BASE_URL}/deleteditem`, {withCredentials: true});
            console.log(response.data.length);
            return response.data.length;
        } catch (error) {
            console.log(error);
        }
    }
)


export const addTask = createAsyncThunk(
    'tasks/addTask',
    async (data) => {
        try {
            const response = await axios.post(`${BASE_URL}/addtask`, data, { withCredentials: true });
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const updateTask = createAsyncThunk(
    'tasks/updateTask',
    async ({ id, data }) => {
        try {
            const response = await axios.put(`${BASE_URL}/updatetask/${id}`, data, { withCredentials: true });
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const deleteTask = createAsyncThunk(
    'tasks/deleteTask',
    async (id) => {
        try {
            const response = await axios.delete(`${BASE_URL}/deleteTask/${id}`, { withCredentials: true });
            return { id };
        } catch (error) {
            console.log(error);
        }
    }
);

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    extraReducers(builder) {
        builder
            .addCase(fetchTask.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTask.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.tasks = action.payload;
                state.pendingCount = action.payload.filter(task => !task.completed).length;
                state.completedCount = action.payload.filter(task => task.completed).length;
                const currentDate = new Date();
                state.overdueCount = action.payload.filter(task => new Date(task.deadline).getTime() < currentDate.getTime()).length;
            })
            .addCase(fetchTask.rejected, (state) => {
                state.status = 'failed';
            })


            .addCase(addTask.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addTask.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.tasks.push(action.payload);
                if (action.payload.completed) {
                    state.completedCount += 1;
                } else {
                    state.pendingCount += 1;
                }
            })
            .addCase(addTask.rejected, (state) => {
                state.status = 'failed';
            })


            .addCase(updateTask.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const taskIndex = state.tasks.findIndex((item) => item._id === action.payload._id);
                const oldTask = state.tasks[taskIndex];
                state.tasks[taskIndex] = action.payload;

                // Update the counters based on the old and new task status
                if (oldTask.completed !== action.payload.completed) {
                    if (action.payload.completed) {
                        state.completedCount += 1;
                        state.pendingCount -= 1;
                    } else {
                        state.completedCount -= 1;
                        state.pendingCount += 1;
                    }
                }
            })
            .addCase(updateTask.rejected, (state) => {
                state.status = 'failed';
            })


            .addCase(deleteTask.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const taskIndex = state.tasks.findIndex((item) => item._id === action.payload.id);
                if (taskIndex !== -1) {
                    const deletedTask = state.tasks[taskIndex];
                    console.log('Deleted Task:', deletedTask);
                    state.tasks.splice(taskIndex, 1);

                    // Update the counters based on the deleted task status
                    if (deletedTask.completed) {
                        state.completedCount -= 1;
                    } else {
                        state.pendingCount -= 1;
                    }
                    console.log('Counters after deletion:', {
                        completedCount: state.completedCount,
                        pendingCount: state.pendingCount,
                    });
                }
            })
            .addCase(deleteTask.rejected, (state) => {
                state.status = 'failed';
            })


            .addCase(fetchDeletedItem.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchDeletedItem.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.canceledCount = action.payload; //longueur du tableau Info
            })
            .addCase(fetchDeletedItem.rejected, (state) => {
                state.status = 'failed';
            })
    }
});

export const selectAllTasks = (state) => state.tasks.tasks;
export const selectPendingCount = (state) => state.tasks.pendingCount;
export const selectCompletedCount = (state) => state.tasks.completedCount;
export const selectCanceledCount = (state) => state.tasks.canceledCount;
export const selectOverdueCount = (state) => state.tasks.overdueCount;


export default taskSlice.reducer;
