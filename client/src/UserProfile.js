import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const UserProfile = () => {
    const [profile, setProfile] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/users/profile`, {
                    headers: { 'x-auth-token': user.token }
                });
                setProfile(response.data);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };
        if (user) fetchProfile();
    }, [user]);

    if (!profile) return <div>Loading...</div>;

    return (
        <div>
            <h2>User Profile</h2>
            <p>Username: {profile.username}</p>
            <p>Email: {profile.email}</p>
        </div>
    );
};

export default UserProfile;