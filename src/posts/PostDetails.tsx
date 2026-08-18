import {useParams} from "react-router";
import {useEffect, useState} from "react";
import type {Post} from "@/post.ts";
import {GetComments} from "@/posts/GetComments.tsx";
import {GetPrettyTags} from "@/App.tsx"
import {useNavigate} from "react-router";

export function PostDetails(){

    const {PostId} = useParams();
    const [post, setPost] = useState<Post | null>(null);
    const [commentCount, setCommentCount] = useState(0);
    const navigate = useNavigate();
    useEffect(()=>{

        async function fetchPost(){
            const response = await fetch("https://dummyjson.com/posts/" + PostId);

            const data = await response.json();
            setPost(data);
        }
        fetchPost();
    }, [])

    if(!post){
        return <i>Post not found</i>
    }

    return (
        <div>
            {
                // JSON.stringify(post)

            }

            <article>
                <h1>{post?.title}</h1>
                <h3>{post?.body}</h3>
                {GetPrettyTags(post.tags)}
                <div>
                    <i>❤︎ : {post?.reactions.likes}   </i>
                    <i>💔 : {post?.reactions.dislikes}   </i>
                    <i>👀 : {post?.views}</i>
                </div>
            </article>

            <h3><i>Comments ({commentCount})</i></h3>
            <GetComments postid={post?.id} counter={setCommentCount}/>
            <button onClick={() => navigate('/')}>Get back</button>
        </div>
    );
}