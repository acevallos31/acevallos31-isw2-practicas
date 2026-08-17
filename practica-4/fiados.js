function calcularMora(monto, diasVencidos) {
    const porcentajeMora = 0.05;

    if (typeof diasVencidos !== "number") {
        return 0;
    }

    if (monto < 0 || diasVencidos <= 0) {
        return 0;
    }

    return monto * porcentajeMora;
}

module.exports = { calcularMora };