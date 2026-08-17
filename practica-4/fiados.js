function calcularMora(monto, diasVencidos) {
    const porcentajeMora = 0.05;

    if (diasVencidos > 0) {
        return monto * porcentajeMora;
    }

    return 0;
}

module.exports = { calcularMora };