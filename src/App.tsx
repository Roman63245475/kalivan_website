import { GetPosts} from "@/posts/GetPosts.tsx";

export function App() {
  return (
    <div>
      <title>Chatter</title>
      <button>Post</button>
      <GetPosts />
    </div>
  );
}

export default App;
