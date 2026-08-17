class ValidadorStock {
    validar(productos) {
        for (let producto of productos) {
            if (producto.stock < producto.cantidad) {
                return false;
            }
        }

        return true;
    }
}

class CalculadoraPedido {
    calcular(productos) {
        let subtotal = 0;

        for (let producto of productos) {
            subtotal += producto.precio * producto.cantidad;
        }

        let isv = subtotal * 0.15;
        let total = subtotal + isv;

        return { subtotal, isv, total };
    }
}

class RepositorioPedido {
    guardar(cliente, total) {
        console.log("Guardando pedido de " + cliente);
        console.log("Total: L " + total);
    }
}

class ImpresoraTicket {
    imprimir(cliente, productos, datos) {
        console.log("----- TICKET -----");
        console.log("Cliente: " + cliente);

        for (let producto of productos) {
            console.log(
                producto.nombre + " x" + producto.cantidad +
                " = L " + (producto.precio * producto.cantidad)
            );
        }

        console.log("Subtotal: L " + datos.subtotal);
        console.log("ISV: L " + datos.isv);
        console.log("Total: L " + datos.total);
    }
}

class NotificadorWhatsApp {
    enviar(cliente, total) {
        console.log("Enviando WhatsApp a " + cliente);
        console.log("Su pedido fue procesado. Total: L " + total);
    }
}

class Pedido {
    constructor(cliente, productos, repositorio, notificador) {
        this.cliente = cliente;
        this.productos = productos;
        this.repositorio = repositorio;
        this.notificador = notificador;
    }

    procesarPedido() {
        const validador = new ValidadorStock();

        if (!validador.validar(this.productos)) {
            console.log("No hay suficiente stock");
            return;
        }

        const calculadora = new CalculadoraPedido();
        const datos = calculadora.calcular(this.productos);

        this.repositorio.guardar(this.cliente, datos.total);

        const impresora = new ImpresoraTicket();
        impresora.imprimir(this.cliente, this.productos, datos);

        this.notificador.enviar(this.cliente, datos.total);
    }
}

const repositorio = new RepositorioPedido();
const notificador = new NotificadorWhatsApp();

const productos = [
    { nombre: "Camisa", precio: 300, cantidad: 2, stock: 10 },
    { nombre: "Pantalon", precio: 500, cantidad: 1, stock: 5 }
];

const pedido = new Pedido(
    "Juan",
    productos,
    repositorio,
    notificador
);

pedido.procesarPedido();
