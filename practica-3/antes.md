class Pedido {
    constructor(cliente, productos) {
        this.cliente = cliente;
        this.productos = productos;
    }

    procesarPedido() {

        for (let producto of this.productos) {
            if (producto.stock < producto.cantidad) {
                console.log("No hay suficiente stock de " + producto.nombre);
                return;
            }
        }

        let subtotal = 0;

        for (let producto of this.productos) {
            subtotal += producto.precio * producto.cantidad;
        }

        let isv = subtotal * 0.15;
        let total = subtotal + isv;

        console.log("Conectando a la base de datos...");
        console.log("Guardando pedido de " + this.cliente);
        console.log("Total: L " + total);
        console.log("Pedido guardado");

        console.log("----- TICKET -----");
        console.log("Cliente: " + this.cliente);

        for (let producto of this.productos) {
            console.log(
                producto.nombre + " x" + producto.cantidad +
                " = L " + (producto.precio * producto.cantidad)
            );
        }

        console.log("Subtotal: L " + subtotal);
        console.log("ISV: L " + isv);
        console.log("Total: L " + total);

        console.log("Enviando WhatsApp a " + this.cliente);
        console.log("Su pedido fue procesado. Total: L " + total);
    }
}