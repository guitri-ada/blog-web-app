import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UserProfile = () => {
    const { username } = useParams();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`/api/userProfiles/${username}`);
                setProfile(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch user profile');
                setLoading(false);
            }
        };

        fetchProfile();
    }, [username]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>User Profile</h1>
            <pre>{JSON.stringify(profile, null, 2)}</pre>
        </div>
    );
};

export default UserProfile;