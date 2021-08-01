import React from "react";
import "./CustomPagination.css";
import Pagination from "@material-ui/lab/Pagination";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

export default function CustomPagination({ setPage, numOfPages = 10 }) {
  const handlePage = (page) => {
    setPage(page);
    window.scroll(0, 0);
  };

  const darkTheme = createMuiTheme({
    palette: {
      type: "dark",
    },
  });

  return (
    <div className="pagination-container">
      <ThemeProvider theme={darkTheme}>
        <Pagination
          onChange={(e) => handlePage(e.target.textContent)}
          count={numOfPages}
        />
      </ThemeProvider>
    </div>
  );
}
