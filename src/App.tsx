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

  return (
      <div className={'whole_page'}>
          <SearchComponent />
          <div className={'feed'}>
              {getFeed(posts)}
          </div>
      </div>
  );
}

function getFeed(posts: Post[]){
    return posts.map(post => GetSinglePost(post));
}

function GetSinglePost(post: Post) {
    return (
        <div key={post.id}>
            <h1>{post.title}</h1> <h3>Tags: {post.tags}</h3>
            <h2>{post.body}</h2>
            <h3>Likes: {post.reactions.likes}</h3> <h3>Dislikes: {post.reactions.dislikes}</h3>
            <h3>Views: {post.views}</h3>
        </div>
    )
}

export default App;
