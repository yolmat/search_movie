const listMovieElement = document.querySelector('.listMovies')
const input = document.querySelector("#input")
const button = document.querySelector('#button')
const languege = document.querySelector(".selectLanguage")

const key = "b7c257791c7c9a9552fbce87526bb019"

function getLanguege() {
    let pageLanguege = languege.value

    if (pageLanguege == 'Portugues-BR') {
        pageLanguege = 'pt-BR'
    } else {
        pageLanguege = 'En'
    }
    return pageLanguege
}

function changeLanguegePage() {
    const principalLanguage = getLanguege()
    const textLabel = document.querySelector('.labelText')

    if (principalLanguage === 'pt-BR') {
        textLabel.innerHTML = 'Procure seu filme:'
        button.innerHTML = "Procurar"
    } else {
        textLabel.innerHTML = 'Search for your movie:'
        button.innerHTML = "Search"
    }
}

const searchMovie = async () => {

    const oldElement = document.querySelectorAll(".movie")

    for (let i = oldElement.length - 1; i >= 0; i--) {
        oldElement[i].remove()
    }

    const search = input.value;
    const realSearch = search.replace(" ", "%20")

    const movie = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${key}&page=1&language=pt-BR&query=${realSearch}`).then(response => response.json())

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

languege.addEventListener('change', changeLanguegePage)

button.addEventListener('click', searchMovie)
document.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        searchMovie()
    }
})