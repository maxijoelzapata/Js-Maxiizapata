// app.js
const productosContainer = document.getElementById('productos');
const carritoItemsContainer = document.getElementById('carrito-items');
const totalContainer = document.getElementById('total');
const finalizarPedidoButton = document.getElementById('finalizar-pedido');
const formularioContainer = document.getElementById('formulario-container');
const formulario = document.getElementById('formulario');
let carrito = [];
let productos = []; // Definir globalmente para usar en los eventos

// Mostrar los productos en el DOM
function mostrarProductos(productos) {
    productos.forEach(producto => {
        const div = document.createElement('div');
        div.classList.add('producto');
        div.innerHTML = `
            <img src="${producto.img}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio}</p>
            <button data-id="${producto.id}">Agregar al Carrito</button>
        `;
        productosContainer.appendChild(div);
    });
}

// Actualizar el carrito en el DOM
function actualizarCarrito() {
    carritoItemsContainer.innerHTML = '';
    let total = 0;

    carrito.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('carrito-item');
        div.innerHTML = `
            <span>${item.nombre} - $${item.precio} x ${item.cantidad}</span>
            <button class="decrementar" data-id="${item.id}">-</button>
            <button class="incrementar" data-id="${item.id}">+</button>
        `;
        carritoItemsContainer.appendChild(div);
        total += item.precio * item.cantidad;
    });

    totalContainer.textContent = `Total: $${total}`;

    // Guardar el carrito en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Cargar carrito desde localStorage
function cargarCarrito() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        actualizarCarrito();
    }
}

// Agregar al carrito
productosContainer.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        const productoId = parseInt(e.target.dataset.id);
        const productoSeleccionado = productos.find(producto => producto.id === productoId);

        const productoEnCarrito = carrito.find(item => item.id === productoId);

        if (productoEnCarrito) {
            productoEnCarrito.cantidad++;
        } else {
            carrito.push({ ...productoSeleccionado, cantidad: 1 });
        }

        actualizarCarrito();
    }
});

// Incrementar o decrementar cantidad en el carrito
carritoItemsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('incrementar')) {
        const productoId = parseInt(e.target.dataset.id);
        const productoEnCarrito = carrito.find(item => item.id === productoId);
        productoEnCarrito.cantidad++;
        actualizarCarrito();
    }

    if (e.target.classList.contains('decrementar')) {
        const productoId = parseInt(e.target.dataset.id);
        const productoEnCarrito = carrito.find(item => item.id === productoId);

        if (productoEnCarrito.cantidad > 1) {
            productoEnCarrito.cantidad--;
        } else {
            carrito = carrito.filter(item => item.id !== productoId);
        }

        actualizarCarrito();
    }
});

// Finalizar pedido
finalizarPedidoButton.addEventListener('click', () => {
    if (carrito.length === 0) {
        Swal.fire('Carrito vacío', 'Por favor, agrega productos al carrito antes de finalizar el pedido.', 'warning');
        return;
    }

    const resumen = carrito.map(item => `${item.nombre} - $${item.precio} x ${item.cantidad}`).join('\n');
    const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
    Swal.fire({
        title: 'Resumen del Pedido',
        text: `${resumen}\n\nTotal a pagar: $${total}`,
        icon: 'info',
        confirmButtonText: 'Finalizar Compra'
    }).then(result => {
        if (result.isConfirmed) {
            mostrarResumenPedido();
            formularioContainer.style.display = 'block';
        }
    });
});

// Mostrar resumen del pedido
function mostrarResumenPedido() {
    // Limpiar cualquier resumen previo
    const resumenExistente = document.querySelector('#formulario-container .resumen-pedido');
    if (resumenExistente) {
        resumenExistente.remove();
    }

    const resumenContainer = document.createElement('div');
    resumenContainer.classList.add('resumen-pedido');
    resumenContainer.innerHTML = `<h3>Resumen del Pedido</h3>`;
    
    carrito.forEach(item => {
        const resumenItem = document.createElement('p');
        resumenItem.textContent = `${item.nombre} - $${item.precio} x ${item.cantidad}`;
        resumenContainer.appendChild(resumenItem);
    });

    const totalResumen = document.createElement('p');
    const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
    totalResumen.textContent = `Total a pagar: $${total}`;
    resumenContainer.appendChild(totalResumen);

    // Insertar el resumen antes del formulario
    formularioContainer.insertBefore(resumenContainer, formulario);
}

// Manejo del envío del formulario
formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const email = document.getElementById('email').value;
    const direccion = document.getElementById('direccion').value;

    Swal.fire('Pedido Enviado', `Gracias, ${nombre} ${apellido}. Tu pedido ha sido enviado a ${direccion}.`, 'success');

    // Limpiar carrito y formulario
    carrito = [];
    actualizarCarrito();
    formulario.reset();
    formularioContainer.style.display = 'none';
    // Eliminar resumen del pedido después de enviar
    const resumenExistente = document.querySelector('#formulario-container .resumen-pedido');
    if (resumenExistente) {
        resumenExistente.remove();
    }
})

// Cargar productos y mostrar en el DOM
obtenerProductos().then(productosCargados => {
    productos = productosCargados;
    mostrarProductos(productos);
    cargarCarrito(); // Cargar el carrito al iniciar
});
