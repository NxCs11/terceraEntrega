import { crearLibro } from "../models/libros.model";
import htmlElements from "../elements/html.elements";
let libros = JSON.parse(localStorage.getItem("libros")) || [];


//Función dedicada a mostrar los libros de la lista
const mostrarLibros = () => {
    htmlElements.librosContenedor.innerHTML = "";
    console.log(libros);

    //Dentro de cada libro agregado se mostrará en forma de tarjeta y dos botones: uno de 'Eliminar' y otro de 'Leído'
    libros.forEach(libro => {
        let tarjeta = document.createElement("div");
        tarjeta.className = "d-flex mt-3 justify-content-between align-items-center border border-2 rounded-2 p-3"
        tarjeta.innerHTML = `<p class="${libro.leido ? "text-decoration-line-through" : "align-self-end"}">${libro.titulo}</p>`;

        let botonContenedor = document.createElement("div");
        tarjeta.appendChild(botonContenedor)

        let botonEliminar = document.createElement("button");
        botonEliminar.innerText = "Eliminar";
        botonEliminar.className = "btn btn-danger ms-2";
        botonEliminar.onclick = () => eliminarLibro(libro.id);

        botonContenedor.appendChild(botonEliminar);


        let botonLeido = document.createElement("button");
        botonLeido.innerText = "Leído";
        botonLeido.className = "btn btn-success ms-2";
        botonLeido.onclick = () => cambiarEstadoLibro(libro.id);

        botonContenedor.appendChild(botonLeido);
        htmlElements.librosContenedor.appendChild(tarjeta)
    });
}

//Función dedicada a agregar libros a la lista
const agregarLibro = () => {
    let libroNuevo = crearLibro(htmlElements.inputLibros.value);
    libros.push(libroNuevo);
    localStorage.setItem("libros", JSON.stringify(libros));
    mostrarLibros();
}

//Función dedicada a cambiar el estado de "leído" de la lista de libros
const cambiarEstadoLibro = (idLibro) => {
    let index = libros.findIndex(libro => libro.id === idLibro);
    libros[index].leido = !libros[index].leido;
    localStorage.setItem("libros", JSON.stringify(libros));
    mostrarLibros();
}

//Función dedicada a eliminar los libros de la lista
const eliminarLibro = (idLibro) => {
    libros = libros.filter(libro => libro.id !== idLibro);
    localStorage.setItem("libros", JSON.stringify(libros));
    mostrarLibros();
}

export default {
    mostrarLibros,
    agregarLibro,
    cambiarEstadoLibro,
    eliminarLibro
}