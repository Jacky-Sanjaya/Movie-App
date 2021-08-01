import React, { useState } from "react";
import "./YoutubeModal.css";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import YouTube from "react-youtube";
import CancelIcon from "@material-ui/icons/Cancel";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  paper: {
    width: "90%",
    height: "80%",
    display: "flex",
    margin: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    color: "white",
    position: "relative",
    borderColor: "#000",
  },
}));

export default function YotubeModal({ children, path_id }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(!open);
    console.log(open);
  };

  return (
    <>
      <div className="youtube-container" onClick={handleOpen}>
        {children}
      </div>
      <Modal
        disableEnforceFocus
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        BackdropComponent={Backdrop}
        onClick={handleClose}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <button onClick={handleClose} className="close-icon">
              <CancelIcon fontSize="large" style={{ color: "#f8485e" }} />
            </button>
            <YouTube className="youtube" videoId={path_id} />
          </div>
        </Fade>
      </Modal>
    </>
  );
}
