const listMovieElement = document.querySelector('.listMovies')
const input = document.querySelector("#input")
const button = document.querySelector('#button')
const baseURL = "https://image.tmdb.org/t/p/w200/"

const key = "b7c257791c7c9a9552fbce87526bb019"

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

    const oldElement = document.querySelectorAll(".movie")

    for (let i = oldElement.length - 1; i >= 0; i--) {
        oldElement[i].remove()
    }

    const search = input.value;
    const movie = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${key}&page=1&language=pt-BR&query=${search}`).then(response => response.json())

    const amountPagesSearch = movie.total_pages

    for (let page = 1; page < amountPagesSearch; page++) {
        const allMoviesInPages = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${key}&page=${page}&language=pt-BR&query=${search}`).then(response => response.json())

        const moviesAllPages = allMoviesInPages.results
        const amountMoviesInPage = moviesAllPages.length

        for (let i = 0; i < amountMoviesInPage; i++) {

            const titleMovie = moviesAllPages[i].title
            const backgroundMovie = moviesAllPages[i].poster_path

            const newMovie = document.createElement('div')
            newMovie.classList.add(`movie`)
            newMovie.classList.add(`movie${i}_page${page}`)
            listMovieElement.appendChild(newMovie)

            const movieElement = document.querySelector(`.movie${i}_page${page}`)

            const newBackGroundMovie = document.createElement('img')
            newBackGroundMovie.classList.add(`poster${i}_page${page}`)
            newBackGroundMovie.setAttribute("src", `https://image.tmdb.org/t/p/w500${backgroundMovie}`);
            newBackGroundMovie.setAttribute("alt", `poster do filme ${titleMovie}`);
            movieElement.appendChild(newBackGroundMovie)

            const titleNewMovie = document.createElement('h1')
            titleNewMovie.innerHTML = titleMovie
            titleNewMovie.classList.add(`title${i}`)
            movieElement.appendChild(titleNewMovie)
        }
    }
}

button.addEventListener('click', searchMovie)
document.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        searchMovie()
    }
})