let movieNameRef = document.getElementById("movie-name");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");

// Function to fetch data from the API
let getMovie = () => {
  let movieName = movieNameRef.value;
  let url = `http://www.omdbapi.com/?t=${movieName}&apikey=${key}`;

  // If input field is empty
  if (movieName.length <= 0) {
    result.innerHTML = `<h3 class="msg">Please enter a movie name </h3>`;
  } else {
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        // If movie exists in the database
        if (data.Response === "True") {
          result.innerHTML = `
            <div class="info">
                <img src=${data.Poster} class="poster">
                <div>
                    <h2>${data.Title}</h2>
                    <div class="rating">
                        <img src="star-icon.svg">
                        <h4>${data.imdbRating}</h4>
                    </div>
                    <div class="details">
                        <span>${data.Rated}</span>
                        <span>${data.Year}</span>
                        <span>${data.Runtime}</span>
                    </div>
                    <div class="genre">
                        <div>${data.Genre.split(",").join("</div><div>")}</div>
                    </div>
                </div>
            </div>
            <h3>Plot:</h3>
            <p>${data.Plot}</p>
            <h3>Cast:</h3>
            <p>${data.Actors}</p>
          `;
        } else {
          // If movie doesn't exist in the database
          result.innerHTML = `<h3 class="msg">${data.Error}</h3>`;
        }
      })
      .catch(() => {
        // If an error occurs during the fetch
        result.innerHTML = `<h3 class="msg">Error Occurred</h3>`;
      });
  }
};

// Add an event listener to the search button for click event
searchBtn.addEventListener("click", getMovie);

// Add an event listener to the input field for "keydown" event
movieNameRef.addEventListener("keydown", (event) => {
  if (event.keyCode === 13) {
    // If Enter key is pressed, trigger the movie search
    getMovie();
  }
});

// Trigger the initial search on page load (for the default value in the input field)
window.addEventListener("load", getMovie);
