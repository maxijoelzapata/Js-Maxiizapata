// api.js
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
