import { APITester } from "./APITester";
import "./index.css";
import {useEffect, useState} from "react";

import logo from "./logo.svg";
import reactLogo from "./react.svg";
import type Post from "@/post.ts";

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
    <div className="app">
      <div className="logo-container">
        <img src={logo} alt="Bun Logo" className="logo bun-logo" />
        <img src={reactLogo} alt="React Logo" className="logo react-logo" />
      </div>

      <h1>Bun + React</h1>
      <p>
        Edit <code>src/App.tsx</code> and save to test HMR
      </p>
      <APITester />
    </div>
  );
}

export default App;
