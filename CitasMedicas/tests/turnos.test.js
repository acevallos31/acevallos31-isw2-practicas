// ============================================================
// PRUEBA UNITARIA 6 — TDD (RED)
// Funcionalidad: Turnos de médicos — Asignar días de atención
// Función: asignarTurnos
// Patrón AAA: Arrange - Act - Assert
// ============================================================

import { asignarTurnos, bloquearHorario } from '../src/medico.js';

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

// ============================================================
// PRUEBA UNITARIA — TDD (RED)
// Funcionalidad: Bloqueo de horarios del médico
// Función: bloquearHorario
// Patrón AAA: Arrange - Act - Assert
// ============================================================

describe('bloquearHorario', () => {
  test('debe agregar un bloqueo de horario a un médico', () => {
    // ARRANGE: Preparamos un médico y los datos del bloqueo
    const medico = { id: 'med-1', nombre: 'Dra. Ana Torres', horarioInicio: '08:00', horarioFin: '17:00' };
    const bloqueo = { fecha: '2026-08-20', horaInicio: '12:00', horaFin: '14:00', motivo: 'Almuerzo' };

    // ACT: Ejecutamos la función a probar
    const resultado = bloquearHorario(medico, bloqueo);

    // ASSERT: Verificamos que el bloqueo se agregó correctamente
    expect(resultado.bloqueos).toBeDefined();
    expect(resultado.bloqueos.length).toBe(1);
    expect(resultado.bloqueos[0].fecha).toBe('2026-08-20');
    expect(resultado.bloqueos[0].horaInicio).toBe('12:00');
    expect(resultado.bloqueos[0].horaFin).toBe('14:00');
    expect(resultado.bloqueos[0].motivo).toBe('Almuerzo');
  });

  test('debe rechazar un bloqueo fuera del horario de atención del médico', () => {
    // ARRANGE: Preparamos un médico y un bloqueo fuera de su horario
    const medico = { id: 'med-1', nombre: 'Dra. Ana Torres', horarioInicio: '08:00', horarioFin: '17:00' };
    const bloqueo = { fecha: '2026-08-20', horaInicio: '18:00', horaFin: '19:00', motivo: 'Fuera de horario' };

    // ACT: Ejecutamos la función a probar
    const ejecutar = () => bloquearHorario(medico, bloqueo);

    // ASSERT: Verificamos que lanza un error
    expect(ejecutar).toThrow('El bloqueo debe estar dentro del horario de atención del médico.');
  });
});