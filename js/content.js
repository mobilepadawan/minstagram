const capturar = document.querySelector("div.capturar img")

capturar.addEventListener("click", ()=> location.href = "camara.html")

const crearDivPost = (imagen)=> {
    return `<div class="card-image">
                <h2>${imagen.titulo}</h2>
                <img src="${imagen.imagen}" alt="${imagen.titulo}" title="${imagen.titulo}" id="img${imagen.id}">
                <p>${imagen.fecha}</p>
                <p></p>
            </div>`
}

const mockapiURL = 'https://64de8e2d825d19d9bfb2b6ba.mockapi.io/api/v1/imagenes?sortBy=fecha&order=desc'
const imagesContent = []
fetch(mockapiURL)
.then(response => response.json())
.then(data => imagesContent.push(...data))
.then(()=> {
    if (imagesContent.length > 0) {
        document.querySelector("div.contenedor").innerHTML = ""
        imagesContent.forEach(imagen => {
            document.querySelector("div.contenedor").innerHTML += crearDivPost(imagen)
        })
    }
})