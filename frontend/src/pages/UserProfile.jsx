import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../styles/UserProfile.css';

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
        <div className="container">
            <div className="card">
                <h2 className="heading">{profile.name}</h2>
                <p className="paragraph"><strong>Username:</strong> {profile.username}</p>
                <p className="paragraph"><strong>First Name:</strong> {profile.firstname}</p>
                <p className="paragraph"><strong>Last Name:</strong> {profile.lastname}</p>
                <p className="paragraph"><strong>Email:</strong> {profile.email}</p>
                <p className="paragraph"><strong>Bio:</strong> {profile.bio}</p>
            </div>
        </div>
    );
};

export default UserProfile;