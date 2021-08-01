import React from "react";
import "./Card.css";
import { img_300, unavailable } from "../../config/Config";
import CardModal from "../modal/CardModal";

export default function Card(props) {
  return (
    <CardModal media_type={props.media_type} id={props.id}>
      <div className={props.vote_average > 6 ? "vote" : "vote vote-secondary"}>
        {props.vote_average}
      </div>
      <img
        className="poster"
        src={props.poster ? `${img_300}/${props.poster}` : unavailable}
        alt={props.title}
      />
      <b className="title">
        {props.title.length >= 30
          ? `${props.title.substring(0, 30) + "..."}`
          : `${props.title}`}
      </b>
      <span className="subTitle">
        {props.media_type === "movie" ? "Movie" : "TV Series"}
        <span className="subTitle">{props.date}</span>
      </span>
    </CardModal>
  );
}
