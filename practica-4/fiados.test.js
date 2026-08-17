const { calcularMora } = require("./fiados");

function test(nombre, fn) {
    try {
        fn();
        console.log("🟢 " + nombre);
    } catch (error) {
        console.log("🔴 " + nombre);
    }
}

function assertEqual(actual, esperado) {
    if (actual !== esperado) {
        throw new Error(
            "Esperado: " + esperado + ", recibido: " + actual
        );
    }
}

test("calcula 5% de mora cuando hay dias vencidos", () => {
    assertEqual(calcularMora(1000, 5), 50);
});