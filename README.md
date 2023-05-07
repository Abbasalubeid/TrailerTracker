<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
<h1>Trailer Tracker</h1>
<p>A simple React-based web application for users who want to discover popular movies, filter them by IMDb ratings, and learn more about individual films. The website uses the Model-View-Presenter (MVP) design pattern, which separates the application's code into three distinct layers, making it more modular and easier to maintain. The data for the movies is fetched from <a href="https://www.themoviedb.org/documentation/api" target="_blank">The Movie Database API</a>, a powerful and widely-used source for movie details. Visit the live website to explore movies at <a href="https://abbasalubeidtrailertracker.netlify.app/" target="_blank">https://abbasalubeidtrailertracker.netlify.app/</a>.</p>


<h2>Table of Contents</h2>
<ul>
  <li><a href="#features">Features</a></li>
  <li><a href="#installation">Installation</a></li>
  <li><a href="#usage">Usage</a></li>
  <li><a href="#contributing">Contributing</a></li>
</ul>

<h2 id="features">Features</h2>
<ul>
  <li>Discover the most popular movies available through The Movie Database API</li>
  <li>Search for specific movies</li>
  <li>Filter movies by IMDb ratings and more</li>
  <li>View detailed information about individual movies, such as cast and genre</li>
  <li>Watch movie trailers</li>
</ul>

<h2 id="installation">Installation</h2>
<p>To set up the project locally, follow these steps:</p>
<ol>
  <li>Sign up for an API key from The Movie Database: <a href="https://www.themoviedb.org/signup" target="_blank">https://www.themoviedb.org/signup</a></li>
  <li>Clone the repository:</li>
</ol>

<pre><code>git clone https://github.com/yourusername/TrailerTracker.git
cd TrailerTracker
</code></pre>

<ol start="3">
  <li>Install the necessary dependencies:</li>
</ol>

<pre><code>npm install
</code></pre>

<ol start="4">
  <li>Inside TrailerTracker/src/model, create a file called apiConfig.js the with the following information:</li>
</ol>

<pre><code>const BASE_URL = "https://api.themoviedb.org/3/";
const IMAGE_URL = "https://image.tmdb.org/t/p/w500/";
const API_KEY = "your_api_key_here";

export {BASE_URL, API_KEY, IMAGE_URL};
</code></pre>

<ol start="5">
  <li>Start the development server:</li>
</ol>

<pre><code>npm start
</code></pre>

<h2 id="usage">Usage</h2>
<p>After completing the installation steps, the development server will open the Trailer Tracker website in your default web browser. You can use the search bar to find specific movies, filter by IMDb ratings, and click on individual movie cards to view more details.</p>

<h2 id="contributing">Contributing</h2>
<p>Contributions are welcome! To get started:</p>
<ol>
  <li>Fork the repository</li>
  <li>Create a new branch for your changes: <code>git checkout -b your-branch-name</code></li>
  <li>Make your changes and commit them: <code>git commit -m "your commit message"</code></li>
  <li>Push your changes to your fork: <code>git push origin your-branch-name</code></li>
  <li>Create a pull request from your fork's branch to the original repository</li>
</ol>
<p>Please follow the project's coding standards and ensure your changes do not introduce new errors or warnings.</p>

</body>
</html>
