import React, { useEffect, useState } from "react";
import "./CardModal.css";
import { makeStyles } from "@material-ui/core/styles";
import YoutubeModal from "./YoutubeModal";
import Modal from "@material-ui/core/Modal";
import Carousel from "../carousel/Carousel";
import CancelIcon from "@material-ui/icons/Cancel";
import Play from "../../assets/play.png";
import Fade from "@material-ui/core/Fade";
import axios from "axios";
import {
  img_500,
  unavailable,
  unavailableLandscape,
} from "../../config/Config";

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
    position: "relative",
    margin: 0,
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    color: "white",
    borderColor: "#000",
  },
}));

export default function CardModal({ children, media_type, id }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState();
  const [video, setVideo] = useState();

  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    setContent(data);
  };

  const fetchVideo = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    setVideo(data.results[0]?.key);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    console.log(open);
  };

  useEffect(() => {
    fetchVideo();
    fetchData();
    //  eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="card-container" type="button" onClick={handleOpen}>
        {children}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
      >
        <Fade in={open}>
          {content && (
            <div className={`${classes.paper} modal-container `}>
              <button onClick={handleClose} className="close-icon">
                <CancelIcon fontSize="large" style={{ color: "#f8485e" }} />
              </button>
              <YoutubeModal path_id={video}>
                <div className="portrait-wrap">
                  <div className="black-screen"></div>
                  <img src={Play} alt="play" className="play" />
                  <img
                    alt={content.name || content.title}
                    className="image-portrait"
                    src={
                      content.poster_path
                        ? `${img_500}/${content.poster_path}`
                        : unavailable
                    }
                  />
                </div>
                <div className="landscape-wrap">
                  <div className="black-screen2"></div>
                  <img
                    alt={content.name || content.title}
                    className="image-landscape"
                    src={
                      content.backdrop_path
                        ? `${img_500}/${content.backdrop_path}`
                        : unavailableLandscape
                    }
                  />
                  <img src={Play} alt="play" className="play2" />
                </div>
              </YoutubeModal>
              <div className="content-about">
                <span className="content-title">
                  {content.name || content.title}(
                  {(
                    content.first_air_date ||
                    content.release_date ||
                    "______"
                  ).substring(0, 4)}
                  )
                </span>
                {content.tagline && (
                  <i className="tagline">{content.tagline}</i>
                )}
                <span className="content-description">{content.overview}</span>
                <Carousel media_type={media_type} id={id} />
              </div>
            </div>
          )}
        </Fade>
      </Modal>
    </>
  );
}
