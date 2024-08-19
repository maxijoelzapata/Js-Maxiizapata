
const productos = [
    {
        id: 1,
        nombre: 'Madera de Pino',
        precio: 50600,
        img: 'img/pino.jpg'
    },
    {
        id: 2,
        nombre: 'Madera de Roble',
        precio: 68200,
        img: 'img/roble.jpg' 
    },
    {
        id: 3,
        nombre: 'Madera de Cedro',
        precio: 71300,
        img: 'img/cedro.jpg'
    }
];

async function obtenerProductos() {
    try {
        const response = await fetch('./data/productos.json'); 
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const productos = await response.json();
        return productos;
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        Swal.fire('Error', 'No se pudieron cargar los productos.', 'error');
    } finally {
        console.log('Fetch completado');
    }
}
