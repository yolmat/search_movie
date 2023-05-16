// Get elements in dom
const listMovieElement = document.querySelector('.listMovies')
const input = document.querySelector('#input')
const button = document.querySelector('#button')
const languege = document.querySelector('.selectLanguage')

// Key API the movie edb
const key = 'b7c257791c7c9a9552fbce87526bb019'

// Get language select in dom
function getLanguege() {
    let pageLanguege = languege.value

    if (pageLanguege == 'Portugues-BR') {
        pageLanguege = 'pt-BR'
    } else {
        pageLanguege = 'En'
    }
    return pageLanguege
}

// Change language in js
function changeLanguegePage() {
    const principalLanguage = getLanguege()
    const textLabel = document.querySelector('.labelText')

    if (principalLanguage === 'pt-BR') {
        textLabel.innerHTML = 'Procure seu filme:'
        button.innerHTML = 'Procurar'
    } else {
        textLabel.innerHTML = 'Search for your movie:'
        button.innerHTML = 'Search'
    }
}

// Main function 
const searchMovie = async () => {

    // Clear list movie in dom
    const oldElement = document.querySelectorAll('.movie')

    for (let i = oldElement.length - 1; i >= 0; i--) {
        oldElement[i].remove()
    }

    // Language page
    const languageMovies = getLanguege()

    // User search movie
    const search = input.value;

    // Swap spaces for %20
    const realSearch = search.replace(' ', '%20')

    // First requisition for API | get total pages the search has
    const movie = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${key}&page=1&language=${languageMovies}&query=${realSearch}`).then(response => response.json())

    // Total pages API
    const amountPagesSearch = movie.total_pages

    // Main search api | Put movies inside the dom
    for (let page = 1; page < amountPagesSearch; page++) {
        const allMoviesInPages = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${key}&page=${page}&language=${languageMovies}&query=${search}`).then(response => response.json())

        // Get all results
        const moviesAllPages = allMoviesInPages.results

        // Get amount movies
        const amountMoviesInPage = moviesAllPages.length

        // Put movies inside the dom
        for (let i = 0; i < amountMoviesInPage; i++) {

            // Get all the title that the API sent
            const titleMovie = moviesAllPages[i].title

            // Get all the posters that the API sent
            const backgroundMovie = moviesAllPages[i].poster_path

            // If the movie does not have a post, it will not be visible
            if (backgroundMovie === null) {
                break
            }

            // Create element movie
            const newMovie = document.createElement('div')
            // Put class generic  to style
            newMovie.classList.add(`movie`)
            // Put individual class
            newMovie.classList.add(`movie${i}_page${page}`)

            // Put the element inside the dom
            listMovieElement.appendChild(newMovie)

            // Select element movie create
            const movieElement = document.querySelector(`.movie${i}_page${page}`)

            // Create element img in movie
            const newBackGroundMovie = document.createElement('img')
            // Put individual class
            newBackGroundMovie.classList.add(`poster${i}_page${page}`)
            // Put poster movie in element img
            newBackGroundMovie.setAttribute('src', `https://image.tmdb.org/t/p/w500${backgroundMovie}`);
            // Put alt element movie
            newBackGroundMovie.setAttribute('alt', `poster do filme ${titleMovie}`);

            // Put the element inside the dom
            movieElement.appendChild(newBackGroundMovie)

            // Create element title in movie
            const titleNewMovie = document.createElement('h1')

            // Put title movie
            titleNewMovie.innerHTML = titleMovie
            // Put individual class
            titleNewMovie.classList.add(`title${i}`)

            // Create element title in movie
            movieElement.appendChild(titleNewMovie)
        }
    }
}

// Change languague page
languege.addEventListener('change', changeLanguegePage)

// Button active search
button.addEventListener('click', searchMovie)

// Key ENTER active search
document.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        searchMovie()
    }
})