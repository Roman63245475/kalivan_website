import {useParams} from "react-router";
import {useEffect, useState} from "react";
import type {Post} from "@/posts/GetPosts.tsx";
import {GetComments} from "@/posts/GetComments.tsx";
export function PostDetails(){

    const {PostId} = useParams();
    const [post, setPost] = useState<Post | null>(null);
    const [commentCount, setCommentCount] = useState(0);
    useEffect(()=>{

        async function fetchPost(){
            const response = await fetch("https://dummyjson.com/posts/" + PostId);

            const data = await response.json();
            setPost(data);
        }
        fetchPost();
    }, [])

    if(!post){
        <i>Post not found</i>
    }

    return (
        <div>
            {
                // JSON.stringify(post)

            }

            <article>
                <h1>{post?.title}</h1>
                <h3>{post?.body}</h3>
                <div>
                    {post?.tags.map(tag=>(
                            <strong ># {tag} </strong>
                        )
                    )}
                </div>
                <div>
                    <i>❤︎ : {post?.reactions.likes}   </i>
                    <i>💔 : {post?.reactions.dislikes}   </i>
                    <i>👀 : {post?.views}</i>
                </div>
            </article>

            <h3><i>Comments ({commentCount})</i></h3>
            <GetComments postid={post?.id} counter={setCommentCount}/>
        </div>
    );
}