const button = document.querySelector('#button')
const title = document.querySelector('#title')
const img = document.querySelector("#img")
const baseURL = "https://image.tmdb.org/t/p/w500/"

const test = async () => {
    const movie = await fetch('https://api.themoviedb.org/3/movie/502356?api_key=b7c257791c7c9a9552fbce87526bb019&language=pt-BR').then(response => response.json())
    console.log(movie)
    const newImg = baseURL + movie.poster_path
    img.setAttribute('src', newImg)
    title.innerHTML = movie.title
}

button.addEventListener('click', test)