import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { getSubredditPosts } from "../api/reddit";

interface RedditState {
    posts: Array<any>;
    hasError: boolean;
    isLoading: boolean;
    searchTerm: string;
    selectedSubreddit: string;
}

const initialState: RedditState = {
    posts: [],
    hasError: false,
    isLoading: false,
    searchTerm: '',
    selectedSubreddit: '/r/popular',
}

export const getPostsAsync = createAsyncThunk(
    'posts/fetchPosts',
    async (subreddit: string) => {
        console.log("Running getPostsAsync...");
        const response = await getSubredditPosts(subreddit);
        return response;
    }
);

export const redditSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        getPosts: (state, action: PayloadAction<any>) => {
            state.posts = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPostsAsync.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
            })
            .addCase(getPostsAsync.fulfilled, (state, action) => {
                state.posts = action.payload;
                state.isLoading = false;
                state.hasError = false;
            })
            .addCase(getPostsAsync.rejected, (state) => {
                state.isLoading = false;
                state.hasError = true;
            })
    },
});

export const { 
    getPosts
} = redditSlice.actions;

export const selectPosts = (state: RootState) => state.reddit.posts;

export default redditSlice.reducer;