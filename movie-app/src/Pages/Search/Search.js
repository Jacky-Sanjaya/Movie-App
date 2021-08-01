import React, { useEffect, useState } from "react";
import "./Search.css";
import {
  Button,
  createMuiTheme,
  Tab,
  Tabs,
  TextField,
  ThemeProvider,
} from "@material-ui/core";
import axios from "axios";
import Card from "../../components/Card/Card";
import CustomPagination from "../../components/pagination/CustomPagination";
import SearchIcon from "@material-ui/icons/Search";

export default function Search() {
  var movieList = ["marvel", "disney", "war", "romance", "comedy"];
  var randomMovie = Math.floor(Math.random() * movieList.length);
  var random = movieList[randomMovie];
  const [type, setType] = useState(0);
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numberOfPages, setNumberOfPages] = useState();
  const [searchText, setSearchText] = useState(random);
  const [loading, setLoading] = useState(true);

  const darkTheme = createMuiTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#fff",
      },
    },
  });

  const fetchSearch = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${
          process.env.REACT_APP_API_KEY
        }&language=en-US&query=${searchText}&page=${page}&include_adult=false`
      );
      setLoading(false);
      setContent(data.results);
      setNumberOfPages(data.total_pages);
    } catch (error) {
      console.log(error);
    }
  };

  const searchLogic = () => {
    if (
      searchText !== "" &&
      content.length === 0 &&
      type &&
      loading === false
    ) {
      return <h2>No Series Found</h2>;
    } else if (
      searchText !== "" &&
      content.length === 0 &&
      !type &&
      loading === false
    ) {
      return <h2>No Movie Found</h2>;
    } else if (searchText === "" && !type) {
      return <h2>Search Your Movie</h2>;
    } else if (searchText === "" && type) {
      return <h2>Search Your TV Series</h2>;
    }
  };

  let isLoading;
  if (loading) {
    isLoading = "";
  } else {
    isLoading = <searchLogic />;
  }

  const cardMapping = () => {
    return (
      content &&
      content.map((item) => (
        <Card
          key={item.id}
          id={item.id}
          title={item.name || item.title}
          poster={item.poster_path}
          date={item.first_air_date || item.release_date}
          media_type={`${type ? "tv" : "movie"}`}
          vote_average={item.vote_average}
        />
      ))
    );
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchSearch();
    //  eslint-disable-next-line
  }, [type, page]);

  return (
    <div className="search-container">
      <ThemeProvider theme={darkTheme}>
        <div className="searchField">
          <TextField
            label="Search"
            onenter
            variant="filled"
            onBlur={(item) => {
              setSearchText(item.target.value);
            }}
          />
          <Button
            onClick={() => {
              fetchSearch();
            }}
            variant="contained"
            style={{
              marginLeft: 10,

              borderRadius: 10,
            }}
          >
            <SearchIcon />
          </Button>
        </div>

        <Tabs
          value={type}
          indicatorColor="primary"
          textColor="primary"
          style={{ alignSelf: "center", margin: 15 }}
          onChange={(event, newValue) => {
            setType(newValue);
            setPage(1);
          }}
        >
          <Tab style={{ width: "50%" }} label="Search Movie" />
          <Tab style={{ width: "50%" }} label="Search Series" />
        </Tabs>
      </ThemeProvider>
      <div className="series-container">{cardMapping()}</div>
      {isLoading}
      {content.length === 0 ? (
        ""
      ) : (
        <CustomPagination setPage={setPage} numOfPages={numberOfPages} />
      )}
    </div>
  );
}
