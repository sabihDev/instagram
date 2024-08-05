// src/components/ProfilePage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const ProfilePage = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem('token');

    const decodedToken = jwtDecode(token);
    setProfile(decodedToken);
    
  }, [id]);


  return (
    <>
      {profile && (
        <div>
          <h1>hello, to your profile: {profile.username}</h1>
          <p>{profile.email}</p>
        </div>
      )}
    </>
  );
};

export default ProfilePage;
