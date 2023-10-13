const auth = "" // Your PEXELS AUTH HERE
const gallery = document.querySelector(".gallery")
const searchInput = document.querySelector(".search-input")
const form = document.querySelector(".search-form")
const more = document.querySelector(".more")


let searchValue
let page = 1
let fetchLink
let currentSearch

// EVENT LISTENER
searchInput.addEventListener("input", updateInput)
form.addEventListener("submit", (event) => {
    event.preventDefault()
    currentSearch = searchValue
    searchPhotos(searchValue)
})

more.addEventListener("click", loadMore)

// FUNCTIONS
function updateInput(event) {
    searchValue = event.target.value
}

async function fetchAPI(url) {
    const dataFetch = await fetch(url, {
        method: "GET",
        header: {
            Accept: "application/json",
            Authorization: auth
        }
    })
    const data = await dataFetch.json()
    return data
}

function generatePictures(data) {
    data.photos.forEach(photo => { 
        const galleryImg = document.createElement("div")
        galleryImg.classList.add("gallery-image")

        galleryImg.innerHTML = `
        <div class="gallery-info>
        <p>${photo.photographer}</p>
        <a href=${photo.src.original}>Download</a>
        </div>
        <img src="${photo.src.large}"></img>`
        gallery.appendChild(galleryImg)
    })
}

async function curatedPhotos() {
    fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=1`
    const data = await fetchAPI(fetchLink)
    generatePictures(data)
}


// Syntax of searchPhotos() is exact copy of curatedPhotos() except the fetch URL
async function searchPhotos(query) {
    clear()
    fetchLink = `https://api.pexels.com/v1/search?query=${query}+query&per_page=15&page=1`
    const data = fetchAPI(fetchLink)
    generatePictures(data)
}

function clear() {
    gallery.innerHTML = ""
    searchInput.value = ""
}

async function loadMore() {
    page++

    // Checks if page displayed is curated or not
    if (currentSearch) {
        fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}+query&per_page=15&page=${page}`
    } else {
        fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`
    }
    const data = await fetchAPI(fetchLink)
    generatePictures(data)
}

curatedPhotos()

