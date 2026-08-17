function esNumeroValido(valor) {
    return typeof valor === "number" && !Number.isNaN(valor);
}

function calcularMora(monto, diasVencidos) {
    const porcentajeMora = 0.05;

    if (!esNumeroValido(monto) || !esNumeroValido(diasVencidos)) {
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