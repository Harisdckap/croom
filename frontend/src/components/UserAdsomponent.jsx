import React, { useEffect, useState } from "react";
import axios from "axios";

const UserAdsComponent = () => {

    const [ads, setAAds] = useState(null);
    const userId = localStorage.getItem("auth_token");

    useEffect(()=> {
        fetchUserAds()
    },[]);
    const fetchUserAds = async () => {
        try {
            const response = await axios.get(
                `http://127.0.0.1:8000/api/user-ads/${userId}`
              );
            
            setUser(response.data.user); 
            console.log("==========user detail===========");
            console.log(response.data.user); 
        } catch (error) {
            console.error("Error fetching user detail:", error);
        }
    };
  return (
    console.log(result)
  );
};

export default UserAdsComponent;