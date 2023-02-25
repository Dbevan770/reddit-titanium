import { configureStore, combineReducers } from '@reduxjs/toolkit';
import redditReducer from './redditSlice';

export const store = configureStore({
    reducer: combineReducers({
        reddit: redditReducer
    })
});