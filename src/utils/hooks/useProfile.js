import { useEffect, useState } from "react";
import axios from "../../axiosInstance.js";

const initialState = {
  picture: "",
  pangalan: "",
  program: "",
  palayaw: "",
  edad: "",
  kasarian: "",
  birthday: "",
  relihiyon: "",
  goalsAchieved: [],
  attachedFiles: [],
};

const useProfile = (username) => {
  const [error, setError] = useState({ error: false, errorMessage: "" });
  const [profileData, setProfileData] = useState(initialState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // pseudo get user information (while no server yet)
    //const user = Users.find((user) => user.pangalan == username);
    setLoading(true);
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/api/profile/${username}`);
        const user = res.data;

        if (!user) {
          setError({ error: true, errorMessage: "User not found!" });
        } else {
          setProfileData({
            picture: res.data.picture,
            pangalan: res.data.pangalan,
            program: res.data.program,
            palayaw: res.data.palayaw,
            edad: res.data.edad,
            kasarian: res.data.kasarian,
            birthday: res.data.birthday,
            relihiyon: res.data.relihiyon,
            goalsAchieved: res.data.goalsAchieved,
            attachedFiles: res.data.attachedFiles,
          });
        }
      } catch (err) {
        setError({
          error: true,
          errorMessage: "An error occured in fetching user data.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUser();

    // API call over here (when the server is getting developed na)
    // This would include loading state since it's asynchronous

    return () => {
      setError({ error: false, errorMessage: "" });
      setProfileData(initialState);
    };
  }, [username]);

  return {
    profileData,
    setProfileData,
    loading,
    error,
  };
};

export default useProfile;
