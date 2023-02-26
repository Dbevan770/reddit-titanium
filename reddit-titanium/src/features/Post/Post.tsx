import "./Post.css";
import { decode } from 'html-entities';

export default function Post(props: any) {

    const handleCount = (count: number) => {
        if (count >= 1000) {
            const rounded = Math.round(count / 100) / 10
            return rounded.toString() + "k";
        } else {
            return count.toString();
        }
    }

    return (
        <div className="post-background">
            <div className="post-container">
                <h1 className="post-title">
                    {props.post.title}
                </h1>
                <div className="divider"></div>
                <div className="metadata-container">
                    <p className="posted-byline">Posted By: u/{props.post.author} in {props.post.subreddit_name_prefixed}</p>
                    <p className="timeline">• {Math.round((((Date.now() / 1000) - props.post.created_utc) / 60) / 60)}hr ago</p>
                </div>

                {props.post.selftext !== "" &&
                    <p className="selftext-content">{props.post.selftext}</p>
                }
                
                {props.post.post_hint === 'image' && 
                    <div className="content-container">
                        <img className="image-preview" src={decode(props.post.url)} />
                    </div>
                }

                {props.post.post_hint === 'hosted:video' &&
                    <div className="content-container">
                        <video className="video-preview" preload="auto" controls>
                            <source src={decode(props.post.media.reddit_video.fallback_url)}></source>
                        </video>
                    </div>
                }

                {props.post.post_hint === 'link' &&
                    <div className="external-link-container">
                        {props.post.media &&
                            <img className="image-preview" src={props.post.media.oembed.thumbnail_url} />
                        }
                        <div className="link-container">
                            <a href={props.post.url}>{props.post.url}</a>
                        </div>
                    </div>
                }

                <div className="divider"></div>

                <div className="interaction-container">
                    <div className="vote-container">
                        <svg className="icon" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960" width="24"><path d="M417 999V383L254 547l-88-89 314-314 315 314-89 89-163-164v616H417Z"/></svg>
                        <span className="vote-score" dangerouslySetInnerHTML={{__html: handleCount(props.post.score)}}></span>
                        <svg className='icon' xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960" width="24"><path d="M480 999 166 684l88-89 163 164V144h126v615l163-163 89 88-315 315Z"/></svg>
                    </div>
                    <div className="comments-container">
                        <svg
                            className="icon"
                            xmlns="http://www.w3.org/2000/svg" 
                            height="24" 
                            viewBox="0 96 960 960" 
                            width="24">
                                <path 
                                    d="M46 1010V268q0-53 36.5-89.5T172 142h616q53 0 89.5 36.5T914 268v456q0 53-36.5 89.5T788 850H206L46 1010Zm126-275 11-11h605V268H172v467Zm0-467v467-467Z"
                                />
                        </svg>
                        <span className="comments-total" dangerouslySetInnerHTML={{__html: handleCount(props.post.num_comments) + " Comments"}}></span>
                    </div>
                </div>
            </div>
        </div>
    )
}