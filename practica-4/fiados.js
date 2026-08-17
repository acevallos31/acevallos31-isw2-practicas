function calcularMora(monto, diasVencidos) {
    const porcentajeMora = 0.05;

    if (typeof monto !== "number" || typeof diasVencidos !== "number") {
        throw new Error("El monto y los dias deben ser numericos");
    }

    if (monto < 0) {
        throw new Error("El monto no puede ser negativo");
    }

    if (diasVencidos <= 0) {
        return 0;
    }

    return monto * porcentajeMora;
}

module.exports = { calcularMora };