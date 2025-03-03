import "./profile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts";
import { makeRequest } from "../../axios";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { useContext, useState } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  const userId = parseInt(useLocation().pathname.split("/")[2]);

  const { isLoading, error, data } = useQuery({
    queryKey: ["user", userId], // Differentiate users properly
    queryFn: async () => {
      const res = await makeRequest.get("/users/find/" + userId);
      return res.data;
    },
  });

  const { isLoading: rIsLoading, data: relationshipData } = useQuery({
    queryKey: ["relationship", userId],
    queryFn: async () => {
      const res = await makeRequest.get(`/relationships?followedUserId=${userId}`);
      return res.data;
    },
  });

  const queryClient = useQueryClient();
  const [following, setFollowing] = useState(false);

  // This ensures the button updates properly
  useState(() => {
    if (relationshipData) {
      setFollowing(relationshipData.includes(currentUser.id));
    }
  }, [relationshipData]);

  const mutation = useMutation({
    mutationFn: async () => {
      if (following) {
        return await makeRequest.delete(`/relationships?userId=${userId}`);
      } else {
        return await makeRequest.post("/relationships", { userId });
      }
    },
    onSuccess: () => {
      setFollowing(!following);
      queryClient.invalidateQueries({ queryKey: ["relationship", userId] });
    },
  });

  const handleFollow = () => {
    mutation.mutate();
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Something went wrong!</div>;

  return (
    <div className="profile">
      <div className="images">
        <img
          src={data?.coverPic || "https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg"}
          alt="Cover"
          className="cover"
        />
        <img
          src={data?.profilePic || "https://images.pexels.com/photos/14028501/pexels-photo-14028501.jpeg"}
          alt="Profile"
          className="profilePic"
        />
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="left">
            <a href="http://facebook.com"><FacebookTwoToneIcon fontSize="large" /></a>
            <a href="http://instagram.com"><InstagramIcon fontSize="large" /></a>
            <a href="http://twitter.com"><TwitterIcon fontSize="large" /></a>
            <a href="http://linkedin.com"><LinkedInIcon fontSize="large" /></a>
            <a href="http://pinterest.com"><PinterestIcon fontSize="large" /></a>
          </div>
          <div className="center">
            <span>{data?.name || "Unknown User"}</span>
            <div className="info">
              <div className="item">
                <PlaceIcon />
                <span>{data?.city || "No City Info"}</span>
              </div>
              <div className="item">
                <LanguageIcon />
                <span>{data?.website || "No Website Info"}</span>
              </div>
            </div>
            {rIsLoading ? "loading" : userId === currentUser.id ? (
              <button>Update</button>
            ) : (
              <button onClick={handleFollow}>
                {following ? "Following" : "Follow"}
              </button>
            )}
          </div>
          <div className="right">
            <EmailOutlinedIcon />
            <MoreVertIcon />
          </div>
        </div>
        <Posts userId={userId} />
      </div>
    </div>
  );
};

export default Profile;
