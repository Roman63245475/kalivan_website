import {SearchComponent} from "@/search.tsx";
import "./index.css";

import {type Component, useEffect, useState} from "react";
import type Post from "@/post.ts";
import * as React from "react";

export function App() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [searchText, setSearchText] = useState('');
    useEffect(() => {
        if (searchText.trim() !== "") {
            fetch('https://dummyjson.com/posts/search?q='+searchText).then(res => res.json()).then(json => setPosts(json.posts));
        }else{
            fetch('https://dummyjson.com/posts').then(res => res.json()).then(json => setPosts(json.posts));
        }
    },[searchText])

    function deletePost(postId: number){
        setPosts(posts.filter((post) => post.id !== postId));
    }

  return (
      <div className={'whole_page'}>
          <SearchComponent currSearchText={searchText} updateSearch={setSearchText} />
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
