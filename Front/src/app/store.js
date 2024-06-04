import { configureStore } from '@reduxjs/toolkit';
import taskReducer from '../features/taskSlice';
import userReducer from '../features/userSlice';

export default configureStore({
    reducer: {
        tasks: taskReducer,
        user: userReducer
    }
})