// Array de objetos
const productos = [
    { id: 1, nombre: 'Melamina', precio: 65000 },
    { id: 2, nombre: 'Aglomerado', precio: 32000 },
    { id: 3, nombre: 'Madera Maciza', precio: 120000 },
];

// referencias DOM
const listaProductos = document.getElementById('lista-productos');
const contenidoCarrito = document.getElementById('contenido-carrito');
const btnVaciarCarrito = document.getElementById('vaciar-carrito');

// cargar desde localStorage
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// mostrar productos
function mostrarProductos() {
    listaProductos.innerHTML = '';
    productos.forEach(producto => {
        const div = document.createElement('div');
        div.classList.add('producto');
        div.innerHTML = `
            <span>${producto.nombre} - $${producto.precio}</span>
            <button onclick="agregarAlCarrito(${producto.id})">Agregar</button>
        `;
        listaProductos.appendChild(div);
    });
}

// agregar productos al carrito
function agregarAlCarrito(id) {
    const producto = productos.find(prod => prod.id === id);
    carrito.push(producto);
    guardarCarrito();
    mostrarCarrito();
}

// Mostrar el contenido del carrito
function mostrarCarrito() {
    contenidoCarrito.innerHTML = '';
    const productosCarrito = carrito.reduce((acc, producto) => {
        acc[producto.id] = (acc[producto.id] || 0) + 1;
        return acc;
    }, {});

    Object.keys(productosCarrito).forEach(id => {
        const producto = productos.find(prod => prod.id == id);
        const div = document.createElement('div');
        div.classList.add('carrito-item');
        div.innerHTML = `
            <span>${producto.nombre} x ${productosCarrito[id]} - $${producto.precio * productosCarrito[id]}</span>
            <button onclick="eliminarDelCarrito(${producto.id})">Eliminar</button>
        `;
        contenidoCarrito.appendChild(div);
    });
}

// Eliminar productos del carrito
function eliminarDelCarrito(id) {
    carrito = carrito.filter(producto => producto.id !== id);
    guardarCarrito();
    mostrarCarrito();
}

// Función para guardar el carrito en localStorage
function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Función para vaciar el carrito
btnVaciarCarrito.addEventListener('click', () => {
    carrito = [];
    guardarCarrito();
    mostrarCarrito();
});

// Mostrar productos y carrito al cargar la página
mostrarProductos();
mostrarCarrito();

//Queria agregar un boton para finalizar pedido pero no se me ocurre como...










