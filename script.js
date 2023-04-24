const listMovieElement = document.querySelector('.listMovies')
const button = document.querySelector('#button')
const baseURL = "https://image.tmdb.org/t/p/w200/"
let number = "0"

const key = "b7c257791c7c9a9552fbce87526bb019"
const search = "batman"

const test = async () => {
    const movie = await fetch('https://api.themoviedb.org/3/movie/502356?api_key=b7c257791c7c9a9552fbce87526bb019&language=pt-BR').then(response => response.json())
    const test = await fetch("https://api.themoviedb.org/3/search/movie?api_key=b7c257791c7c9a9552fbce87526bb019&language=pt-BR&query=batman&page=1&include_adult=false").then(response => response.json())
    console.log(test.results)
    let values = test.results.map(function (element) {
        return element.title
    })
    console.log(values)
    const newImg = baseURL + movie.poster_path
    img.setAttribute('src', newImg)
    title.innerHTML = movie.title
}

const searchMovie = async () => {
    const movie = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${key}&language=pt-BR&query=${search}`).then(response => response.json())
    const amountPagesSearch = movie.total_pages
    const movies = movie.results
    const amountMoviesInPage = movies.length

    for (let i = 0; i < amountMoviesInPage; i++) {
        console.log(movies[i].backdrop_path)
        console.log(movies[i].title)

        const titleMovie = movies[i].title
        const backgroundMovie = movies[i].id

        const newMovie = document.createElement('div')
        newMovie.classList.add(`movie`)
        newMovie.classList.add(`movie${i}`)
        listMovieElement.appendChild(newMovie)

        const movieElement = document.querySelector(`.movie${i}`)

        const newBackGroundMovie = document.createElement('img')
        newBackGroundMovie.classList.add(`poster${i}`)
        newBackGroundMovie.setAttribute("src", `https://api.themoviedb.org/3/movie/${backgroundMovie}/images?api_key=${key}&language=pt-BR`);
        newBackGroundMovie.setAttribute("alt", "poster");
        movieElement.appendChild(newBackGroundMovie)

        const titleNewMovie = document.createElement('h1')
        titleNewMovie.innerHTML = titleMovie
        titleNewMovie.classList.add(`title${i}`)
        movieElement.appendChild(titleNewMovie)
    }
}

button.addEventListener('click', searchMovie)