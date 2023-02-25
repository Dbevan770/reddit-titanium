import "./Post.css";
import { decode } from 'html-entities';

export default function Post(props: any) {

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
                
                {props.post.preview && 
                    <div className="image-container">
                        <img className="preview-image" src={decode(props.post.preview.images[0].source.url)} />
                    </div>
                }
            </div>
        </div>
    )
}