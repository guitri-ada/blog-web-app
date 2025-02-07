import { Box, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import PropTypes from 'prop-types';

const ProfileActions = ({ handleClick, setOpenDialog, handleImageUpload }) => (
  <Box
    sx={{
      width: "100%",
      maxWidth: "600px",
      display: "flex",
      justifyContent: "space-between",
      mb: 4,
      gap: 2,
      p: 2,
    }}
  >
    <Button
      variant="contained"
      color="primary"
      onClick={handleClick}
      startIcon={<EditIcon />}
      fullWidth
    >
      Update Profile
    </Button>
    <Button
      variant="contained"
      color="secondary"
      component="label"
      startIcon={<CameraAltIcon />}
      fullWidth
    >
      Upload Profile Picture
      <input type="file" hidden onChange={handleImageUpload} />
    </Button>
    <Button
      variant="contained"
      sx={{ backgroundColor: "#8B0000" }}
      onClick={() => setOpenDialog(true)}
      startIcon={<DeleteIcon />}
      fullWidth
    >
      Delete Profile
    </Button>
  </Box>
);
ProfileActions.propTypes = {
  handleClick: PropTypes.func.isRequired,
  setOpenDialog: PropTypes.func.isRequired,
  handleImageUpload: PropTypes.func.isRequired,
};

export default ProfileActions;
