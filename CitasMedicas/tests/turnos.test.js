// ============================================================
// PRUEBA UNITARIA 6 — TDD (RED)
// Funcionalidad: Turnos de médicos — Asignar días de atención
// Función: asignarTurnos
// Patrón AAA: Arrange - Act - Assert
// ============================================================

import { asignarTurnos } from '../src/medico.js';

describe('asignarTurnos', () => {
  test('debe asignar días de atención a un médico', () => {
    // ARRANGE: Preparamos un médico y los días de atención
    const medico = { id: 'med-1', nombre: 'Dra. Ana Torres' };
    const dias = ['Lunes', 'Miércoles', 'Viernes'];

    // ACT: Ejecutamos la función a probar
    const resultado = asignarTurnos(medico, dias);

    // ASSERT: Verificamos que los días se asignaron correctamente
    expect(resultado.diasAtencion).toEqual(['Lunes', 'Miércoles', 'Viernes']);
  });

  test('debe rechazar días de atención no válidos', () => {
    // ARRANGE: Preparamos un médico y días inválidos
    const medico = { id: 'med-1', nombre: 'Dra. Ana Torres' };
    const dias = ['Lunes', 'DíaInvalido'];

    // ACT: Ejecutamos la función a probar
    const asignar = () => asignarTurnos(medico, dias);

    // ASSERT: Verificamos que lanza un error por día inválido
    expect(asignar).toThrow('Día de atención no válido');
  });
});