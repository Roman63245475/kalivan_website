import {SearchComponent} from "@/search.tsx";
import "./index.css";

import {type Component, useEffect, useState} from "react";
import type Post from "@/post.ts";
import * as React from "react";
import {useNavigate} from "react-router";

export function App() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate();
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
          <PostButton setPosts={setPosts} />
          <div className={'feed'}>
              {posts.map(post => (
                  <GetSinglePost key={post.id} post={post} onDelete={deletePost} navigate={navigate} />
              ))}
          </div>
      </div>
  );
}



function GetSinglePost(props: {post: Post, onDelete: (postId: number) => void, navigate: (path:string) => void}) {
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

                <button className={'view_post'} onClick={() => props.navigate(`/post/${post.id}`)}>
                    View Post
                </button>
            </div>
        </div>
    )
}

export function GetPrettyTags(tags: string[]){
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
function PostButton({ setPosts }: { setPosts: React.Dispatch<React.SetStateAction<Post[]>> }) {
    const [showCreatePost, setShowCreatePost] = useState(false);
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [tags, setTags] = useState("");
    async function CreatePost() {
        if (title.trim() === "" || body.trim() === "" || tags.trim() === "") {
            return;
        }

        const response = await fetch("https://dummyjson.com/posts/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title,
                body,
                userId: 1,
                tags: tags.split(" "),
                views: 0,
                reactions:  { likes: 0, dislikes: 0 }

            }),
        });

        const newPost: Post = await response.json();

        setPosts((currentPosts) => [newPost, ...currentPosts]);

        setTitle("");
        setBody("");
        setTags("");
        setShowCreatePost(false);
    }

    function modal() {
        return (
            <div className="modal-background">
                <div className="create-post-modal">
                    <button className="close-button" onClick={() => setShowCreatePost(false)} >❌️</button>

                    <h2>Create Post</h2>
                    <input
                        type="text"
                        placeholder="Post title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                        placeholder="What's happening?"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="tags"
                        value={tags}
                        onChange={(e) => {setTags(e.target.value)}}/>
                    <button onClick={CreatePost}>Post</button>
                </div>
            </div>
        );
    }

    return (
        <div>
            <button onClick={() => setShowCreatePost(true)}>Post</button>
            {showCreatePost && modal()}
        </div>
    );
}
export default App;
