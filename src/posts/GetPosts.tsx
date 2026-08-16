import { useEffect, useState } from "react";
import {useNavigate} from "react-router";

export type Post = {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: {
    likes: number;
    dislikes: number;
  };
  views: number;
};

export function GetPosts() {

  const [posts, setPosts] = useState<Post[]>([]);
  const navigate = useNavigate()
  async function GetPostById(Post: Post) {
    navigate(`/${Post.id}`);

  }
  useEffect(() => {
    async function fetchPosts() {
      const response = await fetch("https://dummyjson.com/posts");
      const data = await response.json();
      setPosts(data.posts);
    }

    fetchPosts();
  }, []);

  return (
    <div>
      {posts.map(post => (
          <button onClick={() => {GetPostById(post)}}>
              <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>

            <div>
                {post.tags.map(tag => (
                    <strong key={tag}># {tag}</strong>
                ))}
            </div>
            <div>
                <i>❤︎ : {post.reactions.likes}   </i>
                <i>💔 : {post.reactions.dislikes}   </i>
                <i>👀 : {post.views}</i>
            </div>
        </article>
          </button>
      ))}
    </div>
  );
}
