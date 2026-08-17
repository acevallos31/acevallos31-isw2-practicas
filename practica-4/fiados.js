function calcularMora(monto, diasVencidos) {
    const porcentajeMora = 0.05;

    if (monto < 0) {
        throw new Error("El monto no puede ser negativo");
    }

    if (typeof diasVencidos !== "number") {
        throw new Error("Los dias deben ser numericos");
    }

    if (diasVencidos <= 0) {
        return 0;
    }

    return monto * porcentajeMora;
}

module.exports = { calcularMora };