import { Popover } from "@mui/material";
import PropTypes from 'prop-types';
import ProfileForm from "./ProfileForm";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";

const ProfileDialogs = ({
  id,
  open,
  anchorEl,
  handleClose,
  openDialog,
  setOpenDialog,
  handleDelete,
  formData,
  handleChange,
  handleSubmit,
}) => (
  <>
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <ProfileForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </Popover>
    <ConfirmDeleteDialog
      open={openDialog}
      handleClose={() => setOpenDialog(false)}
      handleDelete={handleDelete}
    />
  </>
);
ProfileDialogs.propTypes = {
  id: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  anchorEl: PropTypes.object,
  handleClose: PropTypes.func.isRequired,
  openDialog: PropTypes.bool.isRequired,
  setOpenDialog: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default ProfileDialogs;
