import React, { useEffect, useState } from "react";
import "./Carousel.css";
import axios from "axios";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { img_300, noPicture } from "../../config/Config";

const handleDragStart = (e) => e.preventDefault();

const Gallery = ({ media_type, id }) => {
  const [credit, setCredit] = useState();

  const items = credit?.map((item) => (
    <div className="carousel-container">
      <img
        src={item.profile_path ? `${img_300}/${item.profile_path}` : noPicture}
        alt={item?.name}
        onDragStart={handleDragStart}
        className="carousel-img"
      />
      <b className="carousel-text">{item.name}</b>
    </div>
  ));

  const responsive = {
    0: {
      items: 5,
    },
    512: {
      items: 7,
    },
    1024: {
      items: 7,
    },
  };

  const fetchCredit = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    setCredit(data.cast);
  };

  useEffect(() => {
    fetchCredit();
    //  eslint-disable-next-line
  }, []);

  return (
    <AliceCarousel
      autoPlay
      responsive={responsive}
      infinite
      disableDotsControls
      disableButtonsControls
      mouseTracking
      items={items}
    />
  );
};

export default Gallery;
