function calcularMora(monto, diasVencidos) {
    const porcentajeMora = 0.05;
    return monto * porcentajeMora;
}

module.exports = { calcularMora };