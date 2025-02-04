import { useState, useEffect } from 'react';
import axios from 'axios';

const useUserProfile = (username) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    bio: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`/api/userProfiles/${username}`);
        setProfile(response.data);
        setFormData({
          firstname: response.data.firstname,
          lastname: response.data.lastname,
          bio: response.data.bio
        });
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch user profile');
        setLoading(false);
      }
    };

    fetchProfile();
  }, [username]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return { profile, loading, error, formData, handleChange, setProfile, setFormData, setLoading, setError };
};

export default useUserProfile;