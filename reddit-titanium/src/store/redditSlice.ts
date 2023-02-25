import { createSlice } from "@reduxjs/toolkit";

const options = {
    name: 'posts',
    initialState: {
        posts: [],
        hasError: false,
        isLoading: false,
    },
    reducers: {

    }
}

export const redditSlice = createSlice(options);
export const selectPosts = (state: any) => state.posts;
export default redditSlice.reducer;