const useGenre = (selectedGenres) => {
  if (selectedGenres < 1) {
    return "";
  } else {
    const GenreIds = selectedGenres.map((item) => item.id);
    return GenreIds.reduce((acc, curr) => acc + "," + curr);
  }
};

export default useGenre;
