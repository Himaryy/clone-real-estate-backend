import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./profileUpdatePage.scss";
import apiRequest from "../../lib/apiRequest";
import { useNavigate } from "react-router-dom";
import UploadWidget from "../../components/UploadWidget/UploadWidget";

function ProfileUpdatePage() {
  const { currentUser, updateUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [avatar, setAvatar] = useState([]);
  const navigate = useNavigate();
  const [publicId, setPublicId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const { username, email, password } = Object.fromEntries(formData);
    try {
      const res = await apiRequest.put(`/users/${currentUser.id}`, {
        username,
        password,
        email,
        avatar: avatar[0],
      });
      updateUser(res.data);
      navigate("/profile");
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
    }
  };

  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Update Profile</h1>
          <div className="item">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={currentUser.username}
            />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={currentUser.email}
            />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" />
          </div>
          <button>Update</button>
          {error && <span>error</span>}
        </form>
      </div>
      <div className="sideContainer">
        <img
          src={avatar[0] || currentUser.avatar || "/noavatar.jpg"}
          alt=""
          className="avatar"
        />
        <UploadWidget
          uwConfig={{
            cloudName: "dqx4fw3j4", // Your Cloudinary cloud name
            uploadPreset: "estate", // Your Cloudinary upload preset
            multiple: false, // Only one file per upload
            maxImageFileSize: 2000000, // 2MB max file size
            folder: "avatars", // Uploads will go to the "avatars" folder
          }}
          // setPublicId={setPublicId}
          setState={setAvatar} // Function to set the avatar URL
        />
      </div>
    </div>
  );
}

export default ProfileUpdatePage;
