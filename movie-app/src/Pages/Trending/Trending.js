import React, { useEffect, useState } from "react";
import "./Trending.css";
import axios from "axios";
import Card from "../../components/Card/Card";
import CustomPagination from "../../components/pagination/CustomPagination";

export default function Trending() {
  const [movie, setMovie] = useState([]);
  const [page, setPage] = useState(1);

  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
    );

    setMovie(data.results);
    console.log("inidata", data);
  };

  const cardMapping = () => {
    return movie.map((item) => (
      <Card
        key={item.id}
        id={item.id}
        title={item.title}
        poster={item.poster_path}
        date={item.release_date}
        media_type={item.media_type}
        vote_average={item.vote_average}
      />
    ));
  };

  useEffect(() => {
    fetchData();
    //  eslint-disable-next-line
  }, [page]);

  return (
    <>
      <span className="pageTitle">Trending</span>
      <div className="trending-container">{cardMapping()}</div>
      <CustomPagination setPage={setPage} />
    </>
  );
}
