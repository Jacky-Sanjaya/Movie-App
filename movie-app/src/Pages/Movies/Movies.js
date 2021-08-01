import React, { useEffect, useState } from "react";
import "./Movie.css";
import axios from "axios";
import Card from "../../components/Card/Card";
import CustomPagination from "../../components/pagination/CustomPagination";
import Genres from "../../components/Card/Genres";
import useGenre from "../../hooks/useGenre";

export default function Movies() {
  const [page, setPage] = useState(1);
  const [movie, setMovie] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);
  const [numberOfPages, setNumberOfPages] = useState();
  const genreURL = useGenre(selectedGenres);

  const fetchMovie = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate&with_genres=${genreURL}`
    );
    console.log(data.results);
    setMovie(data.results);
    setNumberOfPages(data.total_pages);
  };

  const cardMapping = () => {
    return movie.map((item) => (
      <Card
        key={item.id}
        id={item.id}
        title={item.title}
        poster={item.poster_path}
        date={item.release_date}
        media_type="movie"
        vote_average={item.vote_average}
      />
    ));
  };

  useEffect(() => {
    fetchMovie();
    //  eslint-disable-next-line
  }, [page, genreURL]);

  return (
    <>
      <span className="pageTitle">Movies</span>
      <Genres
        type="movie"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
      />
      <div className="movie-container">{cardMapping()}</div>
      <CustomPagination setPage={setPage} numOfPages={numberOfPages} />
    </>
  );
}
