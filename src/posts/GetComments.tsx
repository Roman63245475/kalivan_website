import {useEffect, useState} from "react";
import type Post from "@/post.ts";

export type Comment = {
    id: string;
    body: string;
    postId: string;
    likes: string;
};

interface GetCommentsProps {
    postid?: number,
    counter?: (count: number) => void;
}

export function GetComments({postid, counter}: GetCommentsProps) {
    const [comments, setComments] = useState<Comment[]>([]);


    useEffect(() => {
        if (!postid)
            return;

        async function loadComments() {
            const response = await fetch(`https://dummyjson.com/posts/${postid}/comments`)
            const json = await response.json();
            setComments(json.comments);
            counter?.(json.comments.length)
        }

        loadComments();
    }, [postid])

    if (comments && comments.length > 0) {
        return <div>
            {
                comments.map((comment: Comment) => {
                return <div>
                    <p><h3>{comment.body}</h3></p>
                </div>
            })
            }
            </div>


    }
}





