import { configureStore } from '@reduxjs/toolkit';
import redditReducer from './redditSlice';

export const store = configureStore({
    reducer: {
        reddit: redditReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;