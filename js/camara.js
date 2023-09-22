const buttonCamera = document.querySelector("button#camera")
const buttonCancelar = document.querySelector("button#cancela")
const imagen = document.querySelector("img#imagen")
const inputTitulo = document.querySelector("input#inputTitulo")

const camara = document.createElement("input")
camara.type = "file"
camara.accept = "image/*"
camara.capture = "environment"

imagen.addEventListener("dblclick", ()=> camara.click())

buttonCamera.addEventListener("click", () => {
    if (imagen.src !== "" && !imagen.src.includes('images/photo.png')) { 
        const nuevaImagen = {
                imagen: crearCanvasDeImagen(),
                fecha: new Date().toLocaleString(),
                titulo: inputTitulo.value.trim() || 'Mi nueva publicación'
            }
            publicarImagen(nuevaImagen) 
    }
})

buttonCancelar.addEventListener("click", ()=> {
    imagen.src = "images/photo.png"
    inputTitulo.value = ""
    location.href = "index.html"
})

camara.addEventListener("change", () => {
    if (camara.files[0]) {
        imagen.src = URL.createObjectURL(camara.files[0])
    }
})

function crearCanvasDeImagen() {
            const canvas = document.createElement("canvas")
            const ctx = canvas.getContext("2d")
                canvas.width = imagen.width
                canvas.height = imagen.height
                ctx.drawImage(imagen, 0, 0, imagen.width, imagen.height)
                return canvas.toDataURL("image/webp")
}

function publicarImagen(nuevaImagen) {
    const URLminstagram = "https://64de8e2d825d19d9bfb2b6ba.mockapi.io/api/v1/imagenes"
    fetch(URLminstagram, {
        method: 'POST',
        headers: {'content-type':'application/json'},
        body: JSON.stringify(nuevaImagen)
    })
    .then((response)=> {
        if (response.status === 201) {
            console.log("Publicación exitosa.")
            alert("Publicación exitosa.")
        } else {
            console.warn("No se ha podido publicar la imagen.")
            alert("No se ha podido publicar la imagen - " + response.status)
            alert(imagen.width + "<- Ancho - Alto ->" + imagen.height)

        }
    })
    .then(()=> location.href = `/?update=${Date.now()}` )
}