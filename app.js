const auth = "" // Your PEXELS AUTH HERE
const gallery = document.querySelector(".gallery")
const searchInput = document.querySelector(".search-input")
const submitButton = document.querySelector(".submit-button")

let searchValue

async function curatedPhotos() {
    const dataFetch = await fetch("https://api.pexels.com/v1/curated?per_page=15&page=1", {
        method: "GET",
        header: {
            Accept: "application/json",
            Authorization: auth
        }
    })
    const data = await dataFetch.json()
    data.photos.forEach(photo => {
        const galleryImg = document.createElement("div")
        galleryImg.classList.add("gallery-image")
        galleryImg.innerHTML = `<img src="${photo.src.large}"></img>
        <p>${photo.photographer}</p>`
        gallery.appendChild(galleryImg)
    })
}

curatedPhotos()
