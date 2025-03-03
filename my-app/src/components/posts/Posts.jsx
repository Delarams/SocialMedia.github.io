import "./posts.scss"
import Post from "../post/Post";
import { useQuery } from '@tanstack/react-query'
import { makeRequest } from "../../axios";

const Posts = ({userId}) => {

  // const { isLoading, error, data } = useQuery({
  //   queryKey: ['posts'], 
  //   queryFn: async () => {
  //     const res = await makeRequest.get("/posts");
  //     console.log("Fetched data:", res.data);  // Debugging log
  //     return res.data;
  //   }
  // });
  
  // console.log(data)  

  // return (
  //   <div className="posts">
  //     {error 
  //       ? "Something went wrong!" 
  //       : isLoading
  //       ? "Loading..." 
  //       : data && Array.isArray(data) 
  //       ? data.map((post) => <Post post={post} key={post.id} />) 
  //       : "No posts found."
  //     }
  //   </div>
  // );

  const { isLoading, error, data } = useQuery({
    queryKey: userId ? ['posts', userId] : ['posts'], 
    queryFn: async () => {
      console.log("Fetching posts...");
      const url = userId ? `/posts?userId=${userId}` : "/posts";
      console.log("🛠️ Request URL:", url);  // Debugging
      const res = await makeRequest.get(url);
      console.log("Fetched data:", res.data);
      return res.data;
    }
});

  
  console.log("Error:", error);
  
  return (
    <div className="posts">
      {error 
       ? `Something went wrong: ${error.message}`  // Show actual error message
       : isLoading
       ? "Loading..." 
       : data?.map((post) => <Post post={post} key={post.id} />)}
    </div>
  );
  
  
};

export default Posts