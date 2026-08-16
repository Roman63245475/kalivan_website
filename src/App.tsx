import { APITester } from "./APITester";
import {SearchComponent} from "@/search.tsx";
import "./index.css";

import logo from "./logo.svg";
import reactLogo from "./react.svg";
import {type Component, useEffect, useState} from "react";
import type Post from "@/post.ts";
import * as React from "react";




export function App(search: boolean = false, input: string = '') {
    const [posts, setPosts] = useState<Post[]>([]);
    useEffect(() => {
        if (search){
            console.log('hi')
        }
        fetch('https://dummyjson.com/posts').then(res => res.json()).then(json => setPosts(json.posts));
    },[])

    function deletePost(postId: number){
        setPosts(posts.filter((post) => post.id !== postId));
    }

  return (
      <div className={'whole_page'}>
          <SearchComponent />
          <div className={'feed'}>
              {posts.map(post => (
                  <GetSinglePost key={post.id} post={post} onDelete={deletePost}/>
              ))}
          </div>
      </div>
  );
}



function GetSinglePost(props: {post: Post, onDelete: (postId: number) => void}) {
    const post = props.post;
    return (
        <div>
            <h1>{post.title}</h1>
            <h2>{post.body}</h2>
            {GetPrettyTags(post.tags)}
            <h3>Likes: {post.reactions.likes} | Dislikes: {post.reactions.dislikes} | Views: {post.views}</h3>
            <div className={'actions'}>
                <button className={'delete_post'} onClick={() => props.onDelete(post.id)}>
                    Delete Post
                </button>

                <button className={'view_post'}>
                    View Post
                </button>
            </div>
        </div>
    )
}

function GetPrettyTags(tags: string[]){
    return (
        <div>
            Tags:
            <span style={{ marginLeft: "10px" }}>
                {tags.map((tag, index) => (
                    <span key={index}>
                    <span style={{color : 'pink'}}>{tag}</span>
                        {index < tags.length - 1 && ", "}
                </span>
                ))}
            </span>
        </div>
    )
}

export default App;
