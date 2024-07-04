// registro de cliente
let nombre = '';
let apellido = '';
let telefono = '';

//eleccion de madera
let tipoMadera = '';
let espesorMadera = '';
let colorMadera = '';
let placasMadera = '';

//nombre del cliente
nombre = prompt("ingrese su nombre");
apellido = prompt("ingrese su apellido");
telefono = parseInt(prompt("ingrese su celular sin 0 ni 15"));
console.log("cliente: " + nombre + " " + apellido);
console.log("telefono: " + telefono);

//confirmacion para empezar un pedido
const hacerPedido = confirm("¿Desea hacer un pedido?");
if (hacerPedido) {
    console.log("empecemos el pedido");
} else {
    alert("gracias por contactarnos");
    console.log("pedido cancelado");
}
//detalles del pedido
let tipoDeMadera = false;
while (!tipoDeMadera) {
    tipoMadera = prompt (`${nombre}, elija el tipo de madera \n1. Aglomerado \n2. MDF`);
    switch (tipoMadera){
        case '1':
            tipoMadera = 'Aglomerado';
            tipoDeMadera = true;
            break;
        case '2':
            tipoMadera = 'MDF';
            tipoDeMadera = true;
            break;
        default:
            alert('elija una opcion correcta');
    }
            console.log("tipo de madera: " + tipoMadera);
}

let espesorDeMadera = false;
while (!espesorDeMadera) {
    espesorMadera = prompt (`${nombre}, Muy bien, ahora elija el espesor de madera \n1. 18 mm \n2. 25 mm \n3. 36mm`);
    switch (espesorMadera){
        case '1':
            espesorMadera = '18 mm';
            espesorDeMadera = true;
            break;
        case '2':
            espesorMadera = '25 mm';
            espesorDeMadera = true;
            break;
        case '3':
            espesorMadera = '36 mm';
            espesorDeMadera = true
            break;
        default:
            alert('elija una opcion correcta');
    }
            console.log("espesor de madera: " + espesorMadera);
}

let colorDeMadera = false;
while (!colorDeMadera) {
    colorMadera = prompt (`${nombre}, excelente y  ahora elija el color de madera \n1. blanco \n2. paraiso \n3. melamina color`);
    switch (colorMadera){
        case '1':
            colorMadera = 'blanco';
            colorDeMadera = true;
            break;
        case '2':
            colorMadera = 'paraiso';
            colorDeMadera = true;
            break;
        case '3':
            colorMadera = 'melamina color';
            colorDeMadera = true
            break;
        default:
            alert('elija una opcion correcta');
    }
            console.log("color de madera: " + colorMadera);
}

//cantidad de placas de madera
function comprarPlacas() {
    let cantidadPlacas = prompt("Cuántas placas de madera desea comprar?");
    if (cantidadPlacas === null || isNaN(cantidadPlacas) || cantidadPlacas === "") {
        console.log("Operación cancelada o entrada inválida.");
    } else {
        cantidadPlacas = parseInt(cantidadPlacas);
        console.log(`Ha seleccionado comprar ${cantidadPlacas} placas de madera.`);
    }
}
comprarPlacas();



alert ("muchas gracias, su pedido sera procesado");

let diferentesColores = "colores de melamina"
console.log(diferentesColores);

//arrays de colores de melamina y su precio
const coloresMelamina = [
    { colorMelamina: 'safari', precio: 100 },
    { colorMelamina: 'tuareg', precio: 150 },
    { colorMelamina: 'grafito', precio: 100 },
    { colorMelamina: 'terracota', precio: 120 },
    { colorMelamina: 'olmo filandes', precio: 100 },
    { colorMelamina: 'teka artico', precio: 130 },
    { colorMelamina: 'seda giorno', precio: 160 },
    { colorMelamina: 'lino chiaro', precio: 140 }
];

for (let i = 0; i < coloresMelamina.length; i++) {
    console.log(`color: ${coloresMelamina[i].colorMelamina}, Precio: ${coloresMelamina[i].precio + "$usd"}`);
}









