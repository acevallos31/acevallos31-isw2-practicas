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

test("retorna 0 cuando no hay dias vencidos", () => {
    assertEqual(calcularMora(1000, 0), 0);
});

test("retorna 0 cuando el monto es negativo", () => {
    assertEqual(calcularMora(-1000, 5), 0);
});

test("retorna 0 cuando los dias no son numericos", () => {
    assertEqual(calcularMora(1000, "abc"), 0);
});