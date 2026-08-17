// ============================================================
// PRUEBA UNITARIA 2 — TDD (RED)
// Requerimiento: RF-06 — Validación de DNI único
// Función: validarDniUnico
// Patrón AAA: Arrange - Act - Assert
// ============================================================

import { validarDniUnico } from '../src/validacion.js';

describe('validarDniUnico', () => {
  test('debe permitir un DNI que no existe en la lista de pacientes', () => {
    // ARRANGE: Preparamos una lista de pacientes existentes y un DNI nuevo
    const pacientes = [
      { id: '1', dni: '11111111' },
      { id: '2', dni: '22222222' }
    ];
    const dniNuevo = '33333333';

    // ACT: Ejecutamos la función a probar
    const resultado = validarDniUnico(dniNuevo, pacientes);

    // ASSERT: Verificamos que el DNI es válido (no está duplicado)
    expect(resultado).toBe(true);
  });

  test('debe rechazar un DNI que ya existe en la lista de pacientes', () => {
    // ARRANGE: Preparamos una lista de pacientes existentes y un DNI duplicado
    const pacientes = [
      { id: '1', dni: '11111111' },
      { id: '2', dni: '22222222' }
    ];
    const dniDuplicado = '11111111';

    // ACT: Ejecutamos la función a probar
    const resultado = validarDniUnico(dniDuplicado, pacientes);

    // ASSERT: Verificamos que el DNI es inválido (está duplicado)
    expect(resultado).toBe(false);
  });
});