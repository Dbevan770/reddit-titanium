export const API_ROOT = "https://www.reddit.com";

export const getSubredditPosts = async (subreddit: string) => {
    console.log("Running getSubredditPosts");
    const response = await fetch(`${API_ROOT}${subreddit}.json`);
    if (response.ok) {
        console.log("Good response!");
        const json = await response.json();
        return json.data.children.map((post: any) => post.data);
    } else {
        console.log("Bad response :(");
    }
}