import axios from "axios";
import { useNavigate } from "react-router-dom";

const LogoutAuth = () => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:5001/logout",
        {},
        { withCredentials: true }
      );
      
      navigate("/");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return { logout };
};

export default LogoutAuth;
