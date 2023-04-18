const movieElement = document.querySelector('.movie')
const listMovieElement = document.querySelector('.listMovies')
const button = document.querySelector('#button')
const title = document.querySelector('#title')
const img = document.querySelector("#img")
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
    const movies = movie.results
    let contagem = 0
    console.log(movie)
    const listMovies = movies.map(function (movie) {
        const titleMovie = movie.title
        const poster = movie.poster_path
        return [
            { title: titleMovie },
            { poster: poster }
        ]
    })

    for (contagem < listMovies.length) {
        let cloneMovie = movieElement.cloneNode(true)
        listMovieElement.appendChild(clone)

    }

    console.log(listMovies)
}

const clone = () => {
    let seuNode = document.getElementById('movie')
    let clone = seuNode.cloneNode(true)
    lisMovie.appendChild(clone)
}

button.addEventListener('click', searchMovie)