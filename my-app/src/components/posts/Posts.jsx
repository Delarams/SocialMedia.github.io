import "./posts.scss"
import Post from "../post/Post";
import { useQuery } from '@tanstack/react-query'
import { makeRequest } from "../../axios";

const Posts = () => {

  const { isLoading, error, data } = useQuery({
    queryKey: ['posts'], 
    queryFn: async () => {
      const res = await makeRequest.get("/posts");
      return res.data;
    }
  });
   

  console.log(data)  

  return (
    <div className="posts">
      {error 
       ? "something went wrong!" 
       : isLoading
       ? "loading" 
       : data.map((post)=> <Post post={post} key={post.id} /> )}
    </div>
  );
};

export default Posts