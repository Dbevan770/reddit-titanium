import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectPosts, getPostsAsync } from '../../store/redditSlice';
import Post from "../Post/Post";
import "./Home.css";

export default function Home() {
    const reddit = useAppSelector((state: any) => state.reddit);
    const { isLoading, hasError, searchTerm, selectedSubreddit } = reddit;
    const posts = useAppSelector(selectPosts);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getPostsAsync(selectedSubreddit));
        console.log(posts);
    }, [selectedSubreddit])
    return (
        <div className='home-container'>
            {!isLoading ? posts.map((post) => <Post key={post.id} post={post} /> ) : <div>Loading...</div>}
        </div>
    )
}