import { Chip } from "@material-ui/core";
import "./Genre.css";
import axios from "axios";
import React, { useEffect } from "react";

export default function Genres({
  selectedGenres,
  setSelectedGenres,
  genres,
  setGenres,
  type,
  setPage,
}) {
  const fetchGenres = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    setGenres(data.genres);
    console.log(genres);
  };

  const handleGenre = (genre) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((item) => item.id !== genre.id));
    setPage(1);
  };

  const removeGenre = (genre) => {
    setSelectedGenres(selectedGenres.filter((item) => item.id !== genre.id));
    setGenres([...genres, genre]);
    setPage(1);
  };

  const renderGenre = () => {
    return (
      <div className="genre-container">
        {selectedGenres &&
          selectedGenres.map((item) => (
            <Chip
              label={item.name}
              style={{ margin: 3 }}
              size="small"
              clickable
              color="primary"
              onDelete={() => removeGenre(item)}
              key={item.id}
            />
          ))}
        {genres &&
          genres.map((item) => (
            <Chip
              label={item.name}
              style={{ margin: 3 }}
              size="small"
              clickable
              key={item.id}
              onClick={() => handleGenre(item)}
            />
          ))}
      </div>
    );
  };

  useEffect(() => {
    fetchGenres();
    //  eslint-disable-next-line
  }, []);

  return <div>{renderGenre()}</div>;
}
