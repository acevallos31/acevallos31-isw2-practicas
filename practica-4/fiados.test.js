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

function assertThrows(fn) {
    try {
        fn();
    } catch (error) {
        return;
    }

    throw new Error("Se esperaba un error");
}

test("calcula 5% de mora cuando hay dias vencidos", () => {
    assertEqual(calcularMora(1000, 5), 50);
});

test("retorna 0 cuando no hay dias vencidos", () => {
    assertEqual(calcularMora(1000, 0), 0);
});

test("lanza error cuando el monto es negativo", () => {
    assertThrows(() => calcularMora(-1000, 5));
});

test("lanza error cuando los dias no son numericos", () => {
    assertThrows(() => calcularMora(1000, "abc"));
});

test("retorna 0 cuando el monto es 0", () => {
    assertEqual(calcularMora(0, 5), 0);
});