import { Box, TextField, Button } from "@mui/material";
import PropTypes from 'prop-types';

const ProfileForm = ({ formData, handleChange, handleSubmit }) => (
  <Box sx={{ p: 2 }}>
    <form onSubmit={handleSubmit}>
      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          label="First Name"
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
          variant="outlined"
        />
      </Box>
      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          label="Last Name"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
          variant="outlined"
        />
      </Box>
      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          label="Bio"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          variant="outlined"
          multiline
          rows={4}
        />
      </Box>
      <Button type="submit" variant="contained" color="primary">
        Save Changes
      </Button>
    </form>
  </Box>
);
ProfileForm.propTypes = {
  formData: PropTypes.shape({
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    bio: PropTypes.string,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default ProfileForm;
