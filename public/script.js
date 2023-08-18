const fs = require("fs");

const updateGenres = () => {
  try {
    fs.readFile("./public/movies.json", (err, data) => {
      if (err) {
        throw err;
      }
      const movies = JSON.parse(data);
      const genres = new Set();
      movies.forEach((movie) => {
        genres.add(...movie.genres);
      });

    });
  } catch (error) {
    // console.log(error.message);
  }
};

updateGenres();
