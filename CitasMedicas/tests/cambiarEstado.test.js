// ============================================================
// PRUEBA UNITARIA 5 — TDD (RED)
// Requerimiento: RF-13 — Cambiar estado de cita
// Función: cambiarEstadoCita
// Patrón AAA: Arrange - Act - Assert
// ============================================================

import { cambiarEstadoCita } from '../src/cita.js';

describe('cambiarEstadoCita', () => {
  test('debe cambiar el estado de una cita a un estado válido', () => {
    // ARRANGE: Preparamos una cita existente y el nuevo estado
    const cita = { id: 'cita-1', estado: 'Pendiente' };
    const nuevoEstado = 'Confirmada';

    // ACT: Ejecutamos la función a probar
    const resultado = cambiarEstadoCita(cita, nuevoEstado);

    // ASSERT: Verificamos que el estado cambió correctamente
    expect(resultado.estado).toBe('Confirmada');
  });

  test('debe rechazar un estado no válido', () => {
    // ARRANGE: Preparamos una cita y un estado inválido
    const cita = { id: 'cita-1', estado: 'Pendiente' };
    const nuevoEstado = 'EstadoInvalido';

    // ACT: Ejecutamos la función a probar
    const cambiar = () => cambiarEstadoCita(cita, nuevoEstado);

    // ASSERT: Verificamos que lanza un error por estado inválido
    expect(cambiar).toThrow('Estado de cita no válido.');
  });

  test('debe rechazar cambiar el estado de una cita cancelada a Pendiente o Confirmada', () => {
    // ARRANGE: Preparamos una cita cancelada
    const cita = { id: 'cita-1', estado: 'Cancelada' };
    const nuevoEstado = 'Confirmada';

    // ACT: Ejecutamos la función a probar
    const cambiar = () => cambiarEstadoCita(cita, nuevoEstado);

    // ASSERT: Verificamos que lanza un error por regla de negocio RN-05
    expect(cambiar).toThrow('Una cita cancelada no puede volver a Pendiente o Confirmada.');
  });
});